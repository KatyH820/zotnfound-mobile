import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Switch, Alert, Image } from "react-native";
import Input from "../components/Input";
import { SelectList } from "react-native-dropdown-select-list";
import DateTimePicker, {
  DateTimePickerEvent,
} from "@react-native-community/datetimepicker";
import {
  launchCameraAsync,
  useCameraPermissions,
  PermissionStatus,
  launchImageLibraryAsync,
  useMediaLibraryPermissions,
} from "expo-image-picker";
import { Entypo } from "@expo/vector-icons";
import Button from "../components/Button";
import { MaterialIcons } from "@expo/vector-icons";
import { Color } from "../constant/Color";
import { Feather } from "@expo/vector-icons";
import {
  useIsFocused,
  useNavigation,
  useRoute,
} from "@react-navigation/native";
import { addItem } from "../util/db";
import { useDispatch } from "react-redux";
import { itemsAction } from "../store/Items";
import moment from "moment";

export default function AddItem(): JSX.Element {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const route = useRoute();
  const isFocused = useIsFocused();
  const [pickedLocation, setPickedLocation] = useState();
  const [nameInput, setNameInput] = useState();
  const [descriptionInput, setDescriptionInput] = useState();
  const [isLost, setIsLost] = useState(false);
  const [type, setType] = useState();
  const [itemDate, setItemDate] = useState(moment());
  const [image, setImage] = useState();
  const [cameraPermissionInfo, requestPermission] = useCameraPermissions();
  const [photoPermissionInfo, requestPhotoPermission] =
    useMediaLibraryPermissions();
  useEffect(() => {
    setPickedLocation(route.params?.pickedLocation);
  }, [isFocused]);

  const categoryType = [
    { key: 1, value: "Phone" },
    { key: 2, value: "Headphone" },
    { key: 3, value: "Wallet" },
    { key: 4, value: "Key" },
    { key: 5, value: "Other" },
  ];

  const handleDateChange = (
    event: DateTimePickerEvent,
    selectedDate?: Date
  ) => {
    if (selectedDate !== undefined) {
      setItemDate(moment(selectedDate));
    }
  };

  async function verifyCameraPermission() {
    if (cameraPermissionInfo?.status === PermissionStatus.UNDETERMINED) {
      const permissionRes = await requestPermission();
      return permissionRes.granted;
    }
    if (cameraPermissionInfo?.status === PermissionStatus.DENIED) {
      Alert.alert(
        "Insufficient Permission",
        "You need to grant camera permissions to use this functionality"
      );
      return false;
    }
    return true;
  }

  async function verifyPhotoAlbumPermission() {
    if (photoPermissionInfo?.status === PermissionStatus.UNDETERMINED) {
      const res = await requestPhotoPermission();
      return res.granted;
    }
    if (photoPermissionInfo?.status === PermissionStatus.DENIED) {
      Alert.alert(
        "Insufficient Permission",
        "You need to grant photo library access permissions to use this functionality"
      );
      return false;
    }
    return true;
  }

  async function takeImageHandler() {
    const hasPermission = await verifyCameraPermission();
    if (!hasPermission) {
      return;
    }
    const image = await launchCameraAsync({
      allowsEditing: true,
      aspect: [16, 9],
      quality: 0.5,
    });

    if (!image.canceled) {
      setImage(image.assets[0].uri);
    }
  }

  async function pickImageHandler() {
    const hasPermission = await verifyPhotoAlbumPermission();
    if (!hasPermission) {
      return;
    }
    const image = await launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [16, 9],
      quality: 0.5,
    });
    if (!image.canceled) {
      setImage(image.assets[0].uri);
    }
  }

  function pickOnMap() {
    navigation.navigate("Choose");
  }
  function submitHandler() {
    // await addItem({
    // name: nameInput,
    // description: descriptionInput,
    // type: type,
    // location: [pickedLocation.lat, pickedLocation.lng],
    // date: new Date(),
    // itemDate: itemDate,
    // email: "",
    // image: image,
    // isLost: isLost,
    // });

    if (!pickedLocation || !nameInput || !descriptionInput || !type || !image) {
      Alert.alert("Missing Information", "You must enter all Information");
      return;
    }

    const newItem = {
      id: nameInput + descriptionInput + type,
      name: nameInput,
      description: descriptionInput,
      type: type,
      location: [pickedLocation.lat, pickedLocation.lng],
      date: moment().format("YYYY-MM-DD"),
      itemDate: itemDate.format("YYYY-MM-DD"),
      email: "",
      image: image,
      isLost: isLost,
    };
    dispatch(itemsAction.addItem(newItem));

    navigation.navigate("Map", { newItem });
  }

  return (
    <View style={styles.screen}>
      <Text style={styles.title}>Add Item</Text>
      <Input
        placeholder="Enter Item Name"
        value={nameInput}
        onChangeText={(text: string) => setNameInput(text)}
        label="Name"
        multiline={false}
      />
      <Input
        placeholder="Enter Item Description"
        value={descriptionInput}
        onChangeText={(text: string) => setDescriptionInput(text)}
        label="Description"
        multiline={true}
        height={100}
      />
      <SelectList
        setSelected={(val) => setType(val)}
        data={categoryType}
        save="value"
        boxStyles={styles.dropdown}
        notFoundText="No type found, please select type other"
        defaultOption={{ key: 5, value: "Other" }}
      />
      <View style={styles.container}>
        <Text style={styles.text}>This is Lost Item</Text>
        <Switch value={isLost} onValueChange={setIsLost} />
      </View>

      <View style={styles.container}>
        <Text style={styles.text}>Date</Text>
        <DateTimePicker
          mode="date"
          value={new Date(itemDate)}
          onChange={handleDateChange}
          display="calendar"
        />
      </View>

      <View style={styles.container}>
        <Text style={styles.text}>Location</Text>
        <Button style={styles.button} onPress={pickOnMap}>
          {pickedLocation ? (
            <Text style={styles.text}>
              {pickedLocation.lat.toFixed(2)} , {pickedLocation.lng.toFixed(2)}
            </Text>
          ) : (
            <Feather name="map-pin" size={24} color="black" />
          )}
        </Button>
      </View>

      <View style={styles.container}>
        <Button style={styles.button} onPress={takeImageHandler}>
          <Entypo name="camera" size={24} color="black" />
        </Button>
        <Button style={styles.button} onPress={pickImageHandler}>
          <MaterialIcons name="photo-library" size={24} color="black" />
        </Button>
      </View>

      {image && (
        <View style={styles.imgPreview}>
          <Image source={{ uri: image }} style={styles.img} />
        </View>
      )}

      <Button
        onPress={submitHandler}
        style={[styles.button, { marginTop: "4%" }]}
      >
        <Text style={[styles.text, { fontWeight: "bold" }]}>Submit</Text>
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
  },
  text: {
    fontSize: 16,
  },
  dropdown: {
    width: 300,
    marginBottom: "3%",
  },
  container: {
    width: "80%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: "1.5%",
  },
  button: {
    backgroundColor: Color.buttonGray,
    paddingHorizontal: "9%",
    borderRadius: 10,
    paddingVertical: "2.5%",
  },
  imgPreview: {
    height: "25%",
    width: "90%",

    borderRadius: 10,
    overflow: "hidden",
  },
  img: {
    flex: 1,
  },
});
