import axios from "axios";
export async function fetchItems() {
  try {
    const data = await axios.get("http://localhost:3001/items");
    return data.data;
  } catch (error) {
    console.log(error);
  }
}
