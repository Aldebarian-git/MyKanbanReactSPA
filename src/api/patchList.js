import { API_URL } from "./apiConfig";

const patchList = async (listId, title, position) => {
  const response = await fetch(`${API_URL}/lists/${listId}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ title, position }),
  });
  return response.json();
};

export default patchList;