const multer = require('multer')
const path = require('path')



// Upload image


const MIME_TYPES = {
    'image/jpg': 'jpg',
    'image/jpeg': 'jpg',
    'image/png': 'png'
};

const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, './public/caetgory');
    },
    filename: (req, file, callback) => {


        callback(null, Date.now()+ path.extname(file.originalname));

    }
});

    const fileFilter = (req, file, cb) => {
        if (file.mimetype == 'image/jpg' || file.mimetype == 'image/jpeg' || file.mimetype == 'image/png' || file.mimetype == 'image/gif') {
            cb(null, true);
        } else {
            cb(null, false);
        }
    }
    const upload = multer({ storage: storage,fileFilter: fileFilter, limits: { fileSize: 100000000 }  }).single('Image');



module.exports ={upload}