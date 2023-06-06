const { ExpressPeerServer } = require( "peer" );
const express = require( 'express' );

var app = express();

/**
 * peerjs server setup
 */

const server = require( 'http' ).createServer( app );

const peerServer = ExpressPeerServer( server, {
    path: "/myapp",
} );


module.exports = peerServer;