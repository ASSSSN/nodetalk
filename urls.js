const Home = '/';
const MainRoom = '/';
const GetMakeRoom = '/room';
const PostRoom = '/room';
const GetRoom = '/room/:id';
const DeleteRoom = '/room/:id';
const PostChat = '/room/:id/chat';
const PostGif = '/room/:id/gif';

const urls = {
    home: Home,
    mainroom: MainRoom,
    getmakeroom: GetMakeRoom,
    postroom: PostRoom,

    getroom: (id) => {
        return id ? `/room/${id}` : GetRoom;
    },
    deleteroom: (id) => {
        return id ? `/room/${id}` : DeleteRoom;
    },
    postchat: (id) => {
        return id ? `/room/${id}/chat` : PostChat;
    },
    postgif: (id) => {
        return id ? `/room/${id}/gif` : PostGif;
    },
};

module.exports = urls;