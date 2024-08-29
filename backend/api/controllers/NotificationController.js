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

    let user = req.user
    let page = req.query.page || 1;
    let limit = req.query.limit || 10;
    let total = await Notification.count({ user: user.id });
    let offset = ((page-1)*limit)
    let orderBy = req.query.order || "id"
    let orderDir = req.query.dir || "desc"
    let searchValue = req.query.search || ""
    let filter = { user: user.id  }

    if(searchValue.length > 0){
        filter["or"] = [
            {
              subject: { 'startsWith': searchValue }
            },
            {
              message: { 'startsWith': searchValue }
            }
        ]
    }

    let list = await Notification.find(filter).limit(limit).skip(offset).sort(`${orderBy} ${orderDir}`);

    return res.json({ message: 'ok', data: { list: list, total: total } });
  },

  read: async function(req, res){

    let id = req.param('id')
    let session = req.user
    let userid = session.id
    let notification = await Notification.findOne({user: userid, id: id });

    if(!notification){
       return res.status(400).json({ message: `Notification with id ${id} was not found.!!` });
    }

     return res.json({ message: 'ok', data: notification });
  },

  remove: async function(req, res){

    let id = req.param('id')
    let session = req.user
    let userid = session.id
    let notification = await Notification.findOne({user: userid, id: id });

    if(!notification){
       return res.status(400).json({ message: `Notification with id ${id} was not found.!!` });
    }

    let destroyedRecord = await Notification.destroyOne({user: userid, id: id });

    await Activity.create({
        user: userid,
        event: "Delete Notification",
        description: "The user delete notification with subject "+notification.subject,
        createdAt: new Date(),
        updatedAt: new Date()
    });

    return res.json({ message: 'ok', data: destroyedRecord });

  }

};

