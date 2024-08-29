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
const moment = require('moment');
const fs = require('fs');

require("dotenv").config();

module.exports = {

  me: function (req, res) {
    return res.json({ message: 'ok', data: req.user });
  },

  update: async function (req, res) {

    let session = req.user
    let userid = session.id

    if (!req.body.email) {
      return res.status(400).json({ message: 'The field email can not be empty!' });
    }

    if (!req.body.phone) {
      return res.status(400).json({ message: 'The field phone can not be empty!' });
    }

    let email = req.body.email;
    let phone = req.body.phone;
    let firstName = req.body.firstName;
    let lastName = req.body.lastName;
    let gender = req.body.gender;
    let country = req.body.country;
    let address = req.body.address;
    let jobTitle = req.body.jobTitle;
    let facebook = req.body.facebook;
    let twitter = req.body.twitter;
    let instagram = req.body.instagram;
    let linkedIn = req.body.linkedIn;
    let aboutMe = req.body.aboutMe;

    let _email = await User.findOne({ email: email, id: { '!=': userid } });
    if(_email){
      return res.status(400).json({ message: 'The email address has already been taken.!' });
    }

    let _phone = await User.findOne({ phone: phone, id: { '!=': userid } });
    if(_phone){
      return res.status(400).json({ message: 'The phone number has already been taken.!' });
    }

    let updated = await User.updateOne({id: userid }).set({
        email: email,
        phone: phone,
        firstName: firstName,
        lastName: lastName,
        gender: gender,
        country: country,
        address: address,
        jobTitle: jobTitle,
        facebook: facebook,
        instagram: instagram,
        linkedIn: linkedIn,
        twitter: twitter,
        aboutMe: aboutMe,
        updatedAt: new Date()
    }).fetch()

    await Activity.create({
        user: userid,
        event: "Update Profile",
        description: "Edit user profile account",
        createdAt: new Date(),
        updatedAt: new Date()
    })

    return res.json({ message: 'Your profile has been changed', data: updated });
  },

  password: async function (req, res) {

    if (!req.body.currentPassword) {
        return res.status(400).json({ message: 'The field currentPassword can not be empty!' });
    }

    if (!req.body.password) {
        return res.status(400).json({ message: 'The field password can not be empty!' });
    }

    if (!req.body.passwordConfirm) {
        return res.status(400).json({ message: 'The field passwordConfirm can not be empty!' });
    }

    let session = req.user
    let userid = session.id
    let user = await User.findOne({id: userid});
    let current_password = req.body.currentPassword;
    let password = req.body.password;
    let password_confirmation = req.body.passwordConfirm;

    if (password.length < 8) {
      return res.status(400).json({ message: 'The password must be at least 8 characters.!' });
    }

    if (password_confirmation !== password) {
      return res.status(400).json({ message: 'The password confirmation does not match.!' });
    }

    if (!bcrypt.compareSync(current_password, user.password)) {
      return res.status(400).json({ message: 'Your password was not updated, since the provided current password does not match.!!' });
    }

    await User.updateOne({id: userid }).set({
      password: bcrypt.hashSync(password, 10),
      updatedAt: new Date()
    }).fetch()

    await Activity.create({
        user: userid,
        event: "Change Password",
        description: "Change new password account",
        createdAt: new Date(),
        updatedAt: new Date()
    })

    return res.json({ message: 'Your password has been changed!!', data: req.user });
  },

  upload: function (req, res) {

    let session = req.user
    let userid = session.id

    req.file('file_image').upload({
      // don't allow the total upload size to exceed ~10MB
      maxBytes: 10000000,
      dirname: require('path').resolve(sails.config.appPath, 'assets/uploads')
    }, async function (err, uploadedFiles) {

      if (err){
          return res.serverError(err);
      }

      if(session.image){
         let fileExists = require('path').resolve(sails.config.appPath, "assets/"+session.image)
         if (fs.existsSync(fileExists)) {
            fs.unlink(fileExists, function (err) {
                if (err) {
                    console.log(err)
                }
            })
        }
      }

      let fileUpload =  uploadedFiles[0].fd.split('/')
      let file = fileUpload.pop()
      let filePath = "uploads/"+file

      await User.updateOne({id: userid }).set({
        image: filePath,
        updatedAt: new Date()
      }).fetch()

      await Activity.create({
          user: userid,
          event: "Upload Image",
          description: "Upload new user profile image",
          createdAt: new Date(),
          updatedAt: new Date()
      })

      return res.json({
        message: uploadedFiles.length + ' file uploaded successfully!',
        data: filePath
      });

    });
  },

  refresh: function (req, res) {
    let user = req.user
    let token = jwt.sign({user}, process.env.JWT_KEY, { expiresIn: '24h'});
    return res.json({ message: 'ok', data: { token: token, expiresIn: moment().add(24, 'hours').format('YYYY-MM-DD HH:mm:ss') } });
  },

  activity: async function (req, res) {

    let user = req.user
    let page = req.query.page || 1;
    let limit = req.query.limit || 10;
    let total = await Activity.count({ user: user.id });
    let offset = ((page-1)*limit)
    let orderBy = req.query.order || "id"
    let orderDir = req.query.dir || "desc"
    let searchValue = req.query.search || ""
    let filter = { user: user.id  }

    if(searchValue.length > 0){
        filter["or"] = [
            {
              event: { 'startsWith': searchValue }
            },
            {
              description: { 'startsWith': searchValue }
            }
        ]
    }

    let list = await Activity.find(filter).limit(limit).skip(offset).sort(`${orderBy} ${orderDir}`);

    return res.json({ message: 'ok', data: { list: list, total: total } });
  },

};

