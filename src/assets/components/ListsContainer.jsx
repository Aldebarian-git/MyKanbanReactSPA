
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";


const ListsContainer = ({ lists }) => {
  console.log(lists);
  
  // const [lists, setLists] = useState(initialLists);
  // setLists(listsTest)
  // Fonction qui gère la fin du drag-and-drop
  const onDragEnd = (result) => {
    // const { source, destination, type } = result;

    // // Si la destination est nulle, c'est qu'il n'y a pas de déplacement, donc on ne fait rien
    // if (!destination) return;

    // // Si c'est un déplacement de carte entre différentes listes ou au sein de la même liste
    // if (type === "CARD") {
    //   // Déplacement d'une carte
    //   if (source.droppableId !== destination.droppableId) {
    //     const sourceList = lists.find((list) => list.id === source.droppableId);
    //     const destinationList = lists.find(
    //       (list) => list.id === destination.droppableId
    //     );

    //     const [movedCard] = sourceList.cards.splice(source.index, 1);
    //     destinationList.cards.splice(destination.index, 0, movedCard);
    //   } else {
    //     // Déplacement de carte dans la même liste
    //     const list = lists.find((list) => list.id === source.droppableId);
    //     const [movedCard] = list.cards.splice(source.index, 1);
    //     list.cards.splice(destination.index, 0, movedCard);
    //   }
    // } else if (type === "LIST") {
    //   // Déplacement de liste
    //   const [movedList] = lists.splice(source.index, 1);
    //   lists.splice(destination.index, 0, movedList);
    // }

    // // Mise à jour de l'état après le déplacement
    // setLists([...lists]);
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="all-lists" direction="horizontal" type="LIST">
        {(provided) => (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4 p-4 "
            ref={provided.innerRef}
            {...provided.droppableProps}
            
          >
            {lists.map((list, index) => (
              <Draggable draggableId={`list-${list.id}`} index={index} key={list.id}>
                {(provided) => (
                  <div className="bg-blue-500 rounded-md p-4 "
                    ref={provided.innerRef}
                    {...provided.draggableProps}                                        
                  >
                    <h3 className="text-white cursor-move p-4 text-center mb-4" {...provided.dragHandleProps} >{list.title}</h3>
                    <Droppable droppableId={`list-${list.id}`} direction="vertical" type="CARD">
                      {(provided) => (
                        <div className="flex flex-col gap-4"
                          ref={provided.innerRef}
                          {...provided.droppableProps}
                          
                        >
                          {list.cards.map((card, index) => (
                            <Draggable draggableId={`card-${card.id}`} index={index} key={card.id}>
                              {(provided) => (
                                <div className="bg-red-500 rounded-md p-4"
                                  ref={provided.innerRef}
                                  {...provided.draggableProps}
                                                                   
                                >
                                  <span {...provided.dragHandleProps} >{card.content}</span>
                                </div>
                              )}
                            </Draggable>
                          ))}
                          {provided.placeholder}
                        </div>
                      )}
                    </Droppable>
                  </div>
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

export default ListsContainer;








