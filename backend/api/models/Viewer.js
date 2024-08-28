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

  tableName: 'viewers',

  attributes: {

    id  : {
      type: 'number',
      columnType: 'bigint unsigned',
      autoIncrement: true
   },
    user: {
      model: 'user'
    },
    article: {
      model: 'article'
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
    }
  },

};

