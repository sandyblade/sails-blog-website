/**
 * Notification.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  tableName: 'notifications',

  attributes: {
    id  : {
      type: 'number',
      columnType: 'bigint unsigned',
      autoIncrement: true
   },
  subject: {
    type: 'string',
    autoMigrations: { index: true }
  },
  message: {
    type: 'string',
    autoMigrations: { index: true }
  },
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
    },
    // Relations
    user: {
      model: 'user'
    }
  },

};

