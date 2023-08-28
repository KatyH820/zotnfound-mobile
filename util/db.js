import axios from "axios";
import Constants from "expo-constants";


//This so I can test it on my real device with backend
const BACKENDURL = Constants?.expoConfig?.hostUri
  ? `http://${Constants.expoConfig.hostUri
      .split(`:`)
      .shift()
      .concat(`:3001/items`)}`
  : `http://localhost:3001/items`;


//before
// const BACKENDURL = "http://localhost:3001/items";

export async function fetchItems() {
  try {
    const data = await axios.get(BACKENDURL);
    return data.data;
  } catch (error) {
    console.error(error);
  }
}

export async function filterItemsByCategory(category) {
  try {
    const data = await axios.get(`${BACKENDURL}/category/${category}`);

    return data.data;
  } catch (error) {
    console.error(error);
  }
}

export async function addItem(item) {
  try {
    await axios.post(BACKENDURL, item);
  } catch (error) {
    console.error(error);
  }
}
