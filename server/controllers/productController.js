const sequelize = require("../config/db");
const { DataTypes } = require("sequelize");

const Product = require("../models/product")(sequelize, DataTypes);
const User = require("../models/user")(sequelize, DataTypes);

User.hasMany(Product, { foreignKey: "userId" });
Product.belongsTo(User, { foreignKey: "userId" });

// Create a product
const createProduct = async (req, res) => {
  try {
    const { name, brand, type, modelNumber, warrantyPeriod, price, description, startDate, userId } = req.body;

    // optional: validate that user exists
    const user = await User.findByPk(userId);
    if (!user) return res.status(404).json({ error: "User not found" });

    const product = await Product.create({
      name,
      brand,
      type,
      modelNumber,
      warrantyPeriod,
      price,
      description,
      startDate,
      userId,
    });

    res.status(201).json(product);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to add product" });
  }
};

// LIST ALL PRODUCTS
const listProducts = async (req, res) => {
  try {
    const products = await Product.findAll({
      include: [{ model: User, attributes: ["id", "username", "email"] }],
    });
    res.json(products);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch products" });
  }
};

// GET PRODUCT BY USERID
const getUserProductById = async (req, res) => {
  try {
    const products = await Product.findAll({
  where: { userId: req.params.userId },
  include: [{ model: User, attributes: ['id', 'username', 'email'] }],
});

    res.json(products);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch products" });
  }
};

// UPDATE PRODUCT
const updateProduct = async (req, res) => {
  try {
    const { name, brand, type, warrantyPeriod, startDate } = req.body;

    const product = await Product.findByPk(req.params.id);
    if (!product) return res.status(404).json({ error: "Product not found" });

    await product.update({ name, brand, type, warrantyPeriod, startDate });
    res.json(product);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to update product" });
  }
};

// DELETE PRODUCT
const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByPk(req.params.id);
    if (!product) return res.status(404).json({ error: "Product not found" });

    await product.destroy();
    res.json({ message: "Product deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to delete product" });
  }
};

module.exports = {
  createProduct,
  listProducts,
  getUserProductById,
  updateProduct,
  deleteProduct,
};
