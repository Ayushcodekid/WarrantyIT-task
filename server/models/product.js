module.exports = (sequelize, DataTypes) => {
  const Product = sequelize.define('Product', {
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
      type: DataTypes.INTEGER,
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

  return Product;
};
