import { Schema, model } from 'mongoose';  

export interface ImagicItem {  
    name: string;  
    weight: number;  
}  

const magicItemSchema = new Schema<ImagicItem>({  
    name: { type: String, required: true },  
    weight: { type: Number, required: true }  
});  

export const MagicItem = model<ImagicItem>('MagicItem', magicItemSchema);