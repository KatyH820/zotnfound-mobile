import axios from "axios";
// import Constants from "expo-constants";

//This so I can test it on my real device with backend
// const BACKENDURL = Constants?.expoConfig?.hostUri
//   ? `http://${Constants.expoConfig.hostUri.split(`:`).shift().concat(`:3001`)}`
//   : `http://localhost:3001`;

// //before
// const BACKENDURL = "http://localhost:3001/items";

// use this for android sim
// const BACKENDURL = "http://10.0.2.2:3001/items";

const BACKENDURL = "https://api.zotnfound.com";

export async function fetchItems() {
  try {
    const data = await axios.get(BACKENDURL + "/items");
    return data.data;
  } catch (error) {
    console.error(error);
  }
}

export async function filterItemsByCategory(category) {
  try {
    const data = await axios.get(`${BACKENDURL}/items/category/${category}`);

    return data.data;
  } catch (error) {
    console.error(error);
  }
}

export async function addItem(item) {
  try {
    await axios.post(BACKENDURL + "/items", item);
  } catch (error) {
    console.error(error);
  }
}

export async function deleteItem(itemId) {
  try {
    await axios.delete(`${BACKENDURL}/items/${itemId}`);
  } catch (error) {
    console.error(error);
  }
}

export async function getLeaderboard() {
  try {
    const data = await axios.get(`${BACKENDURL}/leaderboard`);

    return data;
  } catch (error) {
    console.error(error);
  }
}
