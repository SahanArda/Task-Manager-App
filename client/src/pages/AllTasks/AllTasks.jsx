import { useEffect, useState } from "react";
import TaskCard from "../../components/TaskCard/TaskCard";
import axios from "axios";
import CreateTaskModal from "../../components/CreateTaskModal/CreateTaskModal";

const AllTasks = () => {
  const [tasks, setTasks] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const token = localStorage.getItem("token"); // Adjust this if your token is stored differently
        const response = await axios.get(`http://localhost:3000/tasks`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setTasks(response.data);
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    };

    fetchTasks();
  }, []);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleTaskCreated = (newTask) => {
    setTasks([...tasks, newTask]);
    closeModal();
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-6">All Tasks</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {tasks.length > 0 ? (
          tasks.map((task) => (
            <TaskCard
              key={task.id}
              title={task.title}
              description={task.description}
              status={task.status}
            />
          ))
        ) : (
          <p>No tasks found.</p>
        )}
        <div
          onClick={openModal}
          className="flex items-center justify-center bg-white border-2 border-dotted border-gray-300 rounded-md p-4 cursor-pointer"
        >
          <span className="text-4xl text-gray-400">+</span>
        </div>
      </div>

      {isModalOpen && (
        <CreateTaskModal
          isOpen={isModalOpen}
          onClose={closeModal}
          onTaskCreated={handleTaskCreated}
        />
      )}
    </div>
  );
};

export default AllTasks;
