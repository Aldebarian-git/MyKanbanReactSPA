import React from 'react';

import { useToast } from '../../context/ToastContext.jsx';
import deleteCard from '../../../api/deleteCards.js';

const DeleteCardModal = ({ onClose, cardId, onCardDeleted }) => {
    const showToast = useToast();

    const handleDelete = async (id) => {
        
      try {
          await deleteCard(id);
            onCardDeleted(id);
            showToast("Carte supprimée avec succès");
            onClose();
        } catch (error) {
            console.error(error);
            showToast("Erreur lors de la suppression de la carte");
        }
    }
    return (
        <div
      className="fixed inset-0 bg-black/20 backdrop-blur-sm flex justify-center items-center z-50 font-sans text-xl "
      onClick={onClose}
    >
      <div
        className="bg-white p-6 rounded-lg w-80"
        onClick={(e) => e.stopPropagation()}
      >
        <h1 className="text-xl">Supprimer la carte</h1> 
        <p className="text-lg my-2">Voulez-vous vraiment supprimer cette carte ?</p>
        <div className="modal-card-foot flex justify-end space-x-4">
          <button
            type="submit"
            className="bg-red-500 hover:bg-red-600 transition-colors duration-300 cursor-pointer text-white py-2 px-4 rounded-md"
            onClick={() => handleDelete(cardId)}
          >
            Supprimer
          </button>
          <button className="bg-gray-500 hover:bg-gray-600 transition-colors duration-300 cursor-pointer text-white py-2 px-4 rounded-md" onClick={onClose}>
            Annuler
          </button>
        </div>
      </div>
    </div>
    );
};

export default DeleteCardModal;