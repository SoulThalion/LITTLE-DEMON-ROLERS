const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user.model');

const signUp = async (req, res) => {
  try {
    const { email, password, role } = req.body;
    const checkUser = await User.findOne({ where: { email: email } });

    if (checkUser)
      return res.status(403).json({
        message: '>> Email exists!',
      });

    const hashedPassword = bcrypt.hashSync(password, 10);

    const newUser = await User.create({
      email,
      password: hashedPassword,
      role
    });

    const token = jwt.sign({ email: newUser.email }, process.env.JWT_SECRET, {
      expiresIn: '1y',
    });

    delete newUser.password;

    return res.status(200).json({ message: '>> Sign up!!' });
  } catch (error) {
    console.log(error);
    return res.status(404).send('>> Oops something went wrong!');
  }
};

const logIn = async (req, res) => {
  try {
    const { email, password } = req.body;

    console.log(email)
    console.log(password)

    const user = await User.findOne({ where: { email } });

    if (user) {
      bcrypt.compare(password, user.password, (err, result) => {
        if (result) {
          const token = jwt.sign(
            { email: user.email },
            process.env.JWT_SECRET,
            { expiresIn: '1y' }
          );

          return res.status(200).json({ token });
        }
        return res
          .status(404)
          .send('>> Oops something went wrong, user or password incorrect.');
      });
    } else {
      return res
        .status(404)
        .send('>> Oops something went wrong, user or password incorrect.');
    }
  } catch (error) {
    return res
      .status(402)
      .send('>> Oops something went wrong, user or password incorrect.');
  }
};

module.exports = { signUp, logIn };