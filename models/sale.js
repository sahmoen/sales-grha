"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Sale extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Sale.belongsTo(models.User, {
        foreignKey: "userId",
      });
      Sale.belongsTo(models.Product, {
        foreignKey: "productId",
      });
      Sale.hasMany(models.History, {
        foreignKey: "saleId",
      });
    }
  }
  Sale.init(
    {
      productId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "Product is Required",
          },
          notNull: {
            msg: "Product is Required",
          },
        },
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "User is Required",
          },
          notNull: {
            msg: "User is Required",
          },
        },
      },
      sold: DataTypes.INTEGER,
      seller: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Sale",
    }
  );
  return Sale;
};
