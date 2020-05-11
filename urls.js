const Home = '/';
const MainRoom = '/';
const GetMakeRoom = '/room';
const PostRoom = '/room';
const GetRoom = '/room/:id';
const DeleteRoom = '/room/:id';

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
    }
};

module.exports = urls;