const express = require("express");
const axios = require("axios");
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

app.get('/send', function(req, res) {
const text = req.query.text;
 const dataToSend = {
      chat_id: "5861988128",
      text: text 
      };
   axios.post("https://api.telegram.org/botAAGJDMmDUz8jgXv7Un7NqiruHZho58nd2Lg/sendMessage")
   const respon = response.data.result.choices[0].text;
   sendResponse(res, 200, respon);
});

app.post('/send/message', function(req, res) {
const text = req.body.text;
 const dataToSend = {
      chat_id: "915303220",
      text: text 
      };
   axios.post(apibale, dataToSend) 
   res.send({
   'status': 'ok',
  });
});

app.get("/test", async (req, res) => {
    const text = req.query.text;
    try {
        const response = await axios.post(
            apibale,
            {
                data: {
                    chat_id: "915303220",
                    text: text,
                },
            },
            {
                headers: {
                    "Content-Type": "application/json; charset=UTF-8",
                },
            }
        );

        const result = response.data.result.choices[0].text;
        sendResponse(res, 200, result);
    } catch (error) {
        sendResponse(res, 403, "Error connecting to api");
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
