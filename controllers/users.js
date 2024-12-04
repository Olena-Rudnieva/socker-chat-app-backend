const { User } = require('../models/user');
const { validateUser } = require('../models/user');

const addUser = async (req, res, next) => {
  try {
    const { error } = validateUser(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    const { firstName, lastName } = req.body;
    const newUser = new User({ firstName, lastName });

    await newUser.save();
    res.status(201).json({
      id: newUser._id,
      firstName: newUser.firstName,
      lastName: newUser.lastName,
    });
  } catch (error) {
    next(error);
  }
};

const getUserById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json(user);
  } catch (error) {
    next(error);
  }
};

const logout = async (req, res, next) => {
  try {
    res.status(200).json({ message: 'User logged out successfully' });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  addUser,
  getUserById,
  logout,
};
