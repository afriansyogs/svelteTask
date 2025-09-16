const multer = require('multer')
const path = require('path')
const fs = require('fs')

const getPath = (fileName) => {
  switch (fileName) {
    case 'userImg':
      return 'uploads/user'
    case 'taskImg':
      return 'uploads/task'
    default:
      return 'uploads/other'
  }
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const folder = getPath(file.fieldname);

    if (!fs.existsSync(folder)) {
      fs.mkdirSync(folder, { recursive: true });
    }

    cb(null, folder);
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname); 
  }
});

const fileFilter = (req, file, cb) => {
  const allowedExt = ['.png', '.jpg', '.jpeg'];
  const ext = path.extname(file.originalname).toLowerCase();

  if (allowedExt.includes(ext)) {
    cb(null, true);
  } else {
    cb(new Error('Format file tidak didukung. Hanya PNG, JPG, dan JPEG.'));
  }
};

const upload = multer({ storage, fileFilter });

module.exports = upload;