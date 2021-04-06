const functions = require("firebase-functions");
// express読みこみ
const express = require("express");
const requestPromise = require("request-promise-native");
const cors = require("cors");
const app = express();

const getDataFromApi = async (keyword) => {
    // cloud functionsから実行する場合には地域の設定が必要になるため，`country=JP`を追加している
    const requestUrl =
      "https://www.googleapis.com/books/v1/volumes?country=JP&q=intitle:";
    const result = await requestPromise(`${requestUrl}${keyword}`);
    return result;
  };

app.get("/hello", (req, res) => {
  res.send("Hello Express!");
});

app.get("/user/:userId", (req, res) => {
    const users = [
      { id: 1, name: "ジョナサン" },
      { id: 2, name: "ジョセフ" },
      { id: 3, name: "承太郎" },
      { id: 4, name: "仗助" },
      { id: 5, name: "ジョルノ" },
    ];
    // req.params.userIdでURLの後ろにつけた値をとれる．
    const targetUser = users.find(
      (user) => user.id === Number(req.params.userId)
    );
    res.send(targetUser);
  });

  app.get("/gbooks/:keyword", cors(), async (req, res) => {
    const response = await getDataFromApi(req.params.keyword);
    res.send(response);
});

// 出力
const api = functions.https.onRequest(app);
module.exports = { api };
// http://localhost:5000/node-50090/us-central1/helloWorld
// local
// http://localhost:5000/node-50090/us-central1/helloWorld
// http://localhost:5000/node-50090/us-central1/api
// firebase
// http://localhost:5000/node-50090/us-central1/helloWorld

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", { structuredData: true });
//   response.send("Hello from Firebase!");
// });
