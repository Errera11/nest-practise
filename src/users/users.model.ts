import { Table, Column, DataType, Model } from 'sequelize-typescript';

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

    @Column({type: DataType.STRING, allowNull: true, unique: false, defaultValue: false})
    banned: boolean;

    @Column({type: DataType.STRING, allowNull: true, unique: false})
    banReason: string
}