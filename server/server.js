const express = require("express");
const sequelize = require("./config/db");
const cors = require("cors");
const cookieParser = require("cookie-parser");

// Import routes
const userRoutes = require("./routes/userRoutes");
const productRoutes = require("./routes/productRoutes");

const app = express();
app.use(express.json());
app.use(
  cors({
    origin: "https://warrantyit-task.onrender.com",
    credentials: true,
  })
);

app.use(cookieParser());

// Initialize models
const User = require("./models/user");
const Product = require("./models/product");

// Define associations
User.hasMany(Product, { foreignKey: "userId" });
Product.belongsTo(User, { foreignKey: "userId" });

// Use routes
app.use("/api/users", userRoutes);
app.use("/api/products", productRoutes);

// Sync database and start server
sequelize
  .sync({ alter: true }) // { alter: true } updates tables without dropping
  .then(() => {
    console.log("Database synced with Neon PostgreSQL");
    app.listen(9000, () => console.log("Server running on port 9000"));
  })
  .catch((err) => console.error("❌ Database connection failed:", err));
