"use strict";
const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const Controller = require("../controllers/controller");
const authentication = require("../middlewares/authentication");
const { authorization, adminAuthorization } = require("../middlewares/authorization");

router.post("/registerAdmin", userController.registerAdmin);
router.post("/login", userController.login);

router.use(authentication);

router.post("/registerSuper", adminAuthorization, userController.registerSuper);
router.get("/usersAdmin", userController.getUserAdmin);
router.get("/usersSuper", userController.getUserSuper);

router.get("/sales", Controller.getSales);
router.post("/sales", Controller.createSale);
router.get("/sales/:id", Controller.saleById);
router.put("/sales/:id", authorization, Controller.updateSale);
router.delete("/sales/:id", adminAuthorization, Controller.deleteSale);
router.get("/products", Controller.getProduct);
router.get("/products/:id", Controller.productById);

router.use(adminAuthorization);

router.post("/products", Controller.createProduct);
router.put("/products/:id", Controller.updateProduct);
router.delete("/products/:id", Controller.deleteProduct);

router.get("/history", Controller.getHistory);

module.exports = router;
