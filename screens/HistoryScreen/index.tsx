import React, { ComponentType, useEffect, useState } from "react";
import { Appbar, Text } from "react-native-paper";
import { View, ScrollView } from "react-native";
import styles from "./index.style";
import { HistoryByDateData } from "../../dataType";
import moment from "moment";

interface HistoryScreenProps {
  history: HistoryByDateData[];
  handleDeleteHistory: Function;
}

const HistoryScreen = (props: HistoryScreenProps) => {
  const { history, handleDeleteHistory } = props;

  return (
    <View style={styles.root}>
      <Appbar.Header>
        <Appbar.Content title="Lịch sử quay" />
        <Appbar.Action icon="delete" onPress={() => handleDeleteHistory()} />
      </Appbar.Header>
      <View style={styles.content}>
        <ScrollView style={styles.scrollView}>
          {history?.map((el: HistoryByDateData, index: number) => (
            <View key={index} style={styles.row}>
              <Text style={styles.rowIndex}>{index + 1}</Text>
              <View style={styles.rowDivider} />

              <View>
                <Text style={styles.rowContent}>
                  Ngày: {moment(el.date).format("L")}
                </Text>
                {el?.labels?.map((label: string, index: number) => (
                  <Text style={styles.rowContent} key={index}>
                    {index + 1}. {label}
                  </Text>
                ))}
              </View>
            </View>
          ))}
        </ScrollView>
      </View>
    </View>
  );
};

export default HistoryScreen;
