"use strict";
const { User } = require("../models");
const { comparePass } = require("../helpers/bcrypt");
const { tokenUser } = require("../helpers/token");

class userController {
  static async registerSuper(req, res, next) {
    try {
      const { email, password, name } = req.body;
      const createdSuper = await User.create({
        email,
        password,
        name,
        role: "super_admin",
        totalSold: 0,
      });

      res.status(201).json({
        statusCode: 201,
        createdSuper,
      });
    } catch (err) {
      console.log(err);
      next(err);
    }
  }
  static async registerAdmin(req, res, next) {
    try {
      const { email, password, name } = req.body;
      const createdAdmin = await User.create({
        email,
        password,
        name,
        role: "admin",
        totalSold: 0,
      });

      res.status(201).json({
        statusCode: 201,
        createdAdmin,
      });
    } catch (err) {
      console.log(err);
      next(err);
    }
  }

  static async login(req, res, next) {
    try {
      const { email, password } = req.body;
      const findUser = await User.findOne({
        where: {
          email,
        },
      });

      if (!email || !password) {
        throw { name: "USER NOT FOUND" };
      }

      if (!findUser) {
        throw { name: "USER NOT FOUND" };
      }

      const checkPass = comparePass(password, findUser.password);
      if (!checkPass) {
        throw { name: "USER NOT FOUND" };
      }

      const payloadClient = {
        id: findUser.id,
        email: findUser.email,
        role: findUser.role,
        name: findUser.name,
      };

      const token = tokenUser(payloadClient);

      res.status(200).json({
        statusCode: 200,
        access_token: token,
        data: {
          id: payloadClient.id,
          email: payloadClient.email,
          role: payloadClient.role,
          name: findUser.name,
        },
      });
    } catch (err) {
      console.log(err);
      next(err);
    }
  }

  static async getUserAdmin(req, res, next) {
    try {
      const userList = await User.findAll({
        where: {
          role: "admin",
        },
      });

      res.status(200).json({
        statusCode: 200,
        userList,
      });
    } catch (err) {
      next(err);
    }
  }

  static async getUserSuper(req, res, next) {
    try {
      const superList = await User.findAll({
        where: {
          role: "super_admin",
        },
      });

      res.status(200).json({
        statusCode: 200,
        superList,
      });
    } catch (err) {
      next(err);
    }
  }
}

module.exports = userController;
