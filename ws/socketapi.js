//var stream = require( './stream' );
var registerTextHandler = require( './text' );

const videoCall = require( './videoCall' );

const io = require( "socket.io" )();
const socketapi = {
    io: io
};

const onConnection = (socket) => {
    //stream( socket)
    videoCall(io, socket)
    registerTextHandler( socket)
}

// Add your socket.io logic here!
// io.on( "connection", function( socket ) {
//     console.log( "A user connected" );
// });

// end of socket.io logic
io.on("connection", onConnection);
//io.of( '/text' ).on( 'connection', registerTextHandler );
//io.of( '/call' ).on( 'connection', videoCall );

module.exports = socketapi;

