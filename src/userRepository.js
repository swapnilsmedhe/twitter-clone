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
}

module.exports = { UserRepository };
