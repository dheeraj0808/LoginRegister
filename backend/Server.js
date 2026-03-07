require("dotenv").config();

const app = require("./src/app");
const sequelize = require("./src/config/db");

/* MODEL LOAD */
require("./src/models/user.model");

const PORT = process.env.PORT || 3002;

/* DB SYNC */
sequelize.sync({ force: true }).then(() => {
  console.log("Database synced");

  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
});