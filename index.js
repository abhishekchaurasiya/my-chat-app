const http = require("http");
const express = require("express");

const cors = require("cors");
const socketIO = require("socket.io");



const app = express();
const port = process.env.PORT;

app.get("/", (req, res) => {
    res.send("Hello i am node.js")
})

const users = [{}];

app.use(cors())

const server = http.createServer(app);


const io = socketIO(server);

io.on("connection", (socket) => {

    socket.on("joined", ({ user }) => {
        users[socket.id] = user;
        console.log(`${user} user hasbeen joined`);

        socket.broadcast.emit("userJoined", { user: "Admin", message: ` ${users[socket.id]} has joined` });

        socket.emit("welcome", { user: "Admin", message: `Welcome to the chat, ${users[socket.id]} ` });
    })

    socket.on("message", ({ message, id }) => {
        io.emit("sendMessage", { user: users[id], message, id })
    })

    socket.on("disconnect", () => {
        socket.broadcast.emit("leave", { user: 'Admin', message: "User has left" })

    })

})

server.listen(port, () => {
    console.log(`Server is working on http://localhost:${port}`);
})

