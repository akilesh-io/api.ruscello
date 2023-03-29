const text = ( socket ) => {

    socket.on("createdMessage", (msg) => {
        socket.broadcast.emit("newIncomingMessage", msg);
    });

    socket.on('disconnect', () => {
        console.log('user disconnected');
    });

}

module.exports = text;
