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
  'POST /api/auth/login': 'AuthController.login',
  'POST /api/auth/register': 'AuthController.register',
  'GET /api/auth/confirm/:token': 'AuthController.confirm',
  'POST /api/auth/email/forgot': 'AuthController.forgot',
  'POST /api/auth/email/reset/:token': 'AuthController.reset',
  'GET /api/account/detail': 'AccountController.me',
  'POST /api/account/update': 'AccountController.update',
  'POST /api/account/password': 'AccountController.password',
  'POST /api/account/upload': 'AccountController.upload',
  'POST /api/account/token': 'AccountController.refresh',
  'GET /api/account/activity': 'AccountController.activity',
  'GET /api/notification/list': 'NotificationController.list',
  'GET /api/notification/read/:id': 'NotificationController.read',
  'DELETE /api/notification/remove/:id': 'NotificationController.remove',
  'GET /api/article/list': 'ArticleController.list',
  'POST /api/article/create': 'ArticleController.create',
  'GET /api/article/read/:slug': 'ArticleController.read',
  'PUT /api/article/update/:id': 'ArticleController.update',
  'DELETE /api/article/remove/:id': 'ArticleController.remove',
  'GET /api/article/user': 'ArticleController.user',
  'GET /api/article/words': 'ArticleController.words',
  'POST /api/article/upload/:id': 'ArticleController.upload',
  'GET /api/comment/list/:id': 'CommentController.list',
  'POST /api/comment/create/:id': 'CommentController.create',
  'DELETE /api/comment/remove/:id': 'CommentController.remove'
};
