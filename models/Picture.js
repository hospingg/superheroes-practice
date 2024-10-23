'use strict';

const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Picture extends Model {
    static associate(models) {
      Picture.belongsTo(models.Superhero, {
        foreignKey: 'superhero_id'
      });
    }
  }
  Picture.init({
    src: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    superheroId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: 'superhero_id',
      references:{
        model: 'superheroes',
        key: 'id'
      }
    },
  }, 
  
  {
    sequelize,
    modelName: 'Picture',
    tableName: 'pictures',
    underscored: true,
  });
  return Picture;
};