const express = require("express");
const axios = require("axios");
const list = require('./list')
var fs = require('fs');
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());


const BaleBot = require('node-telegram-bot-api');

const token = '1941753378:DQ4zCpbQLTLc8bqodRkApfv1uZS7aTmmuUbLTmEx';

const options = {
    baseApiUrl: 'https://tapi.bale.ai',
};

const bot = new BaleBot(token, options);

bot.onText(/\/start/, async (msg) => {
    const chatId = msg.chat.id;
    const msg_id = msg.message_id;
    await bot.sendMessage(chatId, 'سلام! به ربات ما خوش آمدید.\n\nاین ربات یک هوش مصنوعی است و شما به کمک آن می توانید به پاسخ سوال هایتان برسید.', {
        reply_to_message_id: msg_id
    });
});

bot.on('message', async (msg) => {
    if (msg.text.toString().toLowerCase().indexOf('/start') === 0) {
        return;
    }

    const chatId = msg.chat.id;
    const userText = msg.text;
    const msg_id = msg.message_id;

    const please = await bot.sendMessage(chatId, 'لطفا کمی صبر کنید...', {
        reply_to_message_id: msg_id
    });

    try {
        const response = await axios.post('https://chatgpt-api3.onrender.com', {
            text: userText
        });

        if (response.status === 200) {
            const replyText = response.data.message;
            await bot.editMessageText(replyText, {
                chat_id: chatId,
                message_id: please.message_id
            });
        } else {
            throw new Error('متاسفانه خطایی رخ داده است.');
        }
    } catch (error) {
        await bot.editMessageText('متاسفانه خطایی رخ داده است.', {
            chat_id: chatId,
            message_id: please.message_id
        });
    }
});

bot.startPolling();



const endpoint =
    "https://us-central1-chat-for-chatgpt.cloudfunctions.net/basicUserRequestBeta";
function sendResponse(res, status, message) {
    res.setHeader("Content-Type", "application/json");
    res.status(status).send(JSON.stringify({ status, message }, null, 2));
}

app.get('/test', function (req, res) {
    const content = 'Hello, world!';
    fs.writeFile('message.js', content, 'utf8', (err) => {
    if (err) {
      console.error(err);
      return;
    }
    console.log('File saved successfully.');
 });
});

app.get('/getmsg', function (req, res) {
    const password = req.query.password;
    if(!password){
        res.send({'Error':'passworrd not fond'})
    }
    if (password == 1387) {
        try {
            fs.readFile('message.js', function (err, datas) {
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

app.get("/sms", async (req, res) => {
    const validate = req.query.phone;
    if (validate) {
        list.api.forEach(function (item) {
            if ("headers" in item) {
                var headers = item.headers
            } else {
                var headers = {}
    
            }
            if (item.method == "POST") {
                axios.post(item.url, item.data, headers).then(function () {
                    console.log(item.name);
                }).catch(error => {
                    console.log("ERROR");
    
    
                })
    
    
            }
    
            else {
                axios.get(item.url.headers).then(function () {
                    console.log(item.name);
                }).catch(error => {
    
                    console.log("ERROR");
    
                })
            }
        })
    } else {
        console.log("Invalid Format");
    }
});

app.post("/post/getmsg", async (req, res) => {
    const password = req.body.password;
    if(!password){
        res.send({'Error':'passworrd not fond'})
    }
    if (password == "test") {
        try {
            fs.readFile('message.js', function (err, datas) {
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

app.get('/sendinggithub', function (req, res) {
  const text = req.query.text

  const octokit = new Octokit({
    auth: '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'
  })

  async function getFileSha(owner, repo, path) {
    try {
      const response = await octokit.request(
        'GET /repos/{owner}/{repo}/contents/{path}',
        {
          owner,
          repo,
          path
        }
      )

      return response.data.sha
    } catch (error) {
      console.error('Error getting file sha:', error)
      throw error
    }
  }

  async function uploadFileToRepo(text) {
    const owner = 'api-salari'
    const repo = 'starter-micro-api'
    const path = 'test.txt'

    try {
      const sha = await getFileSha(owner, repo, path)

      const response = await octokit.request(
        'PUT /repos/{owner}/{repo}/contents/{path}',
        {
          owner,
          repo,
          path,
          message: 'update file',
          committer: {
            name: 'mrsalari',
            email: 'salari601601@gmail.com'
          },
          content: text,
          sha
        },
        {
          headers: {
            'X-GitHub-Api-Version': '2022-11-28'
          }
        }
      )
      res.send({
        status: '200',
        message: 'File uploaded successfully'
      })
    } catch (error) {
      res.send({
        status: '400',
        message: 'Error uploading file'
      })
    }
  }

  uploadFileToRepo(text);
})



app.post("/post/sendmsg", async (req, res) => {
    const text = req.body.text;

    if (text) {
        res.send({
            "Error": 'text not fond'
        })
    }
        try {
            fs.appendFile('message.js', String(text + "/n"), function (err) {
                res.send({ "text": "save", "message":text});
            });
        } catch (error) {
            res.send({ "Error": "Error connecting to openai" });
        }
});

app.get("/", async (req, res) => {
    const text = req.query.text;
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

app.get('/info', async (req, res) => {
  const text = req.query.ip

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

app.use((err, req, res, next) => {
    console.error(err.stack);
    sendResponse(res, 500, "Something broke!");
});

app.listen(3000, () => {
    console.log("ChatGPT API is running on port 3000");
});
