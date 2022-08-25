import React, { useEffect, useState } from 'react'
import { user } from '../join/Join'
import ReactScrollToBottom from "react-scroll-to-bottom"

import "../chat/Chat.css"
import sendLogo from "../../images/send.png";
import closeBTn from "../../images/closeIcon.png"
import socketIo from "socket.io-client"
import Message from "../message/Message"

let EndPoints = "http://localhost:4000/";

let socket;

function Chat() {

  const [id, setId] = useState("");

  const [messages, setMessages] = useState([])   //all console ko show karne ke liye apne chat box ke andar

  let send = () => {
    const message = document.getElementById("chatInput").value; // yah chat input ke value get karti hai 

    socket.emit("message", { message, id });
    document.getElementById("chatInput").value = ""; // value send ho jati hai to use empty kar deti hai 
  }

  useEffect(() => {
    socket = socketIo(EndPoints, { transports: ["websocket"] });

    socket.on("connect", () => {
      alert("connected...")
      setId(socket.id)
    })

    // Yaha ham backend ke liye user ke through data send karte hai and wah object from me hota hai {user:user}
    socket.emit("joined", { user })

    // jaha par data ko receive karte hai waha par arrow function ka use karte hai 
    socket.on("welcome", (data) => {
      setMessages([...messages, data]) // means phale all message me travers karo and then data ko send karo 
    })

    socket.on("userJoined", (data) => {
      setMessages([...messages, data])
    })

    socket.on("leave", (data) => {
      setMessages([...messages, data])
    })

    return () => {
      socket.emit('disconnect'); // jab user disconnect ho gya to us socket ko kar dete hai off
      socket.off()
    }

  }, [])


  useEffect(() => {
    socket.on("sendMessage", (data) => {
      setMessages([...messages, data])
      // console.log(data.user, data.message, data.id)
    })

    return () => {
      socket.off()  // one time message aane ke close kardo array ko 
    }
  }, [messages]);  // means tumhe kab kab show karna hai jab jab messages travers ho whole aaraya me

  return (
    <div className="chatPage">
      <div className="chatContainer">
        <div className="header">
          <h2>C CHAT</h2>
          {/* Here use anchor tag for refresh the data and send to home page  */}
          <a href="/"> <img src={closeBTn} alt="Close" /></a>
        </div>
        <ReactScrollToBottom className="chatBox" >
          {
            messages.map((item, i) => <Message user={item.id === id ? "" : item.user} message={item.message}
              classs={item.id === id ? 'right' : 'left'} />)
          }
        </ReactScrollToBottom>
        <div className="inputBox">
          <input onKeyPress={(event) => event.key === "Enter" ? send() : null} type="text" id='chatInput' />
          <button onClick={send} className='sendBtn'><img src={sendLogo} alt="Send" /></button>
        </div>
      </div>

    </div>
  )
}

export default Chat