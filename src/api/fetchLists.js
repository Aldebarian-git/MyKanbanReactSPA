import { useState } from "react";
import { API_URL } from "./apiConfig";


const useFetchLists = () => {
  const [lists, setLists] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchLists = async () => {
    setIsLoading(true);
    try {
      // Utilisation de fetch avec async/await
      const response = await fetch(`${API_URL}/lists`);
      
      // Vérification de la réponse
      if (!response.ok) {
        throw new Error("Erreur lors de la récupération des listes");
      }
      
      const result = await response.json();
      console.log("Données chargées :", result);
      setLists(result);
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return { lists, isLoading, error, fetchLists, setLists };
};

export default useFetchLists;



