// Connect To DataBase
const MongoDB = require('./config/DataBase');
const mongoose = require("mongoose"); // Data Base Configrations
const express = require('express');


// Set Up Port and Make Server listen To requests
const app = express();
const PORT = 5000;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
app.use(express.json()); // Middleware to parse JSON



// Main Routes

const UsersRoutes = require("./routes/UserRoutes");
app.use('/api/users',UsersRoutes);

const RuleRoutes = require("./routes/RuleRoutes");
app.use('/api/rules',RuleRoutes);

const BankAccountRoutes = require("./routes/BankAccountRoutes");
app.use('/api/bankAccount',BankAccountRoutes);


const ShopOwnerProfileRoutes = require("./routes/ShopOwnerProfileRoutes");
app.use('/api/shopOwnerProfile',ShopOwnerProfileRoutes);

const ShopTypeRoutes = require("./routes/ShopTypeRoutes");
app.use('/api/shopType',ShopTypeRoutes);

const ShopRoutes = require("./routes/ShopRoutes");
app.use('/api/shop',ShopRoutes);

const ShopItemsRoutes = require("./routes/ShopItemRoutes");
app.use('/api/shopItems',ShopItemsRoutes);