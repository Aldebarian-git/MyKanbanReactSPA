import { API_URL } from "./apiConfig";

const patchCard = async (cardId, data) => {
  const response = await fetch(`${API_URL}/cards/${cardId}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  return response.json();
};

export default patchCard;