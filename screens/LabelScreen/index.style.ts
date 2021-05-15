import { StyleSheet, Text, View } from 'react-native';

const styles = StyleSheet.create({
  root: {
    backgroundColor: "#202124",
    height: '100%'
  },
  content: {
    marginTop: 10,
    marginBottom: 180,
  },
  scrollView: {
    padding: 10,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderRadius: 5,
    borderLeftColor: "green",
    borderLeftWidth: 10,
    borderColor: "#ccc",
    marginBottom: 10,
    paddingTop: 10,
    paddingBottom: 10,
  },
  rowIndex: {
    paddingLeft: 20,
    paddingRight: 20,
    fontSize: 30,
    color: "#dfe0e1",
  },
  rowDivider: {
    width: 1,
    height: "100%",
    backgroundColor: "#ccc",
  },
  rowContent: {
    flex: 1,
    flexWrap: "wrap",
    padding: 10,
    fontSize: 15,
    color: "#dfe0e1",
  },
  boxAdd: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    padding: 10,
  },
  inputAdd: {
    flexGrow: 1,
    backgroundColor: '#525355',
    marginRight: 5
  },
  btnAdd: {
    justifyContent: 'center',
    backgroundColor: '#525355',
  },
  rowCloseBtn: {
    backgroundColor: '#fff'
  }
});

export default styles;