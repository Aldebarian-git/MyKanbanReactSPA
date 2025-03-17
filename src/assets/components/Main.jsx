import React, { useState, useEffect } from "react";
import Lists from "./Lists.jsx";
import AddListModal from "./Modals/AddListModal.jsx";
import useFetchLists from "../../api/fetchLists.js";
import { Button } from "./elements/index.js";
import Test from "./ListsContainer.jsx";

const Main = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { lists, isLoading, error, fetchLists, setLists } = useFetchLists();

  useEffect(() => {
    fetchLists();
  }, []);

  if (isLoading) return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="p-6 bg-white shadow-lg rounded-lg flex flex-col items-center">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500 border-solid"></div>
        <p className="mt-4 text-gray-700 font-medium">Chargement de vos listes...</p>
      </div>
    </div>
  );
  
  if (error) return <div className="text-red-500 text-center mt-5">Erreur : {error}</div>;
  

  const handleListAdded = (newList) => {
    setLists((prevLists) => [...prevLists, newList]); // ✅ Mise à jour propre
  };

  const handleListDeleted = (listId) => {
    setLists((prevLists) => prevLists.filter((list) => list.id !== listId));
  };

  const handleListUpdated = (updatedList) => {
    setLists((prevLists) =>
      prevLists.map((list) => (list.id === updatedList.id ? updatedList : list))
    );
  };

  const handleCardAdded = (newCard) => {
    setLists((prevLists) =>
      prevLists.map((list) => {
        // Si la liste correspond à celle où la carte doit être ajoutée
        if (list.id === newCard.list_id) {
          // Vérifier si list.cards existe, si non, on le crée comme tableau vide
          const cards = list.cards || []; // Si list.cards n'existe pas, le créer comme tableau vide
          return { ...list, cards: [...cards, newCard] }; // Ajouter la nouvelle carte à la liste des cartes
        }
        return list;
      })
    );
  };

  const handleCardDeleted = (cardId) => {
    setLists((prevLists) =>
      prevLists.map((list) => {
        // Si la liste contient des cartes, on filtre les cartes pour exclure celle qui a l'ID cardId
        return {
          ...list, // On garde les autres propriétés de la liste
          cards: list.cards.filter((card) => card.id !== cardId), // On filtre les cartes pour exclure celle avec cardId
        };
      })
    );
  };

  const handleCardUpdated = (updatedCard) => {
    setLists((prevLists) =>
      prevLists.map((list) =>
        list.id === updatedCard.list_id
          ? {
              ...list,
              cards: list.cards.map((card) =>
                card.id === updatedCard.id ? updatedCard : card
              ),
            }
          : list
      )
    );
  };

  const handleListReordered = (reorderedLists) => {
    setLists(reorderedLists);
  };

  return (
    <div>
      <div className="flex justify-end max-w-[95%] mx-auto p-4">
        <Button 
          className="bg-transparent text-gray-800 hover:scale-110 transition-all duration-300 text-3xl font-caveat py-0 border-none"
          color="transparent"
          colorValue="500"          
          colorHoverValue="700"
          onClick={() => setIsModalOpen(true)}
        >
          Ajouter une liste
        </Button>
      </div>

      <Lists
        lists={lists}
        onListDeleted={handleListDeleted}
        onListUpdated={handleListUpdated}
        onCardAdded={handleCardAdded}
        onCardDeleted={handleCardDeleted}
        onCardUpdated={handleCardUpdated}
        onListReordered={handleListReordered}
      />
        {/* <Test lists={lists} /> */}

      {/* 🔥 Suppression de `lists={lists}` qui était inutile */}
      <AddListModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onListAdded={handleListAdded}
        lists={lists}
      />
    </div>
  );
};

export default Main;
