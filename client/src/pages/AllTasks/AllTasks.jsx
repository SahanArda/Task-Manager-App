import { useEffect, useState } from "react";
import TaskCard from "../../components/TaskCard/TaskCard";
import axios from "axios";
import CreateTaskModal from "../../components/CreateTaskModal/CreateTaskModal";
import EditTaskModal from "../../components/EditTaskModal/EditTaskModal";

const AllTasks = () => {
  const [tasks, setTasks] = useState([]);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [taskToEdit, setTaskToEdit] = useState(null);

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

  const openCreateModal = () => {
    setIsCreateModalOpen(true);
  };

  const closeCreateModal = () => {
    setIsCreateModalOpen(false);
  };

  const openEditModal = (taskId) => {
    const task = tasks.find((task) => task.id === taskId);
    setTaskToEdit(task);
    setIsEditModalOpen(true);
  };

  const closeEditModal = () => {
    setIsEditModalOpen(false);
    setTaskToEdit(null);
  };

  const handleTaskCreated = (newTask) => {
    setTasks([...tasks, newTask]);
    closeCreateModal();
  };

  const handleTaskUpdated = (updatedTask) => {
    setTasks(
      tasks.map((task) => (task.id === updatedTask.id ? updatedTask : task))
    );
    closeEditModal();
  };

  const handleDeleteTask = async (taskId) => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`http://localhost:3000/tasks/${taskId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setTasks(tasks.filter((task) => task.id !== taskId));
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-6">All Tasks</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {tasks.length > 0 ? (
          tasks.map((task) => (
            <TaskCard
              key={task.id}
              id={task.id}
              title={task.title}
              description={task.description}
              status={task.status}
              onEdit={openEditModal}
              onDelete={handleDeleteTask}
            />
          ))
        ) : (
          <p>No tasks found.</p>
        )}
        <div
          onClick={openCreateModal}
          className="flex items-center justify-center border-2 border-dotted border-gray-300 rounded-md p-4 cursor-pointer max-h-48"
        >
          <span className="text-4xl text-gray-400">+</span>
        </div>
      </div>

      {isCreateModalOpen && (
        <CreateTaskModal
          isOpen={isCreateModalOpen}
          onClose={closeCreateModal}
          onTaskCreated={handleTaskCreated}
        />
      )}

      {isEditModalOpen && taskToEdit && (
        <EditTaskModal
          isOpen={isEditModalOpen}
          onClose={closeEditModal}
          task={taskToEdit}
          onTaskUpdated={handleTaskUpdated}
        />
      )}
    </div>
  );
};

export default AllTasks;
