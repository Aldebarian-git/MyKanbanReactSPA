import React, { useState } from "react";
import Card from "./Card.jsx";
import DeleteListModal from "./Modals/DeleteListModal.jsx";
import EditListModal from "./Modals/EditListModal.jsx";
import AddCardModal from "./Modals/AddCardModal.jsx";
import { Droppable, Draggable } from "@hello-pangea/dnd";

const List = ({
  list,
  onListDeleted,
  onListUpdated,
  onCardAdded,
  onCardDeleted,
  onCardUpdated,
  provided,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isAddCardModalOpen, setIsAddCardModalOpen] = useState(false);
  const listId = list.id;

  return (
    <div
      data-type="list"
      data-id={listId}
      data-position={list.position}
      className="relative max-w-[600px] bg-gradient-to-br from-yellow-300 via-yellow-300 to-yellow-400 shadow-xl pt-16 pb-4 pl-4 pr-4"
      ref={provided.innerRef}
      {...provided.draggableProps}
    >
      {" "}
      {/* <div class="absolute bottom-[-30px] right-[30px] w-16 h-16 bg-yellow-300 transform rotate-85 shadow-md origin-bottom-right"></div> */}
      <div class="ribbon-2 bg-red-400 font-caveat text-2xl text-gray-800">
        <span data-list-title={list.id} className="font-caveat text-2xl">
          {list.title}
        </span>
      </div>
      <div className="flex justify-between items-center mb-4 p-4  absolute top-2 left-2 gap-5">
        <i
          className="fas fa-arrows-alt drag-button cursor-grab"
          {...provided.dragHandleProps}
        ></i>

        <div className="flex justify-between gap-3">
          <span className="cursor-pointer text-amber-500">
            <i
              className="fas fa-pencil-alt edit-list-button"
              onClick={() => {
                setIsEditModalOpen(true);
              }}
            ></i>
          </span>
          <span className="cursor-pointer text-green-500">
            <i
              className="fas fa-plus add-card-button"
              onClick={() => {
                setIsAddCardModalOpen(true);
              }}
            ></i>
          </span>
          <span className="cursor-pointer text-red-500">
            <i
              className="fas fa-trash delete-list-button"
              onClick={() => {
                setIsModalOpen(true);
              }}
            ></i>
          </span>
        </div>
      </div>
      <Droppable
        droppableId={`droppable-list-${listId}`}
        direction="vertical"
        type="CARD"
      >
        {(provided) => (
          <div
            className="pr-6 pl-6"
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            
            {list.cards &&
              list.cards.map((card, index) => (
                <Draggable
                  key={card.id}
                  draggableId={String(card.id)}
                  index={index}
                >
                  {(provided) => (
                    <Card
                      card={card}
                      listId={listId}
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
      {/* Modal pour supprimer la liste */}
      {isModalOpen && (
        <DeleteListModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          listId={listId}
          onListDeleted={onListDeleted}
        />
      )}
      {/* Modal pour modifier la liste */}
      {isEditModalOpen && (
        <EditListModal
          isOpen={isEditModalOpen}
          onClose={() => setIsEditModalOpen(false)}
          list={list}
          onListUpdated={onListUpdated}
        />
      )}
      {isAddCardModalOpen && (
        <AddCardModal
          isOpen={isAddCardModalOpen}
          onClose={() => setIsAddCardModalOpen(false)}
          listId={listId}
          onCardAdded={onCardAdded}
        />
      )}
    </div>
  );
};

export default List;
