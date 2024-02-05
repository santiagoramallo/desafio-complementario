const mongoose = require("mongoose");

// Nos conectamos a la BD: 

mongoose.connect("mongodb+srv://santiramallo10:Santi.10@cluster0.zoxa0bz.mongodb.net/e-commerce?retryWrites=true&w=majority")
    .then(() => console.log("Conexión exitosa"))
    .catch(() => console.log("Tenemos un error"))