/**
 * This file is part of the Sandy Andryanto Company Profile Website.
 *
 * @author     Sandy Andryanto <sandy.andryanto404@gmail.com>
 * @copyright  2024
 *
 * For the full copyright and license information,
 * please view the LICENSE.md file that was distributed
 * with this source code.
 */

module.exports = {

  tableName: 'articles',

  attributes: {

    id  : {
      type: 'number',
      columnType: 'bigint unsigned',
      autoIncrement: true
    },

    user: {
      model: 'user'
    },

    image: {
      type: 'string',
      columnType: 'varchar(255)',
      autoMigrations: { index: true },
      allowNull: true,
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
      columnType: 'longtext'
    },

    categories: {
      type: 'json',
      columnType: 'longtext'
    },

    tags: {
      type: 'json',
      columnType: 'longtext'
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
    comments: {
      collection: 'comment',
      via: 'article'
    },
  },

};

