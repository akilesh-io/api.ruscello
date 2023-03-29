const stream = ( socket ) =>
{
  socket.on( 'join', ( data ) =>
  {
    //user/join a room
    socket.join( data.room );
    //socket.join( data.socketId );
    //console.log("🚀 ~ file: stream.js:9 ~ socket.on ~ data.socketId:", data.socketId)

    //Inform other members in the room of new user's arrival
    if ( socket.adapter.rooms.has( data.room ) === true )
    {
      socket.to( data.room ).emit( 'new', { socketId: data.socketId } );
    }
  } );

  socket.on( "createdMessage", ( msg ) =>
  {
    socket.broadcast.emit( "newIncomingMessage", msg );
  } );

  socket.on( 'videoSeek', ( videoState, data ) =>
  {
    socket.broadcast.to( data.room ).emit( 'updateSeek', videoState );
  } );


  socket.on( 'playPause', ( playPause, data ) =>
  {
    socket.broadcast.to( data.room ).emit( 'updatePlayPause', playPause );
  } );

  socket.on( 'disconnect', () =>
  {
    console.log( '🔥: A user disconnected' );
    //Updates the list of users when a user disconnects from the server
    users = users.filter( ( user ) => user.socket !== socket.id );
    // console.log(users);
    //Sends the list of users to the client
    socket.emit( 'newUserResponse', users );
    socket.disconnect();
  } );
};

module.exports = stream;
