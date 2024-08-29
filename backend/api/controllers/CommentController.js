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

  list: async function (req, res) {
    let article_id = req.param('id')
    let list = await module.exports.buildTree(article_id)
    return res.json({ message: 'ok', data: list });
  },

  create: async function (req, res) {

    if (!req.body.comment) {
      return res.status(400).json({ message: 'The field comment can not be empty!' });
    }

    let id = req.param('id')
    let session = req.user
    let userid = session.id
    let body = req.body.comment
    let parent = req.body.parent
    let article = await Article.findOne({id: id })

    if(!article){
      return res.status(400).json({ message: `Article with id ${id} was not found.!!` });
    }

    let comment = await Comment.create({
        user: userid,
        article: id,
        parent: parent,
        body: body,
        createdAt: new Date(),
        updatedAt: new Date()
    }).fetch();

    await Activity.create({
        user: userid,
        event: "Add Comment",
        description: "The user add comment with title "+article.title,
        createdAt: new Date(),
        updatedAt: new Date()
    });

    if(userid !== article.user){
       // send notif
       await Activity.create({
          user: userid,
          subject: "Add Comment",
          message: "The user add comment with title "+article.title,
          createdAt: new Date(),
          updatedAt: new Date()
      });
    }

    let _comment = await Comment.count({ article: article.id })
    await Article.updateOne({ id: article.id }).set({ totalComment: _comment })

    return res.json({ message: 'ok', data: comment });
  },

  remove: async function (req, res) {

    let id = req.param('id')
    let session = req.user
    let userid = session.id
    let comment = await Comment.findOne({id: id, user: userid })

    if(!comment){
      return res.status(400).json({ message: `Comment with id ${id} was not found.!!` });
    }

    let article = await Article.findOne({id: comment.article })
    let destroyedRecord = await Comment.destroyOne({user: userid, id: id });

    await Activity.create({
        user: userid,
        event: "Delete Comment",
        description: "The user delete comment with title "+article.title,
        createdAt: new Date(),
        updatedAt: new Date()
    });

    let _comment = await Comment.count({ article: article.id })
    await Article.updateOne({ id: article.id }).set({ totalComment: _comment })

    return res.json({ message: 'ok', data: destroyedRecord });

  },

  buildTree: async function(article_id, parent_id){
      let branch = [];
      let filter = parent_id === undefined ? { article: parseInt(article_id), parent: null } : { article: parseInt(article_id), parent: parent_id }
      let comments = await Comment.find(filter).populate("user")
      await Promise.all(
        comments.map(async (comment) => {

          let obj = {
             "id": comment.id,
             "parent": comment.parent,
             "comment": comment.comment,
             "createdAt": comment.createdAt,
             "user": comment.user
          }

          let children = await module.exports.buildTree(article_id, comment.id)

          if(children.length > 0){
            obj["children"] = children;
          }else{
            obj["children"] = [];
          }

          branch.push(obj);
        })
      );
      return branch;
  }

};

