import { MagicItem } from "../../models/magicItem.model";
import { Response, Request } from "express";

/** 
 * insert a new item 
 * */ 
export const createItem = async (req: Request, res: Response)=> {
  try {
    const mover = await insertMagicItem(req.body);
        res.status(201).json(mover);
  } catch (error) {
        res.status(400).json({ message: error });
  }
};

/** 
 * get all items
 * */ 
export const  getAllItems =  async (req:Request , res :Response)=>{
  try {
      const items =  await  getMagicItems();
      res.status(200).json(items)
  } catch (error) {
      res.status(400).json({ message: error });  
      
  }
}

//-------------------------------------------------------

export const getMagicItems = async()=>{    
  const items =  await MagicItem.find({})
  return  items ;
}

export const insertMagicItem = async (data: any) => {
  const magicMover = new MagicItem(data);
  return await magicMover.save();
};
