const Users = require('../models/users.model');
const Transfers = require('../models/transfers.model');

exports.transferAmount = async (req, res) => {
  try {
    const { amount, accountNumber, senderUserId } = req.body;

    const userReceiver = await Users.findOne({
      where: {
        status: true,
        accountNumber,
      },
    });

    const receiverUserId = userReceiver.id;

    const userSender = await Users.findOne({
      where: {
        status: true,
        id: senderUserId,
      },
    });

    if (!userSender) {
      res.status(404).json({
        status: 'error',
        message: 'user not found',
      });
    }

    if (amount > userSender.amount) {
      res.status(404).json({
        status: 'Error',
        message: 'You do not have than quantity',
      });
    }

    if (receiverUserId === senderUserId) {
      res.status(404).json({
        status: 'Error',
        message: 'You can not send money to yourself',
      });
    }

    const newAmountUserSender = +userSender.amount - amount;
    const newAmountUserReceiver = +userReceiver.amount + amount;

    await userSender.update({ amount: newAmountUserSender });
    await userReceiver.update({ amount: newAmountUserReceiver });

    const transfer = await Transfers.create({
      amount,
      senderUserId,
      receiverUserId,
    });

    res.json({
      status: 'success',
      message: 'transfer succeded',
      transfer,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: 'fail',
      message: 'Internal Server error',
    });
  }
};
