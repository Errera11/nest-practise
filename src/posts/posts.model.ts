import {BelongsTo, Column, DataType, ForeignKey, Model, Table} from "sequelize-typescript";
import {User} from "../users/users.model";

interface CreationAttr {
    title,
    description,
    image,
    userId
}
@Table({tableName: 'Posts'})
export class Post extends Model <Post, CreationAttr>{

    @Column({type: DataType.INTEGER, autoIncrement: true, primaryKey: true})
    id: number;
    @Column({type: DataType.STRING})
    title: string;
    @Column({type: DataType.STRING})
    description: string;
    @Column({type: DataType.STRING})
    image: string;
    @ForeignKey(() => User)
    @Column({type: DataType.INTEGER, allowNull: false})
    userId: number
    @BelongsTo(() => User )
    author: User
}