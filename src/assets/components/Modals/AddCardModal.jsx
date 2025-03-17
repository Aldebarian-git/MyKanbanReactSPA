import React, { useState } from "react";
import postCard from "../../../api/postCard";
import { useToast } from "../../context/ToastContext";


const AddCardModal = ({ onClose, listId, onCardAdded }) => {
  const [content, setContent] = useState("");

  const showToast = useToast();

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("listId", listId);
    console.log("content", content);

    if (!content || content === "") {
      showToast("Veuillez saisir un contenu pour la carte !");
      return;
    }

    if(content.length < 3) {
      showToast("Le contenu de la carte doit contenir au moins 3 caractères !", "error");
      return;
    }

    if (!listId) {
      showToast("Impossible de créer la carte !");
      return;
    }

    const response = await postCard({list_id: listId, content: content});

    if (response === null) {
      showToast("Impossible de créer la carte !");
      return;
    }

    setContent("");
    showToast("Carte créée !");
    onClose();
    onCardAdded(response);
  };

  return (
    <div
      className="fixed inset-0 bg-black/20 backdrop-blur-sm flex justify-center items-center z-50"
      onClick={onClose}
    >
      <div
        className="bg-white p-6 rounded-lg w-80"
        onClick={(e) => e.stopPropagation()} // Empêche la fermeture si on clique à l'intérieur du modal
      >
        <form onSubmit={handleSubmit}>
          <div className="modal-card-head flex justify-between items-center mb-4">
            <p className="text-lg font-medium">Ajouter une carte</p>
            
            <button
              className="text-gray-500 hover:text-gray-800 cursor-pointer"
              type="button"
              onClick={onClose}
            >
              <i className="fa fa-times" aria-hidden="true"></i>
            </button>
          </div>

          <div className="modal-card-body mb-4">
            <label
              htmlFor="card-description"
              className="block text-sm font-medium text-gray-700 mt-4"
            >
              Contenu de la carte
            </label>
            <input
              id="card-description"
              className="w-full p-2 mt-1 border border-gray-300 rounded-md"
              placeholder="Contenu de la carte"
              value={content}
              onChange={(e) => setContent(e.target.value)} // Met à jour l'état de la description
            />
          </div>

          <div className="modal-card-foot flex justify-end space-x-4">
            <button
              type="submit"
              className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition-colors duration-300 cursor-pointer"
            >
              Ajouter la carte
            </button>
            
            <button
              className="bg-gray-500 text-white py-2 px-4 rounded-md hover:bg-gray-600 transition-colors duration-300 cursor-pointer"
              onClick={onClose}
            >
              Annuler
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddCardModal;
