/**
 * Policy Mappings
 * (sails.config.policies)
 *
 * Policies are simple functions which run **before** your actions.
 *
 * For more information on configuring policies, check out:
 * https://sailsjs.com/docs/concepts/policies
 */

const CommentController = require("../api/controllers/CommentController");

module.exports.policies = {

  /***************************************************************************
  *                                                                          *
  * Default policy for all controllers and actions, unless overridden.       *
  * (`true` allows public access)                                            *
  *                                                                          *
  ***************************************************************************/

  // '*': true,
  AccountController: {
    '*': 'isAuthenticated'
  },
  NotificationController: {
    '*': 'isAuthenticated'
  },
  ArticleController: {
    'create': 'isAuthenticated',
    'update': 'isAuthenticated',
    'read': 'isAuthenticated',
    'remove': 'isAuthenticated',
    'user': 'isAuthenticated',
    'words': 'isAuthenticated'
  },
  CommentController: {
     'create': 'isAuthenticated',
     'remove': 'isAuthenticated'
  }

};
