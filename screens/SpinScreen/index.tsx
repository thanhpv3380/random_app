import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { HistoryByDateData, HistoryData } from "../../dataType";
import { extractDate } from "../../utils/date";
import styles from "./index.style";
// import { Audio } from "expo-av";

interface SpinScreenProps {
  labels: string[];
  history: HistoryByDateData[];
  handleSpin: Function;
  status: Boolean;
}

const SpinScreen = ({
  labels,
  handleSpin,
  history,
  status,
}: SpinScreenProps) => {
  const [isSpinning, setIsSpinning] = useState(false);
  const [indexSpin, setIndexSpin] = useState<number>(0);
  const handleRandom = async () => {
    // const { sound: playbackObject } = await Audio.Sound.createAsync(
    //   { uri: require("../../assets/rand_sound.mp3") },
    //   { shouldPlay: true }
    // );
    const { day, month, year } = extractDate(new Date());
    const historyData = history.find(
      (el) => el.day === day && el.month === month && el.year === year
    );
    let listRandom = [...labels];
    if (historyData) {
      listRandom = labels.filter((el) => historyData.labels?.indexOf(el) < 0);
    }
    let limit = labels.length;
    if (listRandom?.length > 0) {
      limit = listRandom.length;
    } else {
      listRandom = [...labels];
    }
    let randIndex = Math.floor(Math.random() * limit);
    const finalIndex = labels.findIndex((el) => el === listRandom[randIndex]);
    return finalIndex;
  };

  const handlePrevSpin = async () => {
    let randIndex = await handleRandom();
    setIndexSpin(randIndex);
    setIsSpinning(true);
    handleSpin(labels[randIndex]);
  };
  return (
    <TouchableOpacity
      activeOpacity={0.9}
      style={styles.root}
      onPress={() => handlePrevSpin()}
    >
      {!status ? (
        <Text style={styles.textLabel}>{labels[indexSpin]}</Text>
      ) : (
        <Text style={styles.textStart}>Chạm vào màn hình để random</Text>
      )}
    </TouchableOpacity>
  );
};

export default SpinScreen;
