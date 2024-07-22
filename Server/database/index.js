const mongoose = require("mongoose");

const conectarDB = async () =>{
    try {
        await mongoose.connect(process.env.CONNECTMONGODB)
        console.log("DataBase Conectada 👾");
    } catch (error) {
        console.error(error)
        process.exit(1)
    }
}

module.exports = conectarDB