const { createApp } = require("./src/app");
require("dotenv").config();

const main = () => {
  const app = createApp();
  const PORT = process.env.PORT;

  app.listen(PORT, () => console.log("Listening on port", PORT));
};

main();
