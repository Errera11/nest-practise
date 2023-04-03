import {Column, DataType, ForeignKey, Model, Table} from "sequelize-typescript";
import {Role} from "./roles.model";
import {User} from "../users/users.model";


@Table({tableName: 'user_roles'})
export class UserRoles<UserRoles> extends Model{

    @Column({type: DataType.INTEGER, primaryKey: true, autoIncrement: true})
    id: number;

    @ForeignKey(() => User)
    @Column({type: DataType.INTEGER, allowNull: false})
    userId: number;

    @ForeignKey(() => Role)
    @Column({type: DataType.INTEGER, allowNull: false})
    roleId: number;

}