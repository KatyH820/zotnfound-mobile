import axios from "axios";
export async function fetchItems() {
  try {
    const data = await axios.get("http://localhost:3001/items");
    return data.data;
  } catch (error) {
    console.error(error);
  }
}

export async function filterItemsByCategory(category) {
  try {
    const data = await axios.get(
      `http://localhost:3001/items/category/${category}`
    );

    return data.data;
  } catch (error) {
    console.error(error);
  }
}
