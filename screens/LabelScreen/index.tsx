import React, { useState } from "react";
import {
  TextInput,
  Button,
  Appbar,
  Text,
  IconButton,
} from "react-native-paper";
import { View, ScrollView, SafeAreaView, TouchableOpacity } from "react-native";
import styles from "./index.style";

interface LabelScreenProps {
  labels: string[];
  handleAdd: Function;
  handleDelete: Function;
}
const LabelScreen = (props: LabelScreenProps) => {
  const { labels, handleAdd, handleDelete } = props;
  const [text, setText] = useState("");

  const handlePrevAdd = () => {
    handleAdd(text);
    setText("");
  };

  return (
    <View style={styles.root}>
      <Appbar.Header>
        <Appbar.Content title="Danh sách quay" />
      </Appbar.Header>
      <View style={styles.boxAdd}>
        <TextInput
          placeholder="Nhập thông tin..."
          selectionColor="#fff"
          placeholderTextColor="#fff"
          theme={{ colors: { text: "#fff" } }}
          value={text}
          style={styles.inputAdd}
          onChangeText={(text) => setText(text)}
        />
        <Button
          mode="contained"
          style={styles.btnAdd}
          onPress={() => handlePrevAdd()}
        >
          Thêm
        </Button>
      </View>
      <View style={styles.content}>
        <ScrollView style={styles.scrollView}>
          {labels.map((el, index) => (
            <View key={index} style={styles.row}>
              <Text style={styles.rowIndex}>{index + 1}</Text>
              <View style={styles.rowDivider} />
              <Text style={styles.rowContent}>{el}</Text>
              <IconButton
                icon="close"
                color="#fff"
                size={20}
                onPress={() => handleDelete(index)}
              />
            </View>
          ))}
        </ScrollView>
      </View>
    </View>
  );
};

export default LabelScreen;
