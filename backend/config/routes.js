/**
 * Route Mappings
 * (sails.config.routes)
 *
 * Your routes tell Sails what to do each time it receives a request.
 *
 * For more information on configuring custom routes, check out:
 * https://sailsjs.com/anatomy/config/routes-js
 */

module.exports.routes = {
  'post /api/auth/login': 'AuthController.login',
  'post /api/auth/register': 'AuthController.register',
  'get /api/auth/confirm/:token': 'AuthController.confirm',
  'post /api/auth/email/forgot': 'AuthController.forgot',
  'post /api/auth/email/reset/:token': 'AuthController.reset',
  'get /api/account/detail': 'AccountController.me',
  'post /api/account/update': 'AccountController.update',
  'post /api/account/password': 'AccountController.password',
  'post /api/account/upload': 'AccountController.upload',
  'post /api/account/token': 'AccountController.refresh',
  'get /api/account/activity': 'AccountController.activity',
  'get /api/notification/list': 'Notification.list',
  'get /api/notification/read/:id': 'Notification.read',
  'delete /api/notification/remove:/:id': 'Notification.remove',
};
