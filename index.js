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

app.get("/test", async (req, res) => {
    const text = req.query.text;
    if (!text) {
        sendResponse(res, 400, "Please enter text parameter");
        return;
    }
    try {
        const result = await axios.get('https://lexica.art/?q='+String(text)+'&_rsc=12wk8')
        sendResponse(res, 200, result.data);
    } catch (error) {
        sendResponse(res, 403, "Error connecting to openai");
    }
});

app.get("/test2", async (req, res) => {
    const text = req.query.text;
    if (!text) {
        sendResponse(res, 400, "Please enter text parameter");
        return;
    }
    try {
        const result = await axios.post('https://lexica.art/api/infinite-prompts', {"text":"woman's ass","model":"lexica-aperture-v3.5","searchMode":"images","source":"search","cursor":100})
        const arr = [];
        for (const type of result.data["message"]) {  
           arr.push(type["id"]);
        }
        sendResponse(res, 200, arr);
    } catch (error) {
        sendResponse(res, 403, "Error connecting to openai");
    }
});

app.get("/", async (req, res) => {
    const text = req.query.text;
    if (!text) {
        sendResponse(res, 400, "Please enter text parameter");
        return;
    }
    try {
        const result = await axios.get('https://api3.haji-api.ir/majid/gpt/4?q='+String(text))
        sendResponse(res, 200, result.data['result']);
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
      const result = await axios.get('https://api3.haji-api.ir/majid/gpt/4?q='+String(text))
        sendResponse(res, 200, result.data['result']);
    } catch (error) {
        sendResponse(res, 403, "Error connecting to openai");
    }
});



// api get info site 
//metode post 
app.get('/info', async (req, res) => {
  const text = req.query.ip

  if (!text) {
    sendResponse(res, 400, 'Please enter ip address')
    return
  }
  if (text == 'me') {
    const response = await axios.get('https://checkip.amazonaws.com/')
    const text = response.data
    try {
      const response = await axios.get(
        'https://ipinfo.io/' + text + '/json?token=cf7c7cc27c91c7'
      )

      sendResponse(res, 200, response.data)
    } catch (error) {
      sendResponse(res, 403, 'Error connecting')
    }
    return
  } else {
    try {
      const response = await axios.get(
        'https://ipinfo.io/' + text + '/json?token=cf7c7cc27c91c7'
      )

      sendResponse(res, 200, response.data)
    } catch (error) {
      sendResponse(res, 403, 'Error connecting')
    }
  }
})

//metode post
app.post('/info', async (req, res) => {
  const text = req.body.ip

  if (!text) {
    sendResponse(res, 400, 'Please enter ip address')
    return
  }
  if (text == 'me') {
    const response = await axios.get('https://checkip.amazonaws.com/')
    // text = response.data.ip;
    const text = response.data
    try {
      const response = await axios.get(
        'https://ipinfo.io/' + text + '/json?token=cf7c7cc27c91c7'
      )

      sendResponse(res, 200, response.data)
    } catch (error) {
      sendResponse(res, 403, 'Error connecting')
    }
    return
  } else {
    try {
      const response = await axios.get(
        'https://ipinfo.io/' + text + '/json?token=cf7c7cc27c91c7'
      )

      sendResponse(res, 200, response.data)
    } catch (error) {
      sendResponse(res, 403, 'Error connecting')
    }
  }
})


app.get("/Make/photo", async (req, res) => {
    const text = req.query.text;
    if (!text) {
        sendResponse(res, 400, "Please enter text parameter");
        return;
    }
    try {
        const result = await axios.get('https://pyrubi.b80.xyz/image-creator.php?text='+String(text))
        sendResponse(res, 200, result.data['result']);
    } catch (error) {
        sendResponse(res, 403, "Error connecting to openai");
    }
});


app.post("/Make/photo", async (req, res) => {
    const text = req.body.text;
    if (!text) {
        sendResponse(res, 400, "Please enter text parameter");
        return;
    }
    try {
      const result = await axios.get('https://pyrubi.b80.xyz/image-creator.php?text='+String(text))
        sendResponse(res, 200, result.data['result']);
    } catch (error) {
        sendResponse(res, 403, "Error connecting to openai");
    }
});





app.use((err, req, res, next) => {
    console.error(err.stack);
    sendResponse(res, 500, "Something broke!");
});

app.listen(3002, () => {
    console.log("ChatGPT API is running on port 3000");
});
