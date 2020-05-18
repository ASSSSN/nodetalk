const express = require('express');
const multer = require('multer');
const path  = require('path');
const fs = require('fs');

const Room = require('../schemas/room');
const Chat = require('../schemas/chat');
const URLs = require('../urls');
const RoomCallBack = require('./room');
const ChatCallBack = require('./chat');
const middleware = require('./middleware');

const router = express.Router();
 
// Room
router.get(URLs.mainroom, (req, res, next) => RoomCallBack.mainRoom(req, res, next, URLs, Room));

router.get(URLs.getmakeroom, (req, res) => RoomCallBack.makeMainRoom(req, res));

router.post(URLs.postroom, (req, res, next) => RoomCallBack.postRoom(req, res, next, Room));

router.get(URLs.getroom(), (req, res, next) => RoomCallBack.getRoom(req, res, next, URLs, Room, Chat));

router.delete(URLs.deleteroom(), (req, res, next) => RoomCallBack.deleteRoom(req, res, next, URLs, Room, Chat));

// Chat
router.post(URLs.postchat(), (req, res, next) => ChatCallBack.postChat(req, res, next, Chat));

// check uploads
middleware.checkUploads(fs);

// make multer
const upload = middleware.makeMulter(multer, path);

router.post(URLs.postgif(), upload.single('gif'), (req, res, next) => ChatCallBack.postGif(req, res, next, Chat));

module.exports = router;