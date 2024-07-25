import mongoose, { Schema } from 'mongoose';
import { IFile } from '../interfaces/interface';

const fileSchema = new Schema<IFile>({
    data: { type: Schema.Types.Mixed },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
});

const File = mongoose.model<IFile>('File', fileSchema);

export default File;
