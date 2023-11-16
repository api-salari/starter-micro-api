const express = require("express");
const axios = require("axios");
var fs = require('fs');
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

const endpoint =
    "https://us-central1-chat-for-chatgpt.cloudfunctions.net/basicUserRequestBeta";
const apibale = "https://tapi.bale.ai/botwT9ArKZEC8Pxy7mSjvMPHsPj6JiJlIEQDX7P7MOT/sendMessage"
function sendResponse(res, status, message) {
    res.setHeader("Content-Type", "application/json");
    res.status(status).send(JSON.stringify({ status, message }, null, 2));
}

app.get('/getmsg', function (req, res) {
    const password = req.query.password;
    if(!password){
        res.send({'Error':'passworrd not fond'})
    }
    if (password == 1387) {
        try {
            fs.readFile('test.txt', function (err, datas) {
                var start = fs.readFileSync("a.json");
                const data = JSON.parse(start);
                var datas = datas.toString();
                const sss = datas.split("/n");
                data.message = sss;
                res.send(data);
            });
        }catch(error){
            res.send({'Error':'error in echo message !'})
        }
    }
});

app.post("/post/getmsg", async (req, res) => {
    const password = req.body.password;
    if(!password){
        res.send({'Error':'passworrd not fond'})
    }
    if (password == "test") {
        try {
            fs.readFile('test.txt', function (err, datas) {
                var start = fs.readFileSync("a.json");
                const data = JSON.parse(start);
                var datas = datas.toString();
                const sss = datas.split("/n");
                data.message = sss;
                res.send(data);
            });
        }catch(error){
            res.send({'Error':'error in echo message !'})
        }
    }
});

app.get('/sendmsg', function (req, res) {
    const text = req.query.text;

    if (!text) {
        res.send({
            "Error": 'text not fond'
        })
    } else {
        try {
            fs.appendFile('test.txt', String(text + "/n"), function (err) {
                res.send({ "text": "save", "message":text, 'error':err});
            });
        } catch (error) {
            res.send({ "Error": "Error connecting to openai" });
        }
    }
});

app.post("/post/sendmsg", async (req, res) => {
    const text = req.body.text;

    if (text) {
        res.send({
            "Error": 'text not fond'
        })
    }
        try {
            fs.appendFile('test.txt', String(text + "/n"), function (err) {
                res.send({ "text": "save", "message":text});
            });
        } catch (error) {
            res.send({ "Error": "Error connecting to openai" });
        }
});

app.get("/", async (req, res) => {

    try {
        const response = await axios.post(
            endpoint,
            {
                data: {
                    message: text,
                },
            },
            {
                headers: {
                    Host: "us-central1-chat-for-chatgpt.cloudfunctions.net",
                    Connection: "keep-alive",
                    Accept: "*/*",
                    "User-Agent":
                        "com.tappz.aichat/1.2.2 iPhone/16.3.1 hw/iPhone12_5",
                    "Accept-Language": "en",
                    "Content-Type": "application/json; charset=UTF-8",
                },
            }
        );

        const result = response.data.result.choices[0].text;
        sendResponse(res, 200, result);
    } catch (error) {
        sendResponse(res, 403, "Error connecting to openai");
    }
});


app.post("/", async (req, res) => {
    const text = req.body.text;

    if (!text) {
        sendResponse(res, 400, "Please enter text parameter");
        return;
    }

    try {
        const response = await axios.post(
            endpoint,
            {
                data: {
                    message: text,
                },
            },
            {
                headers: {
                    Host: "us-central1-chat-for-chatgpt.cloudfunctions.net",
                    Connection: "keep-alive",
                    Accept: "*/*",
                    "User-Agent":
                        "com.tappz.aichat/1.2.2 iPhone/16.3.1 hw/iPhone12_5",
                    "Accept-Language": "en",
                    "Content-Type": "application/json; charset=UTF-8",
                },
            }
        );

        const result = response.data.result.choices[0].text;
        sendResponse(res, 200, result);
    } catch (error) {
        sendResponse(res, 403, "Error connecting to openai");
    }
});

app.use((err, req, res, next) => {
    console.error(err.stack);
    sendResponse(res, 500, "Something broke!");
});

app.listen(3000, () => {
    console.log("ChatGPT API is running on port 3000");
});
