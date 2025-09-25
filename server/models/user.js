const { DataTypes } = require("sequelize");
const sequelize = require("../config/db"); // import Sequelize instance

const User = sequelize.define("User", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4, // automatically generates a unique UUID
    primaryKey: true,
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      len: {
        args: [6, 100],
      },
    },
  },
});

User.associate = (models) => {
  User.hasMany(models.Product, { foreignKey: "userId", as: "products" });
};

// Export the initialized model
module.exports = User;
