import axios from "axios";

const BACKENDURL = "http://localhost:3001/items";
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
