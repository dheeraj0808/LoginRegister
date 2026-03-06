require('dotenv').config();

const app = require('./src/app');
const sequelize = require('./src/config/db');

require('./src/models/user.model');

sequelize.sync();

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});