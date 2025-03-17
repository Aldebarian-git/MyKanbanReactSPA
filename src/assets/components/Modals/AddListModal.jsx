import React, { useState } from "react";
import addList from "../../../api/postList";
import { useToast } from "../../context/ToastContext";
import { Button } from "../elements/index.js";

const Modal = ({ isOpen, onClose, onListAdded, lists}) => {
  const [title, setTitle] = useState("");
  const showToast = useToast();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title.trim()) {
      console.log("Le titre est requis");
      return;
    }

    try {
      const response = await addList(title, (lists.length + 1));      
      const newList = response;      

      setTitle(""); // Réinitialiser le champ titre
      onClose(); // Fermer le modal
      onListAdded(newList); // 🔥 Demande à `Main.jsx` de recharger les listes !
      showToast("Liste ajoutée avec succès");
      

    } catch (error) {
      console.error("Erreur lors de l'ajout de la liste", error);
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black/20 backdrop-blur-sm flex justify-center items-center z-50"
      onClick={onClose}
    >
      <div
        className="bg-white p-6 rounded-lg w-80"
        onClick={(e) => e.stopPropagation()}
      >
        <form onSubmit={handleSubmit}>
          <div className="modal-card-head flex justify-between items-center mb-4">
            <p className="text-lg font-medium">Ajouter une liste</p>
            
            <Button
              onClick={onClose}>                            
              <i className="fa fa-times text-gray-500 hover:text-red-800" aria-hidden="true"></i>
            </Button>
          </div>

          <div className="modal-card-body mb-4">
            <label
              htmlFor="modify-list-title"
              className="block text-sm font-medium text-gray-700"
            >
              Titre
            </label>
            <input
              id="modify-list-title"
              className="w-full p-2 mt-1 border border-gray-300 rounded-md"
              type="text"
              placeholder="Titre de la liste"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          <div className="modal-card-foot flex justify-end space-x-4">
            <Button color="blue" colorValue="500" colorHover="blue" colorHoverValue="700" type="submit">Ajouter</Button>
            <Button onClick={onClose} color="gray" colorValue="500" colorHover="gray" colorHoverValue="900">Annuler</Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Modal;
