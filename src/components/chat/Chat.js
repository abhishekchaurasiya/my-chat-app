import React, { useEffect, useState } from 'react'
import { user } from '../join/Join'
import ReactScrollToBottom from "react-scroll-to-bottom"

import "../chat/Chat.css"
import sendLogo from "../../images/send.png";
import closeBTn from "../../images/closeIcon.png"
import socketIo from "socket.io-client"
import Message from "../message/Message"

// https://abhishekchaurasiya-makes-great-sites.netlify.app

let EndPoints = "https://backend-nodejs-code.herokuapp.com/";

let socket;

function Chat() {

  const [id, setId] = useState("");

  const [messages, setMessages] = useState([]);

  const [disable, setDisable] = useState(true);

  
  
  let send = () => {
    const message = document.getElementById("chatInput").value;
    
    socket.emit("message", { message, id });
    document.getElementById("chatInput").value = "";
    
    
  }



  useEffect(() => {
    socket = socketIo(EndPoints, { transports: ["websocket"] });

    socket.on("connect", () => {
      setId(socket.id)
    })

    socket.emit("joined", { user })

    socket.on("welcome", (data) => {
      setMessages([...messages, data])
    })

    socket.on("userJoined", (data) => {
      setMessages([...messages, data])
    })

    socket.on("leave", (data) => {
      setMessages([...messages, data])
    })

    return () => {
      socket.emit('disconnect');
      socket.off()
    }

  }, [])


  useEffect(() => {
    socket.on("sendMessage", (data) => {
      setMessages([...messages, data])

    })

    return () => {
      socket.off()
    }
  }, [messages]);

  return (
    <div className="chatPage">
      <div className="chatContainer">
        <div className="header">
          <h2><i class="uil uil-comment-heart"></i> Chat~App</h2>
          <a href="/"> <img src={closeBTn} alt="Close" /></a>
        </div>
        <ReactScrollToBottom className="chatBox" >
          {
            messages.map((item, i) => <Message key={i} user={item.id === id ? "" : item.user} message={item.message}
              classs={item.id === id ? 'right' : 'left'} />)
          }
        </ReactScrollToBottom>
        <div className="inputBox">
          <input onKeyPress={(event) => event.key === "Enter" ? send() : null} type="text" id='chatInput' />
          <button onClick={send}  className='sendBtn'><img src={sendLogo} alt="Send" /></button>
        </div>
      </div>

    </div>
  )
}

export default Chat