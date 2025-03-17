
import { API_URL } from "../../../api/apiConfig.js";
import { useToast } from "../../context/ToastContext.jsx";

const DeleteListModal = ({ onClose, listId, onListDeleted }) => {
    const showToast = useToast();

  // Fonction pour supprimer une liste
  const handleDelete = async (id) => {    
    try {
      const response = await fetch(`${API_URL}/lists/${id}`, {
        method: "DELETE",
      });
      if (response.ok) {
        // Supprimer la liste de la liste dans le state local
        showToast("Liste supprimée avec succès");
        onClose();        
        onListDeleted(id);
      } else {
        showToast("Erreur lors de la suppression de la liste");
      }
    } catch (error) {
      showToast("Erreur lors de la suppression de la liste:", error);
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
        <h1>Supprimer la liste</h1>
        <p>Voulez-vous vraiment supprimer cette liste ?</p>
        <div className="modal-card-foot flex justify-end space-x-4">
          <button 
            type="submit"
            className="bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600 cursor-pointer"
            onClick={() => handleDelete(listId)}
          >
            Supprimer
          </button>
          <button className="bg-gray-500 text-white py-2 px-4 rounded-md hover:bg-gray-600 cursor-pointer" onClick={onClose}>
            Annuler
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteListModal;
