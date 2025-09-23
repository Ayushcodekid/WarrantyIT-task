const express = require('express');
const sequelize = require('./config/db');
const { DataTypes } = require('sequelize');
const cors = require('cors');

// Import routes
const userRoutes = require('./routes/userRoutes');
const productRoutes = require('./routes/productRoutes');

const app = express();
app.use(express.json());
app.use(cors());


// Initialize models
const User = require('./models/user')(sequelize, DataTypes);
const Product = require('./models/product')(sequelize, DataTypes);

// Define associations
User.hasMany(Product, { foreignKey: 'userId' });
Product.belongsTo(User, { foreignKey: 'userId' });


// Use routes
app.use('/api/users', userRoutes);
app.use('/api/products', productRoutes);

// Sync database and start server
sequelize
  .sync({ alter: true }) // { alter: true } updates tables without dropping
  .then(() => {
    console.log('✅ Database synced with Neon PostgreSQL');
    app.listen(9000, () => console.log('🚀 Server running on port 9000'));
  })
  .catch((err) => console.error('❌ Database connection failed:', err));
