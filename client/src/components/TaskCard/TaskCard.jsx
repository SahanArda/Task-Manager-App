import PropTypes from "prop-types";

const TaskCard = ({ title, description, status }) => {
  TaskCard.propTypes = {
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    status: PropTypes.string.isRequired,
  };
  return (
    <div className="flex items-start justify-center flex-col max-w-sm min-h-44 bg-white shadow-md rounded-md p-4 mb-4">
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-gray-600 mb-3">{description}</p>
      <span
        className={`px-2 py-1 rounded-md text-white text-sm ${
          status === "completed" ? "bg-green-500" : "bg-red-500"
        }`}
      >
        {status}
      </span>
    </div>
  );
};

export default TaskCard;
