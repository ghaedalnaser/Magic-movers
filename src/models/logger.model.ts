import mongoose from 'mongoose';  

export interface ILogger extends Document {  
    moverId: mongoose.Types.ObjectId;  
    action: string;  
    payload?: string;  
    timestamp: Date;  
}  

const LoggerSchema: mongoose.Schema = new mongoose.Schema({  
    moverId: { type: mongoose.Schema.Types.ObjectId, ref: 'MagicMover', required: true },  
    action: { type: String, required: true },  
    payload: { type: String },  
    timestamp: { type: Date, default: Date.now }  
});  

export const Logger = mongoose.model<ILogger>('Logger', LoggerSchema);