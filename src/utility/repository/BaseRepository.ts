import sequelize, { ModelStatic, Transaction } from "sequelize";
import { Post } from "src/modules/posts/entity/post.entity";
import { IRepository } from "./IRepository";

export class BaseRepository<T extends sequelize.Model> implements IRepository<T> {

    protected Model!: sequelize.ModelStatic<T>;

    constructor(Model: sequelize.ModelStatic<T>) {
        this.Model = Model;
    }

    
    async save(model: T, transaction: Transaction = null): Promise<T> {
        try {
            const savedDoc = await this.Model.create(model, { transaction });

            return savedDoc;
        } catch (ex: any) {
            throw ex;
        }
    }

    // async findById(id: string): Promise<T> {
    //     try {
    //         const doc = await this.Model.findOne({
    //             where: {
    //                 id: id
    //             }
    //         });
    //         if (!doc) {
    //             throw 'not found';
    //         }

    //         return doc;
    //     } catch (ex: any) {
    //         throw ex;
    //     }
    // }

    async getAll(): Promise<T[]> {
        try {
            return this.Model.findAll();
        }
        catch (ex: any) {
            throw ex;
        }
    }

    // deleteById(id: number): Promise<number> {
    //     throw new Error("Method not implemented.");
    // }

    async deleteById(id: number): Promise<number> {
        try {
            return await this.Model.destroy();
        } catch (ex: any) {
            throw ex;
        }
    }
    findByIds(ids: string[]): T[] {
        throw new Error("Method not implemented.");
    }
    deleteByIds(ids: string[]): void {
        throw new Error("Method not implemented.");
    }
    
}