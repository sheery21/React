import express from "express";
<<<<<<< HEAD
import { adminControllers, deleteComplaint, deleteUser, getAllBanks, getAllBanks_Officer, getAllUsers } from "../controllers/adminControllers.js";
=======
import { adminControllers } from "../controllers/adminControllers.js";
<<<<<<< HEAD
>>>>>>> a7e41c4afed9386cb055a56215291b3a58524627
=======
>>>>>>> a7e41c4afed9386cb055a56215291b3a58524627
import { adminAuth } from "../middleware/adminAuth.js";

const adminRouter = express.Router();

adminRouter.get("/getComplaints/", adminAuth, adminControllers);
<<<<<<< HEAD
<<<<<<< HEAD
adminRouter.post("/deleteComplaints/:id", adminAuth, deleteComplaint);
adminRouter.get("/getAllusers", adminAuth, getAllUsers);
adminRouter.get("/getAllBank_officer", adminAuth, getAllBanks_Officer);
adminRouter.delete("/user/:type/:id", adminAuth, deleteUser);
adminRouter.get("/getAllBanks", adminAuth, getAllBanks);
=======
>>>>>>> a7e41c4afed9386cb055a56215291b3a58524627
=======
>>>>>>> a7e41c4afed9386cb055a56215291b3a58524627

export default adminRouter;
