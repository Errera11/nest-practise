import {Table, Column, DataType, Model, BelongsToMany, BelongsTo, HasMany} from 'sequelize-typescript';
import {UserRoles} from "../roles/user-roles.model";
import {Role} from "../roles/roles.model";
import {Post} from "../posts/posts.model";

interface UserCreation {
    email: string,
    password: string
}

@Table({tableName: 'users'})
export class User extends Model<User, UserCreation>  {

    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true })
    id: number;

    @Column({type: DataType.STRING, allowNull: false, unique: true})
    email: string;

    @Column({type: DataType.STRING, allowNull: false, unique: false})
    password: string;

    @Column({type: DataType.BOOLEAN, allowNull: true, unique: false, defaultValue: false})
    banned: boolean;

    @Column({type: DataType.STRING, allowNull: true, unique: false})
    banReason: string

    @BelongsToMany(() => Role, () => UserRoles)
    roles: Role[]

    @HasMany(() => Post)
    posts: Post[]
}