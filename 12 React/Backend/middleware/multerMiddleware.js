import fs from "fs";
import multer from "multer";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    console.log('req' ,req);
    
    if (!fs.existsSync("./uploads/")) {
      fs.mkdir("./uploads/", (err, res) => {
        cb(false, "./uploads/");
      });
    } else {
      cb(false, "./uploads/");
    }
  },
  filename: (req, file, cb) => {
    // console.log("file", new Date().getTime() + "-" + file.originalname);
    // console.log("file");
    const fileName = `${new Date().getTime()}-${file.originalname}`;
    cb(false, fileName);
  },
});

export const upload = multer({
  storage: storage,
});
