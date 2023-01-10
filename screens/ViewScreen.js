import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";
import { Feather, AntDesign, Entypo } from "@expo/vector-icons";
import { useDispatch, useSelector } from "react-redux";

import { categoriesAction } from "../redux/CategoryActions";

export default function ViewScreen() {
  const categories = useSelector((state) => state.Categories.categoryData);
  const [modalVisible, setModalVisible] = useState("");

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(categoriesAction());
  }, [dispatch]);

  const renderList = ({ item }) => {
    return (
      <View style={styles.wrapper}>
        <View
          style={{
            backgroundColor:
              item.category_name === modalVisible ? "#f2f6f9" : null,
          }}
        >
          <TouchableOpacity
            style={styles.categoryCont}
            onPress={() => subCat(item.category_name)}
          >
            <Feather
              style={styles.moreVertical}
              name="more-vertical"
              size={24}
              color="black"
            />
            <View style={styles.imgCont}>
              <Image
                source={{ uri: item.image }}
                style={styles.img}
                resizeMode="contain"
              />
            </View>
            <Text style={styles.categoryTxt}>{item.category_name}</Text>
            <View style={styles.arrowCont}>
              <AntDesign
                name="down"
                size={24}
                color="black"
                onPress={() => setModalVisible(!modalVisible)}
              />
            </View>
          </TouchableOpacity>
          <View style={styles.catBorder} />
        </View>
        {item.category_name === modalVisible
          ? item.sub_cateries.map((val, index) => (
              <View key={index}>
                <View style={styles.subCatCont}>
                  <Text style={styles.subCatTxt}>{val.name}</Text>
                  <Entypo name="circle" size={24} color="black" />
                </View>
                <View style={styles.subCatBorder} />
              </View>
            ))
          : null}
      </View>
    );
  };

  const subCat = (val) => {
    if (modalVisible === val) {
      setModalVisible("");
    } else {
      setModalVisible(val);
    }
  };

  return (
    <View style={styles.mainCont}>
      <View style={styles.titleCont}>
        <Text style={styles.titleTxt}>Categories & Subcategories</Text>
      </View>
      <ScrollView showsVerticalScrollIndicator={false} key={categories._id}>
        <View style={styles.mainWrapper}>
          <FlatList
            showsVerticalScrollIndicator={false}
            data={categories}
            keyExtractor={(item, index) => index}
            renderItem={renderList}
          />
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  mainCont: {
    flex: 1,
    backgroundColor: "#fcfcfc",
  },
  titleCont: {
    marginTop: "20%",
    alignItems: "center",
    marginBottom: 20,
  },
  titleTxt: {
    fontWeight: "bold",
    fontSize: 20,
  },
  mainWrapper: {
    borderColor: "#777",
    borderWidth: 1,
    margin: 15,
  },
  wrapper: {
    flex: 1,
  },
  categoryCont: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 15,
  },
  moreVertical: {
    marginHorizontal: 15,
  },
  imgCont: {
    borderWidth: 1,
    borderColor: "black",
    height: 50,
    width: 50,
    marginRight: 10,
  },
  img: {
    height: 100,
    width: 100,
  },
  categoryTxt: {
    color: "black",
    fontSize: 18,
  },
  arrowCont: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "flex-end",
    marginHorizontal: 15,
  },
  catBorder: {
    borderBottomColor: "#777",
    borderBottomWidth: 1,
    marginHorizontal: -15,
  },
  subCatCont: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    marginVertical: 15,
  },
  subCatTxt: {
    fontSize: 17,
  },
  subCatBorder: {
    borderBottomColor: "#777",
    borderBottomWidth: 1,
    marginVertical: 5,
  },
});
