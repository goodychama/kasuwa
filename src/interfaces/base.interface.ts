// Define the interface with basic CRUD methods
export interface IBaseService<T> {
    getById(id: string): Promise<T | null>;
    get(): Promise<T[]>;
    delete(id: string): Promise<T>;
}