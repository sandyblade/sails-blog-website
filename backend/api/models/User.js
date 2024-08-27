/**
 * User.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  tableName: 'users',

  attributes: {
    id  : {
       type: 'number',
       columnType: 'bigint unsigned',
       autoIncrement: true
    },
    email: {
      type: 'string',
      required: true,
      unique: true,
      columnType: 'varchar(180)',
      autoMigrations: { index: true }
    },
    phone: {
      type: 'string',
      required: false,
      unique: true,
      columnType: 'varchar(20)',
      autoMigrations: { index: true }
    },
    password: {
      type: 'string',
      required: true,
      autoMigrations: { index: true }
    },
    image: {
      type: 'string',
      columnType: 'varchar(255)',
      autoMigrations: { index: true }
    },
    firstName: {
      type: 'string',
      columnName: "first_name",
      columnType: 'varchar(64)',
      autoMigrations: { index: true }
    },
    lastName: {
      type: 'string',
      columnName: "last_name",
      columnType: 'varchar(64)',
      autoMigrations: { index: true }
    },
    gender: {
      type: 'string',
      columnType: 'varchar(2)',
      autoMigrations: { index: true }
    },
    country: {
      type: 'string',
      columnType: 'varchar(180)',
      autoMigrations: { index: true }
    },
    facebook: {
      type: 'string',
      columnType: 'varchar(180)',
      autoMigrations: { index: true }
    },
    instagram: {
      type: 'string',
      columnType: 'varchar(180)',
      autoMigrations: { index: true }
    },
    twitter: {
      type: 'string',
      columnType: 'varchar(180)',
      autoMigrations: { index: true }
    },
    linkedIn: {
      type: 'string',
      columnName: "linked_in",
      columnType: 'varchar(180)',
      autoMigrations: { index: true }
    },
    jobTitle: {
      type: 'string',
      columnName: "job_title",
      columnType: 'varchar(180)',
      autoMigrations: { index: true }
    },
    address: {
      type: 'string',
      columnType: 'text',
    },
    aboutMe: {
      type: 'string',
      columnName: "about_me",
      columnType: 'text',
    },
    resetToken: {
      type: 'string',
      columnName: "reset_token",
      columnType: 'varchar(36)',
      autoMigrations: { index: true }
    },
    confirmToken: {
      type: 'string',
      columnName: "confirm_token",
      columnType: 'varchar(36)',
      autoMigrations: { index: true }
    },
    confirmed: {
      type: 'number',
      defaultsTo: 0,
      columnType: 'tinyint unsigned'
    },
    // Datetime
    createdAt: {
      type: "ref",
      required: true,
      columnName: "created_at",
      columnType: "datetime",
      autoMigrations: { index: true }
    },
    updatedAt: {
      type: "ref",
      required: true,
      columnName: "updated_at",
      columnType: "datetime",
      autoMigrations: { index: true }
    }
  },

};

