const app = require("./app");
const dotenv = require("dotenv");
const { path } = require("./app");
const connectdatabase = require("./config/database")


//handling uncaught Exception Means varibale not define yafunction

process.on("uncaughtException", (err) => {
    
    console.log(`Error:${err.message}`)

    console.log(`shutting down the server Due to uncaught Exception `)

    process.exit(1);

});


//config folder import kiya h
dotenv.config({ path: "backend/config/config.env" });

//connectin to database
connectdatabase()

const server = app.listen(process.env.PORT || 4000, () => {
    console.log(`server is working on http://localhost:${process.env.PORT || 4000}`)
});

// Unhandlepromise Rejection

process.on("unhandledRejection", err => {

    console.log(`Error:${err.message}`)
    console.log(`shutting down the server Due to unhandler promiise Rejection `)

    server.close(() => {


        process.exit(1);
    });

})







