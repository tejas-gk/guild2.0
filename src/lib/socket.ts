const { createServer } = require('http');
const next = require('next');
const { Server } = require('socket.io');
const { initSocket } = require('./pages/api/like');

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const server = createServer(app.getRequestHandler());
const io = new Server(server);

app.prepare().then(() => {
    // ... your other server setup code

    // Initialize Socket.io server
    initSocket(io);

    server.listen(3001, (err) => {
        if (err) throw err;
        console.log('> Ready on http://localhost:3001');
    });
});
