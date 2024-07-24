const express = require("express");
require("dotenv").config();
const app = express()
const bodyParser = require("body-parser");
const cors = require('cors');

//conectamos la base
const conectarDB = require("../Server/database/index.js");
conectarDB();

//Routers
const userRoutes = require("../Server/routes/auth.routes.js")
const taskRoutes = require("../Server/routes/task.routes.js")
const adminRoutes = require("../Server/routes/admin.routes.js")

//body-parser - cors
app.use(cors({
    origin: 'https://zocotask.onrender.com/api/users/login',
    credentials: true
}));
app.use(bodyParser.urlencoded( {extended:true} ));
app.use(bodyParser.json());


//ruta
app.use('/api/users', userRoutes);
app.use('/api/tasks', taskRoutes);
app.use('/api/admin', adminRoutes);


const port = 4000
app.listen(port , () =>{
    console.log(`Server listo en el puerto 🎪 ${port}`);
})
