import { Table, Column, Model, DataType, ForeignKey, BelongsTo, AutoIncrement } from 'sequelize-typescript';

@Table
export class Post extends Model<Post> {
    @AutoIncrement
    @Column({
        type: DataType.INTEGER,
        primaryKey: true,
        allowNull: false,
    })
    id: number;
    
    @Column({
        type: DataType.TEXT,
        allowNull: false,
    })
    title: string;

    @Column({
        type: DataType.TEXT,
        allowNull: false,
    })
    body: string;

    
    @Column({
        type: DataType.STRING,
        allowNull: true,
    })
    image_url: string;

    @Column({
        type: DataType.INTEGER,
        allowNull: true,
    })
    like_count: number;

    @Column({
        type: DataType.INTEGER,
        allowNull: true,
    })
    dislike_count: number;
}