export interface IStructure {
    [key: string]: any;
}
export interface IFile extends Document {
    data: Record<string, any>;
    createdAt: Date;
    updatedAt: Date;
}
