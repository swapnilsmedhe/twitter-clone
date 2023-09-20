class UserRepository {
  #neo4jConnection;
  constructor(neo4jConnection) {
    this.#neo4jConnection = neo4jConnection;
  }

  createUser({ username, password }) {
    this.#neo4jConnection.executeWrite((tx) => {
      tx.run(
        `CREATE(user:User {name: "${username}", password: "${password}"})`
      );
    });
  }

  getUser(username) {
    const result = this.#neo4jConnection.executeWrite(async (tx) => {
      const query = `MATCH(user:User {name: "${username}"}) RETURN user.name AS username, user.password AS password`;
      return tx.run(query);
    });

    return result.then(({ records }) => {
      const username = records[0].get("username");
      const password = records[0].get("password");
      return { username, password };
    });
  }
}

module.exports = { UserRepository };
