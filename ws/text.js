const text = ( socket ) => {
    
    socket.on( 'subscribe', ( data ) => {
        //subscribe/join a room
        socket.join( data.room );
        socket.join( data.socketId );

        //Inform other members in the room of new user's arrival
        if ( socket.adapter.rooms.has(data.room) === true ) {
            socket.to( data.room ).emit( 'new user', { socketId: data.socketId } );
        }
    } );

    socket.on("createdMessage", (msg) => {
        socket.broadcast.emit("newIncomingMessage", msg);
    });

    socket.on( 'newUserStart', ( data ) => {
        socket.to( data.to ).emit( 'newUserStart', { sender: data.sender } );
    } );

    socket.on('disconnect', () => {
        console.log('user disconnected');
    });

}

module.exports = text;
