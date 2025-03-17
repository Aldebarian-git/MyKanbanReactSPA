import { API_URL } from "./apiConfig";

const postCard = async (data) => {
  const response = await fetch(`${API_URL}/cards`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  return response.json();
};

export default postCard;