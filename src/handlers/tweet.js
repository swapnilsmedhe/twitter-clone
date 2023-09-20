const jwt = require("jsonwebtoken");

const decodeToken = ({ authorization }) =>
  jwt.decode(authorization, process.env.JWT_SECRET);

const createTweeHandler = function (tweetRepository) {
  return (req, res) => {
    const { sub: username } = decodeToken(req.headers);
    const { tweet } = req.body;
    tweetRepository.addTweet(username, tweet).then(() => res.sendStatus(201));
  };
};

module.exports = { createTweeHandler };
