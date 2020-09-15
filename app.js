const handleBlogRouter = require("./src/router/blog");
const handleUserRouter = require("./src/router/user");
const querystring = require("querystring");
// const { set, get} = require('./src/db/redis')
const { access } = require("./src/utils/log");

const SESSION_DATA = {};

const getCookieExpores = () => {
  const d = new Date();
  d.setTime(d.getTime() + 24 * 60 * 1000);
  return d.toGMTString();
};

const getPostData = (request) => {
  return new Promise((resovle, reject) => {
    if (request.method !== "POST") {
      resovle();
      return;
    }
    if (request.headers["content-type"] !== "application/json") {
      resovle();
      return;
    }
    let postData = "";
    request.on("data", (chunk) => {
      postData += chunk.toString();
    });
    request.on("end", () => {
      if (!postData) {
        resovle();
        return;
      }
      console.log("postData", postData);
      resovle(postData);
    });
  });
};

const serverHandle = (request, response) => {
  access(
    `${request.method}---${request.url}--${
      request.headers["user-agent"]
    }--${Date.now()}`
  );
  const resFailure = (errmessage) => {
    response.writeHead(404, {
      "Content-type": "text/plain",
    });
    response.write("404 Not Found");
    response.end(
      JSON.stringify({
        _failure: true,
        ...errmessage,
      })
    );
  };
  response.setHeader("Content-type", "application/json");
  response.setHeader("Access-Control-Allow-Origin", "*");
  const url = request.url;
  request.path = url.split("?")[0];
  request.query = querystring.parse(url.split("?")[1]);
  request.cookie = {};
  const cookieStr = request.headers.cookie;
  cookieStr &&
    cookieStr.split(";").forEach((item) => {
      if (item) {
        const arr = item.split("=");
        request.cookie[arr[0].trim()] = arr[1].trim();
      }
    });

  let needSetCookie = false;
  let userId = request.cookie.userid;
  if (userId) {
    if (!SESSION_DATA[userId]) {
      SESSION_DATA[userId] = {};
    }
  } else {
    needSetCookie = true;
    userId = `${Date.now()}_${Math.random()}`;
    SESSION_DATA[userId] = {};
  }
  request.session = SESSION_DATA[userId];
  if (request.method === "OPTIONS") {
    response.writeHead(200, {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Headers": "*",
      "Access-Control-Allow-Methods": "*",
    });
    response.end();
    return;
  }
  getPostData(request).then((postData) => {
    if (postData) {
      request.body = JSON.parse(postData);
    }
    const blogData = handleBlogRouter(request, response);
    if (blogData) {
      blogData
        .then((result) => {
          if (result && result.status === "success") {
            if (needSetCookie) {
              response.setHeader(
                "Set-Coookie",
                `userid=${userId}; path=/; httpOnly; expires=${getCookieExpores()}`
              );
            }
            response.end(
              JSON.stringify({
                ...result,
              })
            );
            return;
          } else {
            resFailure(result);
          }
        })
        .catch((err) => {
          resFailure(err);
        });
    }
    const userData = handleUserRouter(request, response);
    if (userData) {
      userData
        .then((result) => {
          console.log("result", result);
          if (result && result.status === "success") {
            if (needSetCookie) {
              response.setHeader(
                "Set-Cookie",
                `userid=${userId}; path=/; HttpOnly; expires=${getCookieExpores()}`
              );
            }
            response.end(
              JSON.stringify({
                ...result,
              })
            );
            return;
          } else {
            resFailure(result);
          }
        })
        .catch((err) => {
          resFailure(err);
        });
    }
  });
};

module.exports = serverHandle;
