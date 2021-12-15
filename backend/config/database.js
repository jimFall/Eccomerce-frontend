const mongoose = require("mongoose");
const connectdatabase = () => {


    mongoose.connect(process.env.DB_URI, 
        { useNewUrlparser: true,
        useUnifiedTopology: true 
    })
    .then((data) => {

        console.log(`mongo db is connected with server ${data.connection.host}`)
    })

}


module.exports = connectdatabase;