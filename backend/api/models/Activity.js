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

  tableName: 'activities',

  attributes: {
    id  : {
      type: 'number',
      columnType: 'bigint unsigned',
      autoIncrement: true
   },
   user: {
    model: 'user'
  },
  event: {
    type: 'string',
    autoMigrations: { index: true }
  },
  description: {
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
  },

};

