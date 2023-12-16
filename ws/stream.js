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

  socket.on('joinUser', (room , userId ) => {

    socket.broadcast.to( room ).emit( 'user-connected', userId );

    socket.on('disconnect', () => {
      socket.broadcast.to( room ).emit( 'user-disconnected', userId );
    })
  });

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


  // to sync the video
  socket.on( 'syncVideo', ( videoState, data ) =>
  {
    socket.broadcast.to( data.room ).emit( 'updateVideo', videoState );
  } );
  

  // For video 10 sec leep and back
  socket.on('Winds', ( videoState, data ) =>
  {
    socket.broadcast.to( data.room ).emit( 'updateWinds', videoState );
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
    socket.to( data.room ).emit( 'user-disconnected', data.socketId );
    //Sends the list of users to the client
    socket.disconnect();    
  } );
};

module.exports = stream;
