const { Router } = require('express');
const { transferAmount } = require('../controllers/transfers.controllers');

const router = Router();

router.post('/', transferAmount);

module.exports = {
  transfersRouter: router,
};
