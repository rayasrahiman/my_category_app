import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Button,
  Image,
} from "react-native";
import { MaterialIcons, AntDesign } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";

export default function AddNewScreen() {
  const [cName, setCName] = useState("");
  const [cSubName, setCSubName] = useState("");
  const [pickedImagePath, setPickedImagePath] = useState("");
  const [textInp, setTextInp] = useState([{ name: "" }]);

  const postCategory = async () => {
    if (cSubName) {
      var arr = textInp.filter((val) =>
        val.name === "" ? (val.name = cSubName) : val
      );
    }
    try {
      let body = new FormData();
      body.append("category_name", cName);
      body.append("sub_cateries", arr);
      body.append("image", {
        uri: pickedImagePath,
        name: "photo.png",
        filename: "imageName.png",
        type: "image/png",
      });

      const postResp = await fetch(
        "https://dmapi.ipaypro.co/app_task/categories/add",
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "multipart/form-data",
          },
          body: body,
        }
      );
      const resp = await postResp.json();
      console.log(resp, "POST DATA");
    } catch (error) {
      console.log(error);
    }
  };

  const showImagePicker = async () => {
    const permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permissionResult.granted === false) {
      alert("You've refused to allow this appp to access your photos!");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync();

    console.log(result);

    if (!result.cancelled) {
      setPickedImagePath(result.uri);
      console.log(result.uri, "URI HERE");
    }
  };

  const addTextInputLayer = () => {
    let arr = [...textInp];
    arr.unshift({ name: cSubName });
    setTextInp(arr);
    setCSubName("");
  };
  const minusTextInputLayer = () => {
    let arr = [...textInp];
    if (arr.length > 1) {
      arr.pop();
      setTextInp(arr);
    }
  };

  return (
    <View style={styles.mainCont}>
      <View style={styles.titleCont}>
        <Text style={styles.titleTxt}>Add Categories & Subcategories</Text>
      </View>
      <View style={styles.borderLine} />
      <View style={styles.mainInputCont}>
        <View style={styles.inputContTitle}>
          <Text style={styles.inputTitle}>Category Name</Text>
        </View>
        <TextInput
          style={styles.txtInput}
          onChangeText={(txt) => setCName(txt)}
        />
      </View>
      <View style={styles.mainInputCont}>
        <View style={styles.inputContTitle}>
          <Text style={styles.inputTitle}>Category Image</Text>
        </View>
        <View style={styles.imgBtnCont}>
          <View style={styles.imgCont}>
            <Text>Img tile</Text>
            <Image
              source={{ uri: pickedImagePath }}
              style={{ height: 100, width: 100 }}
            />
          </View>
          <TouchableOpacity onPress={showImagePicker} style={styles.btnCont}>
            <Text style={styles.btnTxt}>Choose file</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.mainInputCont}>
        <View style={styles.inputContTitle}>
          <Text style={styles.inputTitle}>Create sub-categories</Text>
        </View>
        <View style={styles.mainBtnCont}>
          <View style={{ flexDirection: "column", width: "90%" }}>
            {textInp.map((val, index) => (
              <View key={index} style={styles.mainInputWrapper}>
                <TextInput
                  style={styles.txtInp}
                  onChangeText={(txt) => setCSubName(txt)}
                />
              </View>
            ))}
          </View>
          <View style={styles.mainbtnWrapper}>
            <View style={styles.btnWrapper}>
              <MaterialIcons
                onPress={addTextInputLayer}
                name="add-box"
                size={30}
                color="#02a0e8"
                disabled={cSubName === "" ? true : false}
              />
            </View>
            <View style={styles.btnWrapper}>
              <AntDesign
                onPress={minusTextInputLayer}
                name="minussquare"
                size={30}
                color="#949494"
                disabled={textInp.length > 1 ? false : true}
              />
            </View>
          </View>
        </View>
      </View>
      <Button title="ADD" onPress={postCategory} />
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
  borderLine: {
    borderBottomWidth: 1,
    borderBottomColor: "black",
    width: "95%",
    marginHorizontal: 10,
  },
  mainInputCont: {
    margin: 10,
  },
  inputContTitle: {
    marginVertical: 10,
  },
  inputTitle: {
    fontWeight: "bold",
    fontSize: 16,
  },
  txtInput: {
    borderWidth: 1,
    borderColor: "black",
    padding: 10,
    borderRadius: 2,
  },
  imgBtnCont: {
    flexDirection: "row",
    alignItems: "center",
  },
  imgCont: {
    marginRight: 10,
    borderWidth: 1,
    borderStyle: "dashed",
    width: "40%",
    height: 100,
    padding: 15,
    alignItems: "center",
    justifyContent: "center",
  },
  btnCont: {
    borderRadius: 2,
    backgroundColor: "#019fe6",
    padding: 10,
    width: "35%",
    height: 40,
    alignItems: "center",
  },
  btnTxt: {
    color: "#fcfcfc",
  },
  mainBtnCont: {
    flexDirection: "row",
  },
  mainInputWrapper: {
    width: "90%",
  },
  txtInp: {
    borderWidth: 1,
    borderColor: "black",
    padding: 10,
    borderRadius: 2,
    height: 40,
    marginBottom: 15,
  },
  mainbtnWrapper: {
    marginLeft: 10,
  },
  btnWrapper: {
    marginVertical: 5,
  },
});
