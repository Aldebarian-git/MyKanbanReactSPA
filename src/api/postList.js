import { API_URL } from "./apiConfig";

const addList = async (title, position) => {
  const response = await fetch(`${API_URL}/lists`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ title, position }),
  });
  return response.json();
};

export default addList;
