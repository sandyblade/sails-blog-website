/**
 * User.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  tableName: 'users',

  attributes: {
    id : {
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
      columnType: 'varchar(180)',
      autoMigrations: { index: true },
      allowNull: true,
    },
    password: {
      type: 'string',
      required: true,
      autoMigrations: { index: true }
    },
    image: {
      type: 'string',
      columnType: 'varchar(255)',
      autoMigrations: { index: true },
      allowNull: true,
    },
    firstName: {
      type: 'string',
      columnName: 'first_name',
      columnType: 'varchar(64)',
      autoMigrations: { index: true },
      allowNull: true,
    },
    lastName: {
      type: 'string',
      columnName: 'last_name',
      columnType: 'varchar(64)',
      autoMigrations: { index: true },
      allowNull: true,
    },
    gender: {
      type: 'string',
      columnType: 'varchar(2)',
      autoMigrations: { index: true },
      allowNull: true,
    },
    country: {
      type: 'string',
      columnType: 'varchar(180)',
      autoMigrations: { index: true },
      allowNull: true,
    },
    facebook: {
      type: 'string',
      columnType: 'varchar(180)',
      autoMigrations: { index: true },
      allowNull: true,
    },
    instagram: {
      type: 'string',
      columnType: 'varchar(180)',
      autoMigrations: { index: true },
      allowNull: true,
    },
    twitter: {
      type: 'string',
      columnType: 'varchar(180)',
      autoMigrations: { index: true },
      allowNull: true,
    },
    linkedIn: {
      type: 'string',
      columnName: 'linked_in',
      columnType: 'varchar(180)',
      autoMigrations: { index: true },
      allowNull: true,
    },
    jobTitle: {
      type: 'string',
      columnName: 'job_title',
      columnType: 'varchar(180)',
      autoMigrations: { index: true },
      allowNull: true,
    },
    address: {
      type: 'string',
      columnType: 'text',
      allowNull: true,
    },
    aboutMe: {
      type: 'string',
      columnName: 'about_me',
      columnType: 'text',
      allowNull: true,
    },
    resetToken: {
      type: 'string',
      columnName: 'reset_token',
      columnType: 'varchar(36)',
      autoMigrations: { index: true },
      allowNull: true,
    },
    confirmToken: {
      type: 'string',
      columnName: 'confirm_token',
      columnType: 'varchar(36)',
      autoMigrations: { index: true },
      allowNull: true,
    },
    confirmed: {
      type: 'number',
      defaultsTo: 0,
      columnType: 'tinyint unsigned'
    },
    createdAt: {
      type: 'ref',
      required: true,
      columnName: 'created_at',
      columnType: 'datetime',
      autoMigrations: { index: true }
    },
    updatedAt: {
      type: 'ref',
      required: true,
      columnName: 'updated_at',
      columnType: 'datetime',
      autoMigrations: { index: true }
    },
    // Relations
    activities: {
      collection: 'activity',
      via: 'user'
    },
    articles: {
      collection: 'article',
      via: 'user'
    },
    viewers: {
      collection: 'viewer',
      via: 'user'
    },
    notifications: {
      collection: 'notification',
      via: 'user'
    },
    comments: {
      collection: 'comment',
      via: 'user'
    },
  },

};

