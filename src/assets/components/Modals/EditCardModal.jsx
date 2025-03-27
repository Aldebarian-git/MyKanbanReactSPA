import React, { useState } from "react";
import { useToast } from "../../context/ToastContext";
import patchCard from "../../../api/patchCard";


const EditCardModal = ({ onClose, card, onCardUpdated}) => {
    const [content, setContent] = useState(card.content);
    const showToast = useToast();
  
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!content.trim()) {
        showToast("Le contenu est requis", "error");
        return;
      }
  
      try {
        // Logique pour mettre à jour la liste
        const updatedCard = { ...card, content }; // Crée un nouvel objet liste avec le titre mis à jour
                
        // Appel à la fonction pour mettre à jour la liste (par exemple, via une API ou un state global)
        if(updatedCard.content !== card.content){
          await patchCard(updatedCard.id, {content: updatedCard.content}); // Appelle la fonction de mise à jour
          
          onCardUpdated(updatedCard);
           // Met à jour l'état local du titre
        }
        if(updatedCard.content === card.content){
          showToast("Merci de rentrer un nouveau contenu", "error");
          return
        }
  
        // Met à jour l'état global avec la liste mise à jour
  
        showToast("Carte mise à jour avec succès");
  
        // Fermer le modal uniquement après la mise à jour réussie
        onClose(); 
      } catch (error) {
        console.error("Erreur lors de la mise à jour de la carte", error);
            showToast("Erreur lors de la mise à jour de la carte", "error");
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
        <form onSubmit={handleSubmit}>
          <div className="modal-card-head flex justify-between items-center mb-4">
            <p className="text-lg font-medium">Modifier la carte</p>
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
              htmlFor="modify-card-content"
              className="block text-sm font-medium text-gray-700"
            >
              Contenu
            </label>
            <input
              id="modify-card-content"
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
              Mettre à jour
            </button>
            <button
              type="button"
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

export default EditCardModal;

