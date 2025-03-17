import { API_URL } from "./apiConfig";

const deleteCard = async (id) => {
    await fetch(`${API_URL}/cards/${id}`, {
        method: "DELETE",
    });
    
};

export default deleteCard;
