/**
 * Article.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  tableName: 'articles',

  attributes: {

    id  : {
      type: 'number',
      columnType: 'bigint unsigned',
      autoIncrement: true
    },

    image: {
      type: 'string',
      autoMigrations: { index: true }
    },

    slug: {
      type: 'string',
      autoMigrations: { index: true }
    },

    title: {
      type: 'string',
      autoMigrations: { index: true }
    },

    description: {
      type: 'string',
      autoMigrations: { index: true }
    },

    content: {
      type: 'string',
      columnType: 'longtext',
    },

    categories: {
      type: 'json',
      columnType: 'longtext',
    },

    tags: {
      type: 'json',
      columnType: 'longtext',
    },

    totalViewer  : {
        type: 'number',
        columnName: 'total_viewer',
        defaultsTo: 0,
        autoMigrations: { index: true }
    },

    totalComment  : {
        type: 'number',
        columnName: 'total_comment',
        defaultsTo: 0,
        autoMigrations: { index: true }
    },

    status: {
      type: 'number',
      defaultsTo: 0,
      columnType: 'tinyint unsigned'
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
    viewers: {
      collection: 'viewer',
      via: 'article'
    },
    user: {
      model: 'user'
    },
    comments: {
      collection: 'comment',
      via: 'article'
    },
  },

};

