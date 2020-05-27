const SocketIO = require('socket.io');
const axios = require('axios');

module.exports = (server, app, sessionMiddleware) => {
    const io = SocketIO(server, { path: '/socket.io' });

    // 라우터에서 사용 가능하개 저장, req.app.get('io')로 접근 가능
    app.set('io', io);

    /* 
    *   of 메소드?? Socket.IO에 네임 스페이스를 부여, 기본은 /로 되어있음
    *   같은 네임 스페이스끼리만 데이터를 전달
    */
    const room = io.of('/room');
    const chat = io.of('/chat');
    io.use((socket, next) => {
        sessionMiddleware(socket.request, socket.request.res, next);
    });

    room.on('connection', (socket) => {
        console.log('room 네임스페이스에 접속');
        socket.on('disconnect', () => {
            console.log('room 네임스페이스 접속 해제');
        });
    });

    chat.on('connection', (socket) => {
        console.log('chat 네임스페이스에 접속');
        const req = socket.request;
        const { headers: { referer } } = req;

        // 같은 네임 스페이스에서도 더 세부적인 개념인 방(room)에 같이 들어가 있는 소켓끼리만 데이터를 주고받을 수 있다. 추출하는 과정
        const roomId = referer.split('/')[referer.split('/').length - 1].replace(/\?.+/, '');

        socket.join(roomId);

        // socket.to(방 아이디) 로 특정 방에 데이터를 보낼 수 있다.
        socket.to(roomId).emit('join', {
            user: 'system',
            chat: `${req.session.color} 님이 입장하셨습니다.`,
        });

        // 접속 해제 시 인원수가 0명인지 체크, 0명이면 방 제거 요청을 보낸다.
        socket.on('disconnect', async () => {
            console.log('chat 네임스페이스 접속 해제');
            socket.leave(roomId);
            const currentRoom = socket.adapter.rooms[roomId];
            const userCount = currentRoom ? currentRoom.length : 0;
            if(userCount === 0) {
                try {
                    await axios.delete(`http://localhost:8001/room/${roomId}`);
                    console.log('방 제거 요청 성공');
                } catch (error) {
                    console.error(error);
                    next();
                }
            } else {
                socket.to(roomId).emit('exit', {
                    user: 'system',
                    chat: `${req.session.color} 님이 퇴장하셨습니다.`,
                });
            }
        });
    });
};