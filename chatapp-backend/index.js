const {createServer} = require("http"); // http를 통해 서버를 만든다.
const app = require("./app"); // app.js 를 가져온다.
const {Server} = require("socket.io"); // 웹소켓 서버
require("dotenv").config();

const httpServer = createServer(app); // http server를 만들고 데이터베이스 연결 부분을 올린다.
const io = new Server(httpServer, { // 웹소켓 서버를 만들고 http server를 올린다.
    // cors 세팅
    // 로컬 주소만 허용하게 설정한다.
    cors: {
        origin: "http://localhost:3000",
    },
});

// io.js 에 io 매개변수를 넘긴다.
require("./utils/io")(io);

// 서버를 틀어놓는다.
httpServer.listen(process.env.PORT, () => {
    console.log("server listening on port", process.env.PORT);
});