import { UserSchema } from "../Models/Users";
import { Request, Response } from "express";
import bcrypt from "bcrypt";
import { sequelizeInstance } from "../Sequalize_Setup";

export const addUser = async (req: Request, res: Response) => {
  try {
    let user = req.body;
    user.password = await bcrypt.hash(user.password, 10);
    await UserSchema.create(user);
    res.status(201).json({ msg: "User added successfully" });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

// get all users
export const getAllUsers = async (req: Request, res: Response) => {
  try {
    const itemsPerPage: number = 10;
    let min: number = 0;
    if (!req.query.min) min = 0;
    else min = Number(req.query.min);
    const offSet = min * itemsPerPage;
    const srcUsers = await sequelizeInstance.query(
      `select id,name,email from users order by id desc limit ${itemsPerPage} offset ${offSet}`,
      {
        model: UserSchema,
        mapToModel: true,
      }
    );
    res.status(200).json({
      data: srcUsers,
      hasNext: srcUsers.length === itemsPerPage,
      hasPrevious: min > 0,
    });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const getUserById = async (req: Request, res: Response) => {
  try {
    const id: string = req.params.id;
    const user = await UserSchema.findByPk(id);
    if (user) {
      res.status(200).json(user);
    } else {
      res.status(404).json({ msg: "User not found" });
    }
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteUserById = async (req: Request, res: Response) => {
  try {
    const user = await UserSchema.findOne({
      where: {
        id: req.params.id,
      },
    });
    if (user) {
      await UserSchema.destroy({
        where: {
          id: req.params.id,
        },
      });
      res.status(200).json({ msg: "User deleted successfully" });
    } else {
      res.status(404).json({ msg: "User not found" });
    }
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const updateUser = async (req: Request, res: Response) => {
  try {
    await UserSchema.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
    return res.status(201).json({ message: "User updated success" });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};
