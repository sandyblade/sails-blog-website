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

module.exports = async function (req, res, next){
  sails.helpers.verifyJwt.with({
    req: req,
    res: res
  }).switch({
    error: function (err) {
        return res.serverError(err)
    },
    invalid: function(_err){
      if (req.wantsJSON){
        return res.sendStatus(401)
      }
      return res.redirect('/login')
    },
    success: function(){
      return next()
    }
  })
}
