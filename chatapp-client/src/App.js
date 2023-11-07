import { useEffect, useState } from "react";
import "./App.css";
import socket from "./server";
import InputField from "./components/InputField/InputField";
import MessageContainer from "./components/MessageContainer/MessageContainer";

function App() {
    const [user, setUser] = useState(null); // state 정보 생성
    const [message, setMessage] = useState('');
    const [messageList, setMessageList] = useState([]);

    console.log("message List", messageList);

    useEffect(() => {
        socket.on("message", (message) => {
            setMessageList((prevState) => prevState.concat(message));
        });

        askUserName();
    }, []);

    const askUserName = () => {
        const userName = prompt("당신의 이름을 입력하세요.");
        console.log("user name", userName);

        // emit(대화의 제목, 보낼내용, 콜백함수)
        socket.emit("login", userName, (response) => {
            // response (처리가 잘 됐는지)
            if (response?.ok) {
                setUser(response.data);
            }
        });
    }

    const sendMessage = (event) => {
        event.preventDefault();

        setMessage('');
        socket.emit("sendMessage", message, (response) => {
            console.log("sendMessage response", response);
        });
    }
    return (
        <div>
            <div className="App">
                <MessageContainer
                    messageList={messageList}
                    user={user}
                />
                <InputField
                    message={message}
                    setMessage={setMessage}
                    sendMessage={sendMessage}
                />
            </div>
        </div>
    );
}

export default App;
