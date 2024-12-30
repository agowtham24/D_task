import {
  Model,
  InferAttributes,
  InferCreationAttributes,
  DataTypes,
} from "sequelize";
import { sequelizeInstance } from "../Sequalize_Setup";

export interface Users
  extends Model<InferAttributes<Users>, InferCreationAttributes<Users>> {
  id?: number;
  password: string;
  name: string;
  email: string;
}
export const UserSchema = sequelizeInstance.define<Users>(
  "users",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    timestamps: true,
  }
);
