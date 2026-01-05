import multer from "multer";
import fs from "fs";

const storage = multer.diskStorage({
  destination: (req, file, cd) => {
    if (!fs.existsSync("./uploads/")) {
      fs.mkdir("./uploads/", (err, res) => {
        cd(false, "./uploads/");
      });
    } else {
      cd(false, "./uploads/");
    }
  },
  filename: (req, file, cd) => {
    const filename = `${new Date().getTime()}-${file.originalname}`;
    cd(false, filename);
  },
});

export const upload = multer({ storage: storage });
