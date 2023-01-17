import React, { useState } from "react"
import { StyleSheet, Text, View, Button, FlatList } from "react-native"
import BouncyCheckbox from "react-native-bouncy-checkbox";
import Modal from "./components/Modal"
import AddItem from "./components/AddItem"

export default function App() {
  const [textItem, setTextItem] = useState({itemId: 0, nameItem: '', isCheck: false})
  const [list, setList] = useState([])
  const [itemSelected, setItemSelected] = useState({})
  const [modalVisble, setModalVisible] = useState(false)

  const onHandleChangeItem = text => {
    const idValue = Math.floor(Math.random() * 100) + 1;
    setTextItem({itemId: idValue, nameItem: text, isCheck: false})
  }

  const addItem = () => {
    setList(prevState => [...prevState, textItem])
    setTextItem("")
  }

  const handleModal = item => {
    setItemSelected(item)
    setModalVisible(true)
  }

  const onHandleDelete = item => {
    setList(prevState => prevState.filter(element => element.itemId !== item.itemId))
    setModalVisible(!modalVisble)
  }

  const renderItem = ({ item }) => (
    <View style={styles.renderItemStyle}>
      <Text>{item.nameItem}</Text>
      <Button title="Edit" onPress={() => handleModal(item)} />
      <BouncyCheckbox
        size={25}
        fillColor="green"
        unfillColor="#FFFFFF"
        innerIconStyle={{ borderWidth: 2 }}
        isChecked={item.isCheck}
      />
    </View>
  )

  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Shopping List</Text>
        <AddItem
          onChange={onHandleChangeItem}
          textValue={textItem.nameItem}
          onAddItem={addItem}
        />
      </View>
      <View style={styles.listContainer}>
        <FlatList
          data={list}
          renderItem={renderItem}
          keyExtractor={item => item.itemId}
        />
      </View>
      <Modal
        isVisible={modalVisble}
        itemSelected={itemSelected.nameItem}
        actionDeleteItem={() => onHandleDelete(itemSelected)}
        onDismissModal={setModalVisible}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#E7EAF2",
  },
  titleContainer: {
    height: 200,
    paddingHorizontal: 30,
    paddingTop: 80,
  },
  title: {
    marginBottom: 30,
    fontSize: 40,
    fontWeight: "500",
    color: "#1E283C",
  },
  listContainer: {
    flex: 2,
    marginHorizontal: 30,
    marginTop: 40,
    padding: 3,
  },
  renderItemStyle: {
    justifyContent: 'space-between',
    height: 60,
    flexDirection: "row",
    marginBottom: 25,
    backgroundColor: "white",
    borderRadius: 10,
    padding: 10,
    alignItems: "center",
    shadowColor: "black",
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 2,
    elevation: 3,
  },
})