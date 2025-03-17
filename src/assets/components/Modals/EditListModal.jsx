import React, { useState } from "react";
import { useToast } from "../../context/ToastContext.jsx";
import patchList from "../../../api/patchList.js";

const EditListModal = ({ onClose, list, onListUpdated }) => {
    const [title, setTitle] = useState(list.title); // État pour gérer la valeur de l'input
    

    const showToast = useToast();
  
    // Fonction pour la soumission du formulaire
    const handleSubmit = async (e) => {
      e.preventDefault();
  
      if (!title.trim()) {
        showToast("Le titre est requis", "error");
        return;
      }
  
      try {
        // Logique pour mettre à jour la liste
        const updatedList = { ...list, title }; // Crée un nouvel objet liste avec le titre mis à jour
  
        // Appel à la fonction pour mettre à jour la liste (par exemple, via une API ou un state global)
        if(updatedList.title !== list.title){
          await patchList(updatedList.id, updatedList.title); // Appelle la fonction de mise à jour
          
          setTitle(updatedList.title);
           // Met à jour l'état local du titre
        }
        if(updatedList.title === list.title){
          showToast("Merci de rentrer un nouveau titre", "error");
          return
        }
  
        onListUpdated(updatedList); // Met à jour l'état global avec la liste mise à jour
  
        showToast("Liste mise à jour avec succès");
  
        // Fermer le modal uniquement après la mise à jour réussie
        onClose(); // Fermer le modal après la mise à jour réussie
      } catch (error) {
        console.error("Erreur lors de la mise à jour de la liste", error);
        showToast("Erreur lors de la mise à jour de la liste", "error");
      }
    };

  

  return (
    <div
      className="fixed inset-0 bg-black/20 backdrop-blur-sm flex justify-center items-center z-50"
      onClick={onClose}
    >
      <div
        className="bg-white p-6 rounded-lg w-80"
        onClick={(e) => e.stopPropagation()}
      >
        <form onSubmit={handleSubmit} >
          <div className="modal-card-head flex justify-between items-center mb-4">
            <p className="text-lg font-medium">Modifier la liste</p>
            <button
              className="text-gray-500 hover:text-gray-800"
              type="button"
              onClick={onClose}
            >
              <i className="fa fa-times" aria-hidden="true"></i>
            </button>
          </div>

          <div className="modal-card-body mb-4">
            <label
              htmlFor="modify-list-title"
              className="block text-sm font-medium text-gray-700"
            >
              Nouveau titre
            </label>
            <input
              id="modify-list-title"
              className="w-full p-2 mt-1 border border-gray-300 rounded-md"
              type="text"
              placeholder="Titre de la liste"
              value={title}
              onChange={(e)=>setTitle(e.target.value)} // La valeur de l'input est liée à l'état title              
            />
          </div>

          <div className="modal-card-foot flex justify-end space-x-4">
            <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded-md">
              Mettre à jour
            </button>
            <button
              className="bg-gray-500 text-white py-2 px-4 rounded-md"
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

export default EditListModal;


