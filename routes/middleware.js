exports.checkUploads = (fs) => {
    fs.readdir('uploads', (error) => {
        if (error) {
            console.error('uploads 폴더가 없습니다. 폴더를 생성합니다.');
            fs.mkdirSync('uploads');
        }
    });
};

exports.makeMulter = (multer, path) => {
    console.log('called multer');
    return multer({
        storage: multer.diskStorage({
            destination(req, file, cb) {
                cb(null, 'uploads/');
            },
            filename(req, file, cb) {
                const ext = path.extname(file.originalname);
                cb(null, path.basename(file.originalname, ext) + Date.now() + ext);
            },
        }),
        limits: { fileSize: 5 * 1024 * 1024 },
    });
};