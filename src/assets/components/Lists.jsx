import List from "./List.jsx";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import { useToast } from "../context/ToastContext";
import patchList from "../../api/patchList.js";
import patchCard from "../../api/patchCard.js";

const Lists = ({
  lists,
  onListDeleted,
  onListUpdated,
  onCardAdded,
  onCardDeleted,
  onCardUpdated,
  onListReordered,
}) => {
  const showToast = useToast();

  const onDragEnd = async (result) => {
    const { source, destination, type } = result;

    // Si l'élément n'a pas été déplacé ou s'il est revenu à sa position d'origine
    if (!destination || (source.index === destination.index && source.droppableId === destination.droppableId)) return;

    

    // Vérifier si c'est une réorganisation de listes ou de cartes
    if (type === "LIST") {
      // Réorganiser les listes
      const reorderedLists = Array.from(lists);
      const [removedList] = reorderedLists.splice(source.index, 1);
      reorderedLists.splice(destination.index, 0, removedList);

      // Mettre à jour les positions des listes
      const updatedLists = reorderedLists.map((list, index) => ({
        ...list,
        position: index + 1,
      }));

      onListReordered(updatedLists);

      try {
        updatedLists.forEach(async (list) => {
          await patchList(list.id, list.title, list.position);
        });
        showToast("Listes réorganisées avec succès");
      } catch (error) {
        console.error("Erreur lors de la réorganisation des listes", error);
        showToast("Erreur lors de la réorganisation des listes");
      }
    } else if (type === "CARD") {
      const sourceListId = parseInt(source.droppableId.split("t-")[1]);
      const destinationListId = parseInt(destination.droppableId.split("t-")[1]);
      
  
      const sourceList = lists.find((list) => list.id === sourceListId);
      const destinationList = lists.find((list) => list.id === destinationListId);
  
      if (!sourceList || !destinationList) return;
  
      const sourceCards = Array.from(sourceList.cards);
      const destinationCards =
        sourceListId === destinationListId
          ? sourceCards // Même liste => travailler sur la même référence
          : Array.from(destinationList.cards);
  
      // Extraire la carte déplacée
      const [movedCard] = sourceCards.splice(source.index, 1);
      movedCard.list_id = destinationListId;
  
      // Insérer à la nouvelle position
      destinationCards.splice(destination.index, 0, movedCard);
  
      // **Créer une liste de toutes les cartes affectées**
      const updatedCards = [
        ...sourceCards.map((card, index) => ({ ...card, position: index + 1 })),
        ...destinationCards.map((card, index) => ({ ...card, position: index + 1 })),
      ];
  
      // **Mettre à jour les listes**
      const updatedLists = lists.map((list) => {
        if (list.id === sourceListId) return { ...list, cards: sourceCards };
        if (list.id === destinationListId) return { ...list, cards: destinationCards };
        return list;
      });
  
      // **Mettre à jour l'affichage**
      onListReordered(updatedLists);
  
      try {
        // **Mettre à jour toutes les cartes en BDD**
        await Promise.all(
          updatedCards.map((card) =>
            patchCard(card.id, { list_id: card.list_id, position: card.position })
          )
        );
  
        showToast("Cartes réorganisées avec succès !");
      } catch (error) {
        console.error("Erreur lors de la mise à jour des cartes", error);
        showToast("Erreur lors de la mise à jour des cartes");
      }
    }

      
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="lists" direction="horizontal" type="LIST">
        {(provided) => (
          <div 
            ref={provided.innerRef}
            {...provided.droppableProps}
            className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4 max-w-[95%] mx-auto"
          >
            {lists.map((list, index) => (
              <Draggable
                key={list.id}
                draggableId={`list-${list.id}`}
                index={index}
              >
                {(provided) => (
                  <List
                    list={list}
                    onListDeleted={onListDeleted}
                    onListUpdated={onListUpdated}
                    onCardAdded={onCardAdded}
                    onCardDeleted={onCardDeleted}
                    onCardUpdated={onCardUpdated}
                    provided={provided}
                  />
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
};

export default Lists;
