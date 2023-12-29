require('dotenv').config() //! added.config() ?
const express = require('express'); // added .Router
const app = express();
const PORT = process.env.PORT;

//! Imports
const db = require('./db');
const { userController,taskController } = require('./controllers'); //! + user.controller?
const { setDate } = require('./middleware/date'); //! validate-session?

//! Middleware
app.use(express.json); //! added ()
app.use(setDate);

//! Controllers
app.use('/user', userController);
app.use('/task', taskController);

//! Connection
const server = async () => {
   await db(); //! added await.

    app.listen(PORT, () => console.log(`Server on Port ${PORT}`));
}

server();
