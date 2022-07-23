"use strict";
const { Sale } = require("../models");

const authorization = async (req, res, next) => {
  try {
    const { id: userId, role } = req.user;
    const { id: saleId } = req.params;

    if (!Number(saleId)) {
      throw { name: "BAD REQUEST" };
    }

    const sale = await Sale.findByPk(saleId);

    if (!sale) {
      throw { name: "Data not found" };
    }

    if (role === "admin") {
      if (userId !== sale.userId) {
        throw { name: "FORBIDDEN" };
      }
    }

    next();
  } catch (err) {
    next(err);
  }
};

const adminAuthorization = async (req, res, next) => {
  try {
    const { role } = req.user;
    if (role !== "super_admin") {
      throw { name: "FORBIDDEN" };
    }
    next();
  } catch (err) {
    next(err);
  }
};

module.exports = {
  authorization,
  adminAuthorization,
};
