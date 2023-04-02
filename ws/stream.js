const stream = ( socket ) =>
{
  socket.on( 'join', ( data ) =>
  {
    //user/join a room
    socket.join( data.room );
    console.log( '✨: A user join' );

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

  // For Youtube
  socket.on( "room-video-id", ( videoId, data ) =>
  {
    socket.broadcast.to( data.room ).emit( "room-video-id", videoId );
    console.log("🚀 videoId:", videoId)
  } );

  socket.on( 'disconnect', () =>
  {
    console.log( '🔥: A user disconnected' );
    //Sends the list of users to the client
    socket.disconnect();
  } );
};

module.exports = stream;
