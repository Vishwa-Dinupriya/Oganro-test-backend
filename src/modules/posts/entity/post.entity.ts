import { Table, Column, Model, DataType, ForeignKey, BelongsTo, AutoIncrement } from 'sequelize-typescript';

@Table
export class Post extends Model<Post> {
    @AutoIncrement
    @Column({
        type: DataType.INTEGER,
        primaryKey: true,
        allowNull: false,
        field: "id"
    })
    id: number;
    
    @Column({
        type: DataType.TEXT,
        allowNull: false,
        field: "title"
    })
    title: string;

    @Column({
        type: DataType.TEXT,
        allowNull: false,
        field: "body"
    })
    body: string;

    
    @Column({
        type: DataType.STRING,
        allowNull: true,
        field: "image_url"
    })
    image_url: string;

    @Column({
        type: DataType.INTEGER,
        allowNull: true,
        field: "like_count"
    })
    like_count: number;

    @Column({
        type: DataType.INTEGER,
        allowNull: true,
        field: "dislike_count"
    })
    dislike_count: number;
}