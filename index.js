const express = require("express");
const axios = require("axios");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());



function sendResponse(res, status, message) {
    res.setHeader("Content-Type", "application/json");
    res.status(status).send(JSON.stringify({ status, message }, null, 2));
}


app.get("/", async (req, res) => {
    const add = req.query.add;
    if (!add) {
        sendResponse(res, 400, "Please enter add sending");
        return;
    }else{
        return add;
    }


});
