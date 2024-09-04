import { useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import PropTypes from "prop-types";
import axios from "axios";

const EditTaskModal = ({ isOpen, onClose, task, onTaskUpdated }) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  const formik = useFormik({
    initialValues: {
      title: task?.title || "",
      description: task?.description || "",
      status: task?.status || "pending",
    },
    validationSchema: Yup.object({
      title: Yup.string().required("Title is required"),
      description: Yup.string().required("Description is required"),
      status: Yup.string()
        .oneOf(["pending", "completed"])
        .required("Status is required"),
    }),
    onSubmit: async (values, { setSubmitting }) => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.put(
          `http://localhost:3000/tasks/${task.id}`,
          values,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        onTaskUpdated(response.data);
        setSubmitting(false);
        onClose();
      } catch (error) {
        console.error("Error updating task:", error);
        setSubmitting(false);
      }
    },
  });

  return (
    <div
      className={`fixed inset-0 flex items-center justify-center z-50 ${
        isOpen ? "" : "hidden"
      }`}
    >
      <div className="bg-black/50 absolute inset-0" onClick={onClose}></div>
      <div className="bg-white rounded-md p-6 w-full max-w-md relative z-10">
        <h3 className="text-2xl font-bold mb-4">Edit Task</h3>
        <form onSubmit={formik.handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Title
            </label>
            <input
              type="text"
              name="title"
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
              value={formik.values.title}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              required
            />
            {formik.touched.title && formik.errors.title ? (
              <div className="text-red-600 text-sm mt-1">
                {formik.errors.title}
              </div>
            ) : null}
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Description
            </label>
            <textarea
              name="description"
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
              value={formik.values.description}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              required
            />
            {formik.touched.description && formik.errors.description ? (
              <div className="text-red-600 text-sm mt-1">
                {formik.errors.description}
              </div>
            ) : null}
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Status
            </label>
            <select
              name="status"
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
              value={formik.values.status}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            >
              <option value="pending">Pending</option>
              <option value="completed">Completed</option>
            </select>
            {formik.touched.status && formik.errors.status ? (
              <div className="text-red-600 text-sm mt-1">
                {formik.errors.status}
              </div>
            ) : null}
          </div>
          <div className="flex justify-end">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md mr-2"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded-md"
              disabled={formik.isSubmitting}
            >
              {formik.isSubmitting ? "Updating..." : "Update Task"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

EditTaskModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  task: PropTypes.object.isRequired,
  onTaskUpdated: PropTypes.func.isRequired,
};

export default EditTaskModal;
