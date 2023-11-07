// 통신 관련된 함수를 만들 곳
const chatController = require("../Controllers/chat.controller");
const userController = require("../Controllers/user.controller");

// index.js 에서 io 값을 받아온다.
module.exports = function(io) {
    // io.emit(): 말하는거
    // io.on(): 듣는거

    // 연결된 사람의 정보를 socket 이라는 매개변수에 담는다.
    io.on("connection", async (socket) => {
        console.log("client is connected", socket.id);

        // login 값이 들어왔을 때 처리
        socket.on("login", async (userName, callback) => {
            // 에러 핸들링
            try {
                // 유저정보를 저장
                const user = await userController.saveUser(userName, socket.id);

                // 유저가 로그인 했을 때 시스템 알림
                const welcomeMessage = {
                    chat: `${user.name} is joined to this room`,
                    user: { id: null, name: "system" },
                }
                io.emit("message", welcomeMessage);

                callback({ ok: true, data: user });
            } catch (error) {
                callback({ ok: false, error: error.message });
            }
        });

        socket.on("sendMessage", async (message, callback) => {
            // 에러 핸들링
            try {
                // socket id 로 유저찾기
                const user = await userController.checkUser(socket.id);
    
                // 메세지 저장 (유저)
                const newMessage = await chatController.saveChat(message, user);
    
                // 새 메세지가 오면 서버 => 대화방의 유저 모두에게 전달
                io.emit("message", newMessage);
    
                callback({ ok: true });
            } catch (error) {
                callback({ ok: false, error: error.message });
            }
        });

        // 연결끊김을 감지
        socket.on("disconnect", () => {
            console.log("user is disconnected");
        });
    });
}