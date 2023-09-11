const createSignupHanlder = (neo4jSession) => {
  return (req, res) => {
    neo4jSession.executeWrite((tx) => {
      const { username, password } = req.body;
      console.log(username, password);
      tx.run(
        `CREATE(user:User {name: "${username}", password: "${password}"})`
      );
    });
    res.sendStatus(201);
  };
};

module.exports = { createSignupHanlder };
