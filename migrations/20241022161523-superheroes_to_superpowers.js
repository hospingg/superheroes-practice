'use strict';

const superhero = require('../models/Superhero');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    await queryInterface.createTable('superheroes_to_superpowers', { 
      id: {
        allowNull: false,
        primaryKey: true,
        unique: true,
        type: Sequelize.INTEGER,
        autoIncrement: true
      },
      superheroId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        field: 'superhero_id',
        references:{
          model: 'superheroes',
          key: 'id'
        }
      },
      superpowerId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        field: 'superpower_id',
        references:{
          model: 'superpowers',
          key: 'id'
        }
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        field:'created_at'
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        field:'updated_at'
      }
    });
    await queryInterface.addConstraint('superheroes_to_superpowers',{
      fields: ['superhero_id', 'superpower_id'],
      type: "unique",
      name: "unique_pair_constraint"
    })
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await queryInterface.dropTable('superheroes_to_superpowers');
  }
};
