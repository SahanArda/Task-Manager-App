import { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { Link, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import axios from "axios";
import AuthService from "../../services/auth";

const RegisterForm = () => {
  const navigate = useNavigate();
  const [serverError, setServerError] = useState("");

  // Validation schema using Yup
  const validationSchema = Yup.object().shape({
    first_name: Yup.string().required("First name is required"),
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
  });

  // Handle form submission
  const handleSubmit = (values, { setSubmitting }) => {
    setServerError("");
    axios
      .post("http://localhost:3000/users/register", values)
      .then((response) => {
        AuthService.setToken(response.data.token);
        AuthService.setUser({
          email: response.data.email,
          role: response.data.role,
        });
        navigate("/"); // Redirect to home after successful registration
      })
      .catch((error) => {
        if (error.response && error.response.data) {
          setServerError(error.response.data.message);
        } else {
          setServerError("There was an error registering!");
        }
      })
      .finally(() => {
        setSubmitting(false);
      });
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-center text-gray-900">
          Register
        </h2>
        {serverError && (
          <div
            className="p-4 mb-4 text-sm text-red-700 bg-red-100 rounded-lg"
            role="alert"
          >
            {serverError}
          </div>
        )}
        <Formik
          initialValues={{ first_name: "", email: "", password: "" }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ errors, touched, isSubmitting }) => (
            <Form className="space-y-4">
              <div>
                <label
                  htmlFor="first_name"
                  className="block text-sm font-medium text-gray-700"
                >
                  First Name
                </label>
                <Field
                  name="first_name"
                  type="text"
                  className={`block w-full px-3 py-2 mt-1 text-gray-900 placeholder-gray-500 border rounded-md focus:ring-indigo-500 focus:border-indigo-500 ${
                    errors.first_name && touched.first_name
                      ? "border-red-500"
                      : "border-gray-300"
                  }`}
                  placeholder="First Name"
                />
                <ErrorMessage
                  name="first_name"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700"
                >
                  Email
                </label>
                <Field
                  name="email"
                  type="email"
                  className={`block w-full px-3 py-2 mt-1 text-gray-900 placeholder-gray-500 border rounded-md focus:ring-indigo-500 focus:border-indigo-500 ${
                    errors.email && touched.email
                      ? "border-red-500"
                      : "border-gray-300"
                  }`}
                  placeholder="you@example.com"
                />
                <ErrorMessage
                  name="email"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700"
                >
                  Password
                </label>
                <Field
                  name="password"
                  type="password"
                  className={`block w-full px-3 py-2 mt-1 text-gray-900 placeholder-gray-500 border rounded-md focus:ring-indigo-500 focus:border-indigo-500 ${
                    errors.password && touched.password
                      ? "border-red-500"
                      : "border-gray-300"
                  }`}
                  placeholder="••••••••"
                />
                <ErrorMessage
                  name="password"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>

              <button
                type="submit"
                className="flex justify-center w-full px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                disabled={isSubmitting}
              >
                Register
              </button>
            </Form>
          )}
        </Formik>
        <p className="text-sm text-center text-gray-600">
          Have an account?{" "}
          <Link
            to="/"
            className="font-medium text-indigo-600 hover:text-indigo-500"
          >
            Log In
          </Link>
        </p>
      </div>
    </div>
  );
};

export default RegisterForm;
