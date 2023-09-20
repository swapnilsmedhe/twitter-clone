class TweetRepository {
  #neo4jConnection;
  constructor(neo4jConnection) {
    this.#neo4jConnection = neo4jConnection;
  }

  addTweet(user, tweet) {
    return this.#neo4jConnection.executeWrite((tx) => {
      const query = `MATCH (user: User {name: '${user}'})
        CREATE (tweet: Tweet {tweet: '${tweet}', tweetedAt: datetime('${new Date().toISOString()}')})
        CREATE (user)-[:TWEETS]->(tweet)
        RETURN user, tweet`;

      return tx.run(query);
    });
  }
}

module.exports = { TweetRepository };
