const express = require('express');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const path = require('path');
const session = require('express-session');
const flash = require('connect-flash');
const ColorHash = require('color-hash');
require('dotenv').config();
const helmet = require('helmet');
const hpp = require('hpp');
const connect = require('./schemas');

const webSocket = require('./socket');
const urls = require('./urls');
const indexRouter = require('./routes');

const app = express();
connect();

// Socket.IO에서 세션에 접근하기 위한 미들웨어
const sessionMiddleware = session({
    resave: false,
    saveUninitialized: false,
    secret: process.env.COOKIE_SECRET,
    cookie: {
        httpOnly: true,
        secure: false,
    },
});

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
app.set('port', process.env.PORT || 8002);

process.env.NODE_ENV === 'production' ? (
    app.use(morgan('combined')),
    app.use(helmet()),      // 헤더 설정 변경, 웹 취약성 보완
    app.use(hpp())          // http parameter pollution attack 방지
 ) : app.use(morgan('dev'));

app.use(express.static(path.join(__dirname, 'static')));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(session({
    resave: false,
    saveUninitialized: false,
    secret: process.env.COOKIE_SECRET,
    cookie: {
        httpOnly: true,
        secure: false,
    },
}));
app.use(flash());

// 세션에 컬러값이 없으면 새로 부여
app.use((req, res, next) => {
    if (!req.session.color) {
        const colorHash = new ColorHash();
        req.session.color = colorHash.hex(req.sessionID);
    }
    next();
});

app.use(urls.home, indexRouter);

app.use((req, res, next) => {
    const err = new Error('Not Found');
    err.status = 404;
    next(err);
});

app.use((err, req, res, next) => {
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
    res.status(err.status || 500);
    res.render('error');
});

const server = app.listen(app.get('port'), () => {
    console.log(app.get('port'), '번 포트 대기중...');
});

webSocket(server, app, sessionMiddleware);