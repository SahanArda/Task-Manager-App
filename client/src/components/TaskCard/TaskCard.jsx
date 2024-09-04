import PropTypes from "prop-types";
import { FiEdit, FiTrash } from "react-icons/fi";

const TaskCard = ({ id, title, description, status, onEdit, onDelete }) => {
  return (
    <div className="flex items-start justify-between max-w-sm min-h-48 bg-white shadow-md rounded-md p-4 mb-4">
      <div>
        <h3 className="text-xl font-semibold mb-2">{title}</h3>
        <p className="text-gray-600 mb-3">{description}</p>
        <span
          className={`px-2 py-1 rounded-md text-white text-sm ${
            status === "completed" ? "bg-blue-500" : "bg-red-500"
          }`}
        >
          {status}
        </span>
      </div>
      <div className="flex space-x-2">
        <FiEdit
          className="text-blue-500 cursor-pointer"
          onClick={() => onEdit(id)}
        />
        <FiTrash
          className="text-red-500 cursor-pointer"
          onClick={() => onDelete(id)}
        />
      </div>
    </div>
  );
};

TaskCard.propTypes = {
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  status: PropTypes.string.isRequired,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default TaskCard;
