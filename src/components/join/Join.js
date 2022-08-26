import React, { useState } from 'react'
import "../join/Join.css"
import logo from "../../images/images.jpg"
import { Link } from 'react-router-dom'

let user;
const Join = () => {

    let sendUser = () => {
        user = document.getElementById("joininput").value;
        document.getElementById("joininput").value = "";

    }

    const [name, setName] = useState("");
    console.log(name)

    return (
        <>
            <div className='joinpage'>
                <div className='joincontainer'>
                    <img src={logo} alt='chat'></img>
                    <h1>Chat ~ App</h1>
                    <input type="text" id="joininput" onChange={(e) => setName(e.target.value)} placeholder='Enter your name..' />
                    <Link onClick={(event) => !name ? event.preventDefault() : null} to="/chat"> <button className='joinbtn' onClick={sendUser}>Login In</button></Link>
                </div>
            </div>
        </>
    )
}

export default Join;
export { user }