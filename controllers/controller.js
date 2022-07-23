"use strict";
const { User, Product, Sale, History } = require("../models");

class Controller {
  static async createSale(req, res, next) {
    try {
      let { seller, sold, productId } = req.body;
      let { id: userId } = req.user;
      let newSale = { seller, sold, productId, userId };
      const saleCreate = await Sale.create(newSale);

      const history = await History.create({
        name: `Sale by ${saleCreate.seller}`,
        updatedBy: req.user.name,
        description: `${req.user.name} create new Sale from - ${saleCreate.seller}`,
        saleId: saleCreate.id,
      });
      // throw new Error();
      res.status(201).json({
        statusCode: 201,
        data: saleCreate,
        history: history,
      });
    } catch (err) {
      next(err);
    }
  }

  static async getSales(req, res, next) {
    try {
      const saleList = await Sale.findAll({
        include: [User, Product],
        order: [["productId", "ASC"]],
      });

      res.status(200).json({
        statusCode: 200,
        saleList,
      });
    } catch (err) {
      next(err);
    }
  }

  static async saleById(req, res, next) {
    try {
      const saleId = +req.params.id;

      const saleDetail = await Sale.findByPk(saleId, {
        include: [User, Product],
      });

      if (saleDetail === null) {
        throw { name: "error not found" };
      }

      res.status(200).json({
        statusCode: 200,
        saleDetail,
      });
    } catch (err) {
      next(err);
    }
  }

  static async updateSale(req, res, next) {
    try {
      const saleId = +req.params.id;
      let { seller, sold, productId } = req.body;
      let { id: userId } = req.user;
      let newsale = { seller, sold, productId, userId };

      const saleUpdate = await Sale.update(newsale, {
        where: {
          id: saleId,
        },
      });

      const history = await History.create({
        name: `${req.user.name} update Sale's ${seller}`,
        updatedBy: req.user.name,
        description: `${req.user.name} update sale - ${seller}`,
        saleId: saleId,
      });

      // console.log(saleUpdate[0]);
      if (saleUpdate[0] === 0) {
        throw { name: "error not found" };
      }

      res.status(200).json({
        statusCode: 200,
        data: saleUpdate,
        history: history,
      });
    } catch (err) {
      next(err);
    }
  }

  static async deleteSale(req, res, next) {
    try {
      const saleId = +req.params.id;
      const saleById = await Sale.findByPk(saleId);
      // console.log(saleById.title);
      // const history = await History.create({
      //   name: `Sale by ${saleById.seller}`,
      //   updatedBy: req.user.name,
      //   description: `${req.user.name} delete sale - ${saleById.seller}`,
      //   saleId: saleId,
      // });

      const delSale = await Sale.destroy({
        where: {
          id: saleId,
        },
      });

      if (delSale <= 0) {
        throw { name: "error not found" };
      }

      res.status(200).json({
        statusCode: 200,
        message: `Sale by ${saleById.seller} success to delete`,
        data: delSale,
        history: history,
      });
    } catch (err) {
      console.log(err);
      next(err);
    }
  }

  static async getHistory(req, res, next) {
    try {
      const historyList = await History.findAll({
        order: [["createdAt", "DESC"]],
      });
      res.status(200).json({
        statusCode: 200,
        historyList,
      });
    } catch (err) {
      next(err);
    }
  }

  static async getProduct(req, res, next) {
    try {
      const productList = await Product.findAll({
        order: [["id", "ASC"]],
        limit: 20,
      });
      res.status(200).json({
        statusCode: 200,
        productList,
      });
    } catch (err) {
      next(err);
    }
  }

  static async createProduct(req, res, next) {
    try {
      let { title, price } = req.body;
      let newProduct = { title, price };
      const productCreate = await Product.create(newProduct);

      res.status(201).json({
        statusCode: 201,
        productCreate,
      });
    } catch (err) {
      next(err);
    }
  }

  static async updateProduct(req, res, next) {
    try {
      const productId = +req.params.id;
      let { title, price } = req.body;
      let newProduct = { title, price };

      const productUpdate = await Product.update(newProduct, {
        where: {
          id: productId,
        },
      });

      if (productUpdate[0] === 0) {
        throw { name: "error not found" };
      }

      res.status(200).json({
        statusCode: 200,
        data: productUpdate,
      });
    } catch (err) {
      next(err);
    }
  }

  static async productById(req, res, next) {
    try {
      const productId = +req.params.id;

      const productDetail = await Product.findByPk(productId, {
        include: [Sale],
      });

      if (productDetail === null) {
        throw { name: "error not found" };
      }

      res.status(200).json({
        statusCode: 200,
        productDetail,
      });
    } catch (err) {
      next(err);
    }
  }

  static async deleteProduct(req, res, next) {
    try {
      const productId = +req.params.id;
      const productById = await Product.findByPk(productId);

      const delProduct = await Product.destroy({
        where: {
          id: productId,
        },
      });

      if (delProduct <= 0) {
        throw { name: "error not found" };
      }

      res.status(200).json({
        statusCode: 200,
        message: `Product ${productById.title} success to delete`,
        data: delProduct,
      });
    } catch (err) {
      console.log(err);
      next(err);
    }
  }
}

module.exports = Controller;
