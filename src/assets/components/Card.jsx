import React, { useState, useMemo } from 'react';
import DeleteCardModal from './Modals/DeleteCardModal.jsx'; 
import EditCardModal from './Modals/EditCardModal.jsx';

const Card = ({ card, listId, onCardDeleted, onCardUpdated, provided }) => {
    const [isDeleteCardModalOpen, setIsDeleteCardModalOpen] = useState(false);
    const [isEditCardModalOpen, setIsEditCardModalOpen] = useState(false);

    // Liste des couleurs possibles
    
    const postItColors = ["pink", "yellow", "green", "purple"];
    const randomPostItColor = useMemo(() => {
        const colorIndex = card.id %   postItColors.length;  // Utiliser l'ID de la carte pour obtenir un index de couleur
        return postItColors[colorIndex];
    }, [card.id]); // Cela recalculera uniquement si l'ID de la carte change

    const tapeEffect = ["tape-section", "top-tape"];
    const randomTapeEffect = useMemo(() => {
        const effectIndex = card.id % tapeEffect.length;  // Utiliser l'ID de la carte pour obtenir un index d'effet
        return tapeEffect[effectIndex];
    }, [card.id]); // Cela recalculera uniquement si l'ID de la carte change

    const rotateEffect = ["rotate-2", "rotate-0", "rotate-5", "rotate-3", "-rotate-2", "-rotate-5", "-rotate-3"];

    const randomRotateEffect = useMemo(() => {
        const effectIndex = card.id % rotateEffect.length;  // Utiliser l'ID de la carte pour obtenir un index d'effet
        return rotateEffect[effectIndex];
    }, [card.id]); // Cela recalculera uniquement si l'ID de la carte change

    const fontSizeEffect = ["text-3xl", "text-2xl", "text-4xl"];

    const randomFontSizeEffect = useMemo(() => {
        const effectIndex = card.id % fontSizeEffect.length;  // Utiliser l'ID de la carte pour obtenir un index d'effet
        return fontSizeEffect[effectIndex];
    }, [card.id]); // Cela recalculera uniquement si l'ID de la carte change

    

    return (
        
        <div ref={provided.innerRef} {...provided.draggableProps} className={`max-w-[90%] p-4 flex justify-between items-center mb-4 shadow-md font-caveat paper ${randomPostItColor}`} data-list-id={listId} data-card-id={card.id} data-card-position={card.position}>
            <div className={`${randomTapeEffect}`}></div>
            <i className="fas fa-arrows-alt drag-button p-2 cursor-grab absolute top-0 left-0 z-10 text-xl text-gray-700" {...provided.dragHandleProps}></i>
            <p className={`break-words p-2 text-3xl text-gray-800 ${randomRotateEffect} ${randomFontSizeEffect}`}>{card.content}</p>
            <div className="flex justify-between absolute top-0 right-0 text-xl z-10">
                <span className="cursor-pointer text-amber-500 p-2">
                    <i className="fas fa-pencil-alt edit-card-button" onClick={() => {setIsEditCardModalOpen(true)}}></i>
                </span>
                <span className="cursor-pointer text-red-400 p-2 text-shadow-md">
                    <i className="fas fa-trash delete-card-button" onClick={() => {setIsDeleteCardModalOpen(true)}}></i>
                </span>                
            </div>
            {isDeleteCardModalOpen && (
                <DeleteCardModal
                isOpen={isDeleteCardModalOpen}
                onClose={() => setIsDeleteCardModalOpen(false)}
                cardId={card.id}
                onCardDeleted={onCardDeleted}
                />
            )}
            {isEditCardModalOpen && (
                <EditCardModal
                isOpen={isEditCardModalOpen}
                onClose={() => setIsEditCardModalOpen(false)}
                card={card}
                onCardUpdated={onCardUpdated}
                />
            )}

            <div className={`${randomTapeEffect}`}></div>
        </div>
            
    );
};

export default Card;
