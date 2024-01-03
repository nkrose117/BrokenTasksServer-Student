require('dotenv').config(); //!added .config()
const express = require('express'); 
const app = express();
const PORT = process.env.PORT;

//! Imports
const {db, mongoose} = require('./db'); //! added { ,mongoose}
const { userController,taskController } = require('./controllers');
const { setDate } = require('./middleware/date');

//! Middleware
app.use(express.json()); //! added ().
app.use(setDate);

//! Controllers
app.use('/user', userController);
app.use('/task', taskController);

//! Connection
const server = async () => {
    db();

    app.listen(PORT, () => console.log(`Server on Port ${PORT}`));
}

server();



