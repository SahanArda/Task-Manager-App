// models/task.js

const task = (sequelize, DataTypes) => {
  const Task = sequelize.define("Task", {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM("pending", "completed"),
      allowNull: false
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  });

  Task.associate = (models) => {
    Task.belongsTo(models.User, { foreignKey: "userId", as: "user" });
  };

  Task.prototype.toJSON = function () {
    const values = Object.assign({}, this.get());

    // Define the order of the fields
    return {
      id: values.id,
      title: values.title,
      description: values.description,
      status: values.status,
      userId: values.userId,
      createdAt: values.createdAt,
      updatedAt: values.updatedAt,
    };
  };

  return Task;
};

export default task;
