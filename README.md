# M1 Mean Back Mahery - Ny Avo

## Folder structure
Refers to: [How to structure your backend code in Node.js (Express.js)](https://dev.to/kafeel_ahmad/how-to-structure-your-backend-code-in-nodejs-expressjs-2e07)
```
📁
├── 📄 app.js
├── 📁 config
├── 📁 services
│   ├── 📄 customerService.js
│   ├── 📄 ...
├── 📁 controllers
│   ├── 📄 customerController.js
│   ├── 📄 productController.js
│   └── ...
├── 📁 middleware
│   ├── 📄 auth.js
│   ├── 📄 logger.js
│   └── ...
├── 📁 models
│   ├── 📄 customer.js
│   ├── 📄 product.js
│   └── ...
├── 📁 routes
│   ├── 📄 api.js
│   ├── 📄 auth.js
│   └── ...
├── 📁 tests
│   ├── 📁 unit
│   ├── 📁 integration
│   ├── 📁 e2e
│   └── ...
├── 📁 utils
│   ├── 📄 validation.js
│   ├── 📄 helpers.js
│   └── ...
└── 📁 node_modules
```
### app.js example code
The app.js file is the entry point of your application. It’s where you initialize the Express app, set up middleware, define routes, and start the server. Think of it as the control center of your web application.
```js
const express = require('express');
const app = express();
const config = require('./config');
const routes = require('./routes');
// Middleware setup
app.use(express.json());
// Routes setup
app.use('/api', routes);
// Start server
const PORT = config.port || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
```

### config example code
The config directory holds configuration files for your application, such as database connections, server settings, and environment variables.

````js
// config/index.js
module.exports = {
  port: process.env.PORT || 3000,
  db: {
    host: 'localhost',
    port: 27017,
    name: 'mydatabase'
  }
};
````
### controllers example code
Controllers contain the logic for handling incoming requests and generating responses. Each file in the controllers directory typically corresponds to a different part of your application (e.g., customers, products).

```js
// controllers/customer.js
const Customer = require('../models/customer');
exports.getAllCustomers = async (req, res) => {
  try {
    const customers = await Customer.find();
    res.json(customers);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
```
### middleware example code
Middleware functions are used to process requests before they reach the controllers. They can handle tasks like authentication, logging, and request validation.

```js
// middleware/auth.js
module.exports = (req, res, next) => {
  const token = req.header('Authorization');
  if (!token) return res.status(401).json({ message: 'Access Denied' });
  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    req.user = verified;
    next();
  } catch (err) {
    res.status(400).json({ message: 'Invalid Token' });
  }
};
```

### models example code
Models define the structure of your data and handle interactions with the database. Each model file typically corresponds to a different data entity (e.g., Customer, Product).

```js
// models/customer.js
const mongoose = require('mongoose');
const customerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});
module.exports = mongoose.model('Customer', customerSchema);
```

### routes example code
Routes define the paths to different parts of your application and map them to the appropriate controllers.

```js
// routes/api.js
const express = require('express');
const router = express.Router();
const customerController = require('../controllers/customer');
router.get('/customers', customerController.getAllCustomers);
module.exports = router;
```

### utils example code
Utility functions and helper modules are stored in the utils directory. These functions perform common tasks like validation and formatting that are used throughout the application.

```js
// utils/validation.js
exports.isEmailValid = (email) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(String(email).toLowerCase());
};
```
