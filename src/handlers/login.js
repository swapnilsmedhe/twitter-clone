const jwt = require("jsonwebtoken");

const generateToken = (username) =>
  jwt.sign({ sub: username }, process.env.JWT_SECRET);

const createLoginHandler = (userRepository) => {
  return (req, res) => {
    const { username, password } = req.body;

    const token = generateToken(username);

    userRepository.getUser(username).then((user) => {
      if (user.username !== username || user.password !== password) {
        res.sendStatus(403);
        return;
      }
    });

    res.send({ bearer: token });
  };
};

module.exports = { createLoginHandler };
