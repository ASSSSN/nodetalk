

exports.postChat = async (req, res, next ,Chat) => {
    try {
        const chat = new Chat({
            room: req.params.id,
            user: req.session.color,
            chat: req.body.chat,
        });
        await chat.save();

        // to(방 아이디).emit('chat')로 같은 방 소켓들에게 메시지 데이터를 전송한다.
        req.app.get('io').of('/chat').to(req.params.id).emit('chat', chat);
        
        res.send('ok');
    } catch (error) {
        console.error(error);
        next(error);
    }
}

exports.postGif = async (req, res, next, Chat) => {
    try {
        const chat = new Chat({
            room: req.params.id,
            user: req.session.color,
            gif: req.file.filename,
        });
        await chat.save();
        req.app.get('io').of('/chat').to(req.params.id).emit('chat', chat);
        res.send('ok');
    } catch (error) {
        console.error(error);
        next(error);
    }
}