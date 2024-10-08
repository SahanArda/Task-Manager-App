// app.js or index.js

import express from "express";
import dotenv from "dotenv";
import db from "./models/index.js";
import taskRoutes from "./routes/taskRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import auth from "./middleware/auth.js";
import cors from "cors";

dotenv.config();

const app = express();
app.use(cors());

app.use(express.json());

app.use("/tasks", auth, taskRoutes); // Protect task routes with auth middleware
app.use("/users", userRoutes); // User routes for registration and login

const PORT = process.env.PORT || 3000;

db.sequelize
  .sync()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.log("Unable to connect to the database:", error);
  });
