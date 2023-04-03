import {BelongsToMany, Column, DataType, Model, Table} from "sequelize-typescript";
import {User} from "../users/users.model";
import {UserRoles} from "./user-roles.model";

interface CreateAttrs {
    value: string,
    description: string
}
@Table({tableName: 'roles'})
export class Role extends Model<Role, CreateAttrs>{
    @Column({type: DataType.INTEGER, primaryKey: true, autoIncrement: true})
    id: number;
    @Column({type: DataType.STRING, unique: true})
    value: string;
    @Column({type: DataType.STRING})
    description: string;
    @BelongsToMany(() => User, () => UserRoles)
    users: User[]
}