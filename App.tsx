import React, { useEffect, useState } from "react";
import { Route } from "react-native";
import {
  DefaultTheme,
  BottomNavigation,
  Provider as PaperProvider,
} from "react-native-paper";
import { SpinScreen, HistoryScreen, LabelScreen } from "./screens";
import { HistoryData, HistoryByDateData } from "./dataType";
import { getStorage, setStorage } from "./utils/storage";
import { extractDate } from "./utils/date";
const theme = {
  ...DefaultTheme,
  roundness: 2,
  colors: {
    ...DefaultTheme.colors,
    primary: "#242424",
    accent: "#f1c40f",
  },
};

export default function App() {
  const [index, setIndex] = useState(0);
  const [status, setStatus] = useState(true);
  const [routes] = useState([
    { key: "label", title: "Label", icon: "file-cabinet" },
    { key: "history", title: "History", icon: "history" },
    { key: "spin", title: "Spin", icon: "play-box" },
  ]);

  const [labels, setLabels] = useState<string[]>([]);
  const [history, setHistory] = useState<HistoryByDateData[]>([]);
  const [realHistory, setRealHistory] = useState<HistoryData[]>([]);
  const processHistory = (data: HistoryData[]) => {
    const list: HistoryByDateData[] = [];
    data.forEach((el) => {
      const { day, month, year } = extractDate(el.date);
      const pos = list.findIndex(
        (el) => el.day === day && el.month === month && el.year === year
      );
      if (pos >= 0) {
        list[pos] = {
          ...list[pos],
          labels: [...list[pos].labels, el.text],
        };
      } else {
        list.push({
          day,
          month,
          year,
          date: el.date,
          labels: [el.text],
        });
      }
    });
    return list;
  };

  const handleAdd = (text: string) => {
    const newLabels = [text, ...labels];
    setLabels([...newLabels]);
    setStorage("labels", JSON.stringify([...newLabels]));
  };

  const handleSpin = (text: string) => {
    setStatus(false);
    const historyData: any = {
      text,
      date: new Date(),
    };
    setRealHistory([historyData, ...realHistory]);
    const newHistory = processHistory([historyData, ...realHistory]);
    setHistory([...newHistory]);
    setStorage("history", JSON.stringify([historyData, ...realHistory]));
  };

  const handleDelete = (index: number) => {
    const newLabels = [...labels];
    newLabels.splice(index, 1);
    setLabels([...newLabels]);
    setStorage("labels", JSON.stringify([...newLabels]));
  };

  const handleDeleteHistory = () => {
    setHistory([]);
    setRealHistory([]);
    setStorage("history", JSON.stringify([]));
  };

  const fetchLabels = async () => {
    const data = await getStorage("labels");
    if (data) {
      setLabels([...(JSON.parse(data) as string[])]);
    }
  };

  const fetchHistory = async () => {
    const data = await getStorage("history");
    if (data) {
      const dataProcess = JSON.parse(data) as HistoryData[];
      const newHistory = processHistory([...dataProcess]);
      setRealHistory([...dataProcess]);
      setHistory([...newHistory]);
    }
  };

  useEffect(() => {
    fetchLabels();
    fetchHistory();
  }, []);

  const renderScene = (data: any) => {
    const { route } = data;
    switch (route.key) {
      case "label":
        return (
          <LabelScreen
            labels={labels}
            handleAdd={handleAdd}
            handleDelete={handleDelete}
          />
        );
      case "history":
        return (
          <HistoryScreen
            history={history}
            handleDeleteHistory={handleDeleteHistory}
          />
        );
      case "spin":
        return (
          <SpinScreen
            labels={labels}
            history={history}
            handleSpin={handleSpin}
            status={status}
          />
        );
    }
  };

  return (
    <PaperProvider theme={theme}>
      <BottomNavigation
        navigationState={{ index, routes }}
        onIndexChange={(index) => {
          setStatus(true);
          setIndex(index);
        }}
        renderScene={renderScene}
      />
    </PaperProvider>
  );
}
