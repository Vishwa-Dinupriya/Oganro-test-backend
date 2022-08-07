export interface IRepository<M>{
    save(model: M): Promise<M>;
    // findById(id: string): Promise<M>;
    getAll(): Promise<M[]>;
    deleteById(id: number): Promise<number>;
    findByIds(ids: string[]): M[];
    deleteByIds(ids: string[]): void;
}