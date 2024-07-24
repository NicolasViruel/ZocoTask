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
    // origin: 'http://localhost:5173',
    origin: 'https://66a0758d4c78b395b72e0025--dreamy-cendol-9cd611.netlify.app',
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
