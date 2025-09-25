const { DataTypes } = require("sequelize");
const sequelize = require("../config/db"); // import Sequelize instance

const Product = sequelize.define("Product", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    brand: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    type: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    modelNumber: {
      type: DataTypes.STRING,
      allowNull: true, // optional
    },
    warrantyPeriod: {
      type: DataTypes.STRING,
    },
    price: {
      type: DataTypes.FLOAT,
      allowNull: true, // optional
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true, // optional
    },
    startDate: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    userId: { 
      type: DataTypes.UUID,
      allowNull: false, // or true if optional
      references: {
        model: 'Users', // table name
        key: 'id',
      },
    },
  });

  // Define the association
  Product.associate = (models) => {
    Product.belongsTo(models.User, { foreignKey: 'userId', as: 'user' });
  };

module.exports = Product;

