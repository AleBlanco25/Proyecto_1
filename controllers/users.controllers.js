const Transfers = require('../models/transfers.model');
const Users = require('../models/users.model');

exports.createAccount = async (req, res) => {
  try {
    const { name, password } = req.body;

    const accountNumber = Math.round(Math.random() * 1000000);

    const amount = 1000;

    const newUser = await Users.create({
      name: name.toLowerCase(),
      accountNumber,
      password,
      amount,
    });

    res.status(200).json({
      status: 'success',
      message: 'New account created succesfully',
      newUser,
    });
  } catch (error) {
    res.status(500).json({
      status: 'fail',
      message: 'Internal Server error',
    });
  }
};

exports.logAccount = async (req, res) => {
  try {
    const { password, accountNumber } = req.body;

    const user = await Users.findOne({
      where: {
        status: true,
        accountNumber,
        password,
      },
    });

    if (!user) {
      res.status(400).json({
        status: 'failed',
        message: "User doesn't exist",
      });
    }

    res.status(200).json({
      status: 'success',
      message: 'User logged succesfully',
      user,
    });
  } catch (error) {
    res.status(500).json({
      status: 'fail',
      message: 'Internal Server error',
    });
  }
};

exports.findHistory = async (req, res) => {
  try {
    const { id } = req.params;

    const userHistory = await Transfers.findAll({
      where: {
        senderUserId: id,
      },
    });

    res.status(200).json({
      status: 'success',
      message: 'History found succesfully',
      userHistory,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: 'fail',
      message: 'Internal Server error',
    });
  }
};
