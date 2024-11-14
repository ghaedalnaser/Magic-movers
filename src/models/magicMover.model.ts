import mongoose from "mongoose";

export interface ImagicMover{
    name:string;
    weightLimit:number;
    currentWeight: number; 
    questState : 'resting' | 'loading' | 'on-mission';
    missionCount: number;  
    items: mongoose.Types.ObjectId[];
}

const magicMoverSchema =  new mongoose.Schema<ImagicMover>({
    name: { type: String, required: true },  
    weightLimit: { type: Number, required: true },  
    currentWeight: { type: Number, default: 0 },  
    questState: { type: String, enum: ['resting', 'on-mission'], default: 'resting' },  
    missionCount: { type: Number, default: 0 },  
    items: [{ type: mongoose.Schema.Types.ObjectId, ref: 'MagicItem' }],  
}
)

export const MagicMover = mongoose.model<ImagicMover>('MagicMover',magicMoverSchema);