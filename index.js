const express = require("express");
const dotEnv = require("dotenv");
const mysql = require("mysql");
const router=require("./routes/apiRoutes")


const app = express();

app.use(express.json());

dotEnv.config();

global.con = mysql.createConnection({
    host: process.env.host,
    user: process.env.user,
    password: process.env.password,
    database: process.env.database
});

con.connect((err) => {
    if (err) {
        console.error('Database connection failed: ', err);
    } else {
        console.log('Database connected');
    }
});


app.use("/manufacturer-data",router)

app.listen(process.env.PORT, () => {
    console.log(`Server is running at ${process.env.PORT}`);
});
