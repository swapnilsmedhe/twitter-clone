const createSignupHanlder = (userRepository) => {
  return (req, res) => {
    const { username, password } = req.body;
    userRepository
      .createUser({ username, password })
      .then(() => res.sendStatus(201));
  };
};

module.exports = { createSignupHanlder };
