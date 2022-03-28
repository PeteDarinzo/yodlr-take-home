var express = require('express');
var router = express.Router();
var _ = require('lodash');
var logger = require('../lib/logger');
var log = logger();

var users = require('../init_data.json').data;
var curId = (_.size(users) + 1); // current id is length of users obj

/* GET users listing. */
router.get('/', function (req, res) {
  res.json(_.toArray(users));
});

/* Create a new user */
router.post('/', function (req, res) {
  var user = req.body;
  user.id = curId++;
  if (!user.state) {
    user.state = 'pending';
  }
  users[user.id] = user;
  log.info('Created user', user);
  res.json(user);
});

/* Get a specific user by id */
router.get('/:id', function (req, res, next) {
  var user = users[req.params.id];
  if (!user) {
    return next();
  }
  res.json(users[req.params.id]);
});

/* Get a specific user by name */
router.get('/:name', function (req, res, next) {
  var name = (req.params.name).toLowerCase().split(" ");
  const firstName = name[0];
  const lastName = name[1];
  let ids = Object.keys(users);
  for (let id of ids) {
    let user = users[id];
    if (((user.firstName.toLowerCase()) === firstName) && ((user.lastName.toLowerCase()) === lastName)) {
      res.json(user);
    }
  }
  return next()
})

/* Delete a user by id */
router.delete('/:id', function (req, res) {
  var user = users[req.params.id];
  delete users[req.params.id];
  res.status(204);
  log.info('Deleted user', user);
  res.json(user);
});

/* Update a user by id */
router.put('/:id', function (req, res, next) {
  var user = req.body;
  if (user.id != req.params.id) {
    return next(new Error('ID parameter does not match body'));
  }
  users[user.id] = user;
  log.info('Updating user', user);
  res.json(user);
});


module.exports = router;
