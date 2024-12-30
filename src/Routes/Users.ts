import { Router } from "express";
import {
  addUser,
  updateUser,
  getAllUsers,
  getUserById,
  deleteUserById,
} from "../Controllers/Users";
import { UserValidator } from "../Validators/Users";

const userRouter = Router();
userRouter.post("/", UserValidator.createUser, addUser);
userRouter.get("/", getAllUsers);
userRouter.get("/:id", getUserById);
userRouter.put("/:id", UserValidator.updateUser, updateUser);
userRouter.delete("/:id", deleteUserById);

export default userRouter;
