import React from 'react'
import "./Message.css";


const Message = ({ user, message, classs }) => {
    if (user) {  // if user is present the send message 
        return (
            // Here we have import classe in chat component
            <div className={`messageBox ${classs}`}  >  
                {`${user}: ${message}`}
            </div>
        )
    }
    else {


        return (
            <div className={`messageBox ${classs}`}>
                {`You: ${message}`}
            </div>
        )
    }
}

export default Message