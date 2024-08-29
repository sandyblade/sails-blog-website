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

const slugify = require('slugify')
const { faker } = require('@faker-js/faker')
const fs = require('fs');

module.exports = {

  list: async function (req, res) {

    let page = req.query.page || 1;
    let limit = req.query.limit || 10;
    let total = await Article.count({ status: 1 });
    let offset = ((page-1)*limit)
    let orderBy = req.query.order || "id"
    let orderDir = req.query.dir || "desc"
    let searchValue = req.query.search || ""
    let filter = { status: 1  }

    if(searchValue.length > 0){
        filter["or"] = [
            {
              subject: { 'title': searchValue }
            },
            {
              message: { 'description': searchValue }
            },
            {
              message: { 'content': searchValue }
            },
            {
              message: { 'categories': searchValue }
            },
            {
              message: { 'tags': searchValue }
            }
        ]
    }

    let list = await Article.find(filter)
      .limit(limit)
      .skip(offset)
      .sort(`${orderBy} ${orderDir}`)
      .populate('user');

    return res.json({ message: 'ok', data: { list: list, total: total } });

  },

  create: async function (req, res) {

    if (!req.body.title) {
      return res.status(400).json({ message: 'The field title can not be empty!' });
    }

    if (!req.body.description) {
      return res.status(400).json({ message: 'The field description can not be empty!' });
    }

    if (!req.body.content) {
      return res.status(400).json({ message: 'The field content can not be empty!' });
    }

    if (!req.body.status) {
      return res.status(400).json({ message: 'The status title can not be empty!' });
    }

    let _title = await Article.findOne({ title: req.body.title, id: { '!=': 0 } });
    if(_title){
      return res.status(400).json({ message: 'The article with title "'+req.body.title+'" has already been taken.!' });
    }

    let session = req.user
    let userid = session.id
    let title = req.body.title
    let slug = slugify(title)
    let image = req.body.image
    let description = req.body.description
    let content = req.body.content
    let categories = req.body.categories
    let tags = req.body.tags
    let status = req.body.status

    let article = await Article.create({
        user: userid,
        image: image,
        title: title,
        slug: slug,
        categories: categories,
        tags: tags,
        description: description,
        content: content,
        status: status,
        createdAt: new Date(),
        updatedAt: new Date()
    }).fetch();

    await Activity.create({
        user: userid,
        event: "Create New Article",
        description: "A new article with title `"+title+"` has been created. ",
        createdAt: new Date(),
        updatedAt: new Date()
    })

    return res.json({ message: 'ok', data: article });
  },

  read: async function (req, res) {

    let slug = req.param('slug')
    let article = await Article.findOne({slug: slug }).populate('user')

    if(!article){
       return res.status(400).json({ message: `Article with slug ${slug} was not found.!!` });
    }

    if(req.user)
    {
      let session = req.user
      let userid = session.id

      if(userid !== article.user)
      {
          let _viewer = await Viewer.count({ article: article.id, user: userid })
          if(_viewer === 0)
          {
              await Viewer.create({
                user: userid,
                article: article.id,
                status: 0,
                createdAt: new Date(),
                updatedAt: new Date()
              })

              await Notification.create({
                user: userid,
                article: article.id,
                subject: "Read Article",
                message: "The user "+session.email+" add read your article with title `"+article.title+"`.",
                createdAt: new Date(),
                updatedAt: new Date()
              })

              let totalViewer = await Viewer.count({ article: article.id });
              await Article.updateOne({ id: article.id }).set({ totalViewer: totalViewer })
          }

       }
    }

    return res.json({ message: 'ok', data: article });
  },

  update: async function (req, res) {

    let id = req.param('id')

    if (!req.body.title) {
      return res.status(400).json({ message: 'The field title can not be empty!' });
    }

    if (!req.body.description) {
      return res.status(400).json({ message: 'The field description can not be empty!' });
    }

    if (!req.body.content) {
      return res.status(400).json({ message: 'The field content can not be empty!' });
    }

    if (!req.body.status) {
      return res.status(400).json({ message: 'The status title can not be empty!' });
    }

    let _title = await Article.findOne({ title: req.body.title, id: { '!=': id } });
    if(_title){
      return res.status(400).json({ message: 'The article with title "'+req.body.title+'" has already been taken.!' });
    }

    let session = req.user
    let userid = session.id
    let title = req.body.title
    let slug = slugify(title)
    let description = req.body.description
    let content = req.body.content
    let categories = req.body.categories
    let tags = req.body.tags
    let status = req.body.status

    let article = await Article.updateOne({ id: id }).set({
        title: title,
        slug: slug,
        categories: categories,
        tags: tags,
        description: description,
        content: content,
        status: status,
        updatedAt: new Date()
     }).fetch()

    await Activity.create({
        user: userid,
        event: "Edit Article",
        description: "A article with title `"+title+"` has been updated. ",
        createdAt: new Date(),
        updatedAt: new Date()
     })

    return res.json({ message: 'ok', data: article });

  },

  remove: async function (req, res) {

    let id = req.param('id')
    let session = req.user
    let userid = session.id
    let article = await Article.findOne({id: id, user: userid });

    if(!article){
      return res.status(400).json({ message: `Article with id ${id} was not found.!!` });
    }

    let destroyedRecord = await Article.destroyOne({ id: id });

    await Activity.create({
        user: userid,
        event: "Delete Article",
        description: "The user delete article with title "+article.title,
        createdAt: new Date(),
        updatedAt: new Date()
    });

    return res.json({ message: 'ok', data: destroyedRecord });

  },

  user: async function (req, res) {

    let session = req.user
    let userid = session.id
    let page = req.query.page || 1;
    let limit = req.query.limit || 10;
    let total = await Article.count({ user: userid });
    let offset = ((page-1)*limit)
    let orderBy = req.query.order || "id"
    let orderDir = req.query.dir || "desc"
    let searchValue = req.query.search || ""
    let filter = { user: userid  }

    if(searchValue.length > 0){
        filter["or"] = [
            {
              subject: { 'title': searchValue }
            },
            {
              message: { 'description': searchValue }
            },
            {
              message: { 'content': searchValue }
            },
            {
              message: { 'categories': searchValue }
            },
            {
              message: { 'tags': searchValue }
            }
        ]
    }

    let list = await Article.find(filter).limit(limit).skip(offset).sort(`${orderBy} ${orderDir}`);

    return res.json({ message: 'ok', data: { list: list, total: total } });

  },

  words: async function (req, res) {

    let data = []
    let max = req.query.max | 100

    for(let i = 1; i <= max ;i++){
        let string = faker.random.words()
        data.push(string.charAt(0).toUpperCase() + string.slice(1))
    }

    data = data.toSorted()
    let uniq = [...new Set(data)]

    return res.json({ message: 'ok', data: uniq });
  },

  upload: async function (req, res) {

    let id = req.param('id')

    req.file('file_image').upload({
      // don't allow the total upload size to exceed ~10MB
      maxBytes: 10000000,
      dirname: require('path').resolve(sails.config.appPath, 'assets/uploads')
    }, async function (err, uploadedFiles) {


      let article = await Article.findOne({id: id});
      if(!article){
        return res.status(400).json({ message: `Article with id ${id} was not found.!!` });
      }

      if (err){
          return res.serverError(err);
      }

      if(article.image){
         let fileExists = require('path').resolve(sails.config.appPath, "assets/"+article.image)
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

      await Article.updateOne({id: id }).set({
        image: filePath,
        updatedAt: new Date()
      }).fetch()

      return res.json({
        message: uploadedFiles.length + ' file uploaded successfully!',
        data: filePath
      });

    });


  }

};

