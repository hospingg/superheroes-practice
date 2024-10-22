'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Superhero extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Superhero.init({
    nickName: {
      type: DataTypes.STRING,
      allowNull: false,
      field: 'nick_name',
      unique: true,
    },
    realName: {
      type: DataTypes.STRING,
      allowNull: false,
      field: 'real_name',
    },
    originDesctiption: {
      type: DataTypes.TEXT,
      field: 'origin_desctiption'
    },
    catchPhrase: {
      type: DataTypes.STRING,
      field: 'catch_phrase'
    }
  }, {
    sequelize,
    modelName: 'Superhero',
    tableName: 'superheroes',
    underscored: true,
  });
  return Superhero;
};
