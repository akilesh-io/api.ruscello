const express = require( 'express' );
const { ExpressPeerServer } = require( "peer" );

var app = express();

/**
 * peerjs server setup
 */

const server = require( 'http' ).createServer( app );

const peerServer = ExpressPeerServer( server, {
    proxied: true,
    debug: true,
    path: "/myapp",
    ssl: {},
} );


module.exports = peerServer;