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

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { faker } = require('@faker-js/faker');

require("dotenv").config();

module.exports = {

  login: async function (req, res) {

    if (!req.body.email) {
      return res.status(400).json({ message: 'The field email can not be empty!' });
    }

    if (!req.body.password) {
      return res.status(400).json({ message: 'The field password can not be empty!' });
    }

    let email = req.body.email
    let password = req.body.password
    let user = await User.findOne({email: email});

    if(!user){
      return res.status(401).json({ message: 'These credentials do not match our records.' });
    }

    if (!bcrypt.compareSync(password, user.password)) {
      return res.status(401).json({ message: 'Wrong password!!' });
    }

    if (parseInt(user.status) === 0) {
       return res.status(401).json({ message: 'You need to confirm your account. We have sent you an activation code, please check your email.!' });
    }

    let token = jwt.sign({user}, process.env.JWT_KEY, { expiresIn: '1h'});

    await Activity.create({
        user: user.id,
        event: "Sign In",
        description: "Sign in to application",
        createdAt: new Date(),
        updatedAt: new Date()
    });

    return res.json({ message: 'ok', data: { token: token, expiresIn: '1h' } });
  },

  register: async function (req, res) {

    if (!req.body.email) {
      return res.status(400).json({ message: 'The field email can not be empty!' });
    }

    if (!req.body.password) {
      return res.status(400).json({ message: 'The field password can not be empty!' });
    }

    if (!req.body.password_confirm) {
      return res.status(400).json({ message: 'The field password_confirm can not be empty!' });
    }

    let email = req.body.email;
    let password = req.body.password;
    let password_confirm = req.body.password_confirm;
    let user = await User.findOne({email: email});

    if (password.length < 8) {
      return res.status(400).json({ message: 'The password must be at least 8 characters.!' });
    }

    if (password_confirm !== password) {
      return res.status(400).json({ message: 'The password confirmation does not match.!' });
    }

    if(user){
      return res.status(400).json({ message: 'The email has already been taken.!' });
    }

    let confirmToken = faker.datatype.uuid()

    let new_user = await User.create({
        email: email,
        password: bcrypt.hashSync(password, 10),
        confirmed: 1,
        confirmToken: confirmToken,
        createdAt: new Date(),
        updatedAt: new Date()
    }).fetch();

    await Activity.create({
        user: new_user.id,
        event: "Sign Up",
        description: "Register new user account",
        createdAt: new Date(),
        updatedAt: new Date()
    });

    return res.json({ message: 'You need to confirm your account. We have sent you an activation code, please check your email.', data: { confirmToken: confirmToken} });
  },

  confirm: async function (req, res) {

    let token = req.param('token')
    let user = await User.findOne({confirmToken: token, confirmed: 0});

    if(!user){
      return res.status(400).json({ message: 'We can`t find a user with that  token is invalid.!' });
    }

    await User.updateOne({confirmToken: token, confirmed: 0 }).set({ confirmToken: null, confirmed: 1, updatedAt: new Date() })

    await Activity.create({
        user: user.id,
        event: "Email Verification",
        description: "Confirm new member registration account",
        createdAt: new Date(),
        updatedAt: new Date()
    });

    return res.json({ message: 'Your e-mail is verified. You can now login.', data: {} });
  },

  forgot: async function (req, res) {

    if (!req.body.email) {
      return res.status(400).json({ message: 'The field email can not be empty!' });
    }

    let email = req.body.email;
    let user = await User.findOne({email: email});
    let resetToken = faker.datatype.uuid()

    if(!user){
      return res.status(401).json({ message: 'We can`t find a user with that e-mail address.' });
    }

    await User.updateOne({email: email }).set({ resetToken: resetToken, updatedAt: new Date() })

    await Activity.create({
        user: user.id,
        event: "Forgot Password",
        description: "Request reset password link",
        createdAt: new Date(),
        updatedAt: new Date()
    });

    return res.json({ message: 'We have e-mailed your password reset link!', data: {} });
  },

  reset: async function (req, res) {

    if (!req.body.email) {
      return res.status(400).json({ message: 'The field email can not be empty!' });
    }

    if (!req.body.password) {
      return res.status(400).json({ message: 'The field password can not be empty!' });
    }

    if (!req.body.password_confirm) {
      return res.status(400).json({ message: 'The field password_confirm can not be empty!' });
    }

    let token = req.param('token')
    let email = req.body.email;
    let password = req.body.password;
    let password_confirm = req.body.password_confirm;
    let user = await User.findOne({email: email, resetToken: token});

    if (password.length < 8) {
      return res.status(400).json({ message: 'The password must be at least 8 characters.!' });
    }

    if (password_confirm !== password) {
      return res.status(400).json({ message: 'The password confirmation does not match.!' });
    }

    if(!user){
      return res.status(400).json({ message: 'We can`t find a user with that e-mail address or password reset token is invalid.' });
    }

    await User.updateOne({email: email, resetToken: token}).set({
      confirmToken: null,
      confirmed: 1,
      resetToken: null,
      updatedAt: new Date()
    })

    await Activity.create({
        user: user.id,
        event: "Reset Password",
        description: "Reset account password",
        createdAt: new Date(),
        updatedAt: new Date()
    });

    return res.json({ message: 'Your password has been reset!', data: {} });
  },

};

