const express = require('express');

const Room = require('../schemas/room');
const Chat = require('../schemas/chat');
const URLs = require('../urls');
const RoomCallBack = require('./room');
const ChatCallBack = require('./chat');

const router = express.Router();
 
// Room
router.get(URLs.mainroom, (req, res, next) => RoomCallBack.mainRoom(req, res, next, URLs, Room));

router.get(URLs.getmakeroom, (req, res) => RoomCallBack.makeMainRoom(req, res));

router.post(URLs.postroom, (req, res, next) => RoomCallBack.postRoom(req, res, next, Room));

router.get(URLs.getroom(), (req, res, next) => RoomCallBack.getRoom(req, res, next, URLs, Room, Chat));

router.delete(URLs.deleteroom(), (req, res, next) => RoomCallBack.deleteRoom(req, res, next, URLs, Room, Chat));

// Chat
router.post(URLs.postchat(), (req, res, next) => ChatCallBack.postChat(req, res, next, Chat));

module.exports = router;