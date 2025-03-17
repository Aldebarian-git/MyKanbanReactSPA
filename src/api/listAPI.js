import { API_URL } from "./apiConfig";

const listAPI = {
  async getAllLists() {
    try {
      const response = await fetch(`${API_URL}/lists`);
      if (!response.ok) {
        throw new Error(
          "Erreur lors de la récupération des données utilisateur"
        );
      }
      return await response.json();
    } catch (error) {
      throw new Error(error.message);
    }
  },

  async addList(title) {
    const response = await fetch(`${API_URL}/lists`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title }),
    });
    return response.json();
  },

  async deleteList(id) {
    const response = await fetch(`${API_URL}/lists/${id}`, {
      method: "DELETE",
    });
    return response.json();
  },

  async updateList(id, title) {
    const response = await fetch(`${API_URL}/lists/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title }),
    });
    return response.json();
  },

  async addCard(listId, content) {
    const response = await fetch(`${API_URL}/cards`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ listId, content }),
    });
    return response.json();
  },

  async deleteCard(id) {
    const response = await fetch(`${API_URL}/cards/${id}`, {
      method: "DELETE",
    });
    return response.status;
  },

  async updateCard(id, content) {
    const response = await fetch(`${API_URL}/cards/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ content }),
    });
    return response.json();
  },
};

export default listAPI;
