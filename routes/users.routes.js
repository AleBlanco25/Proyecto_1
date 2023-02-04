const { Router } = require('express');
const {
  createAccount,
  logAccount,
  findHistory,
} = require('../controllers/users.controllers');

const router = Router();

router.post('/signup', createAccount);
router.post('/login', logAccount);
router.get('/:id/history', findHistory);

module.exports = {
  usersRouter: router,
};
