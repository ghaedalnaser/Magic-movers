import { Request, Response } from "express";
import { MagicItem } from "../../models/magicItem.model";
import { Logger } from "../../models/logger.model";
import { MagicMover } from "../../models/magicMover.model";

/**
 * Add a new Magic Mover 
*/

export const createMover = async (req: Request, res: Response) => {
  try {
    const mover = await insertMagicMover(req.body);
    res.status(201).json(mover);
  } catch (error) {
    res.status(400).json({ message: error });
  }
};

/**
 * Load a MagicMover with items
*/

export const loadMover = async (req: Request, res: Response) => {
  const { moverId, itemIds } = req.body;
  try {
    // get a specific mover
    const mover = await getMagicMover(moverId);
    if (!mover) {
      res.status(404).json({ Message: "Mover not found" });
      return;
    }
    // find items
    const items = await MagicItem.find({ _id: { $in: itemIds } });
    if (!items.length) {
      res.status(404).json({ Message: "items not found" });
      return;
    }
    // check mover's weightlimit
    const totalWeight = items.reduce((sum, item) => sum + item.weight, 0);
    if (totalWeight + mover.currentWeight > mover.weightLimit) {
      res.status(400).json({ message: "oops : Exceeds weight limit" });
      return;
    }
    mover.items.push(...itemIds);
    mover.currentWeight += totalWeight;
    await mover.save();

    // create loading activity after success loading operation
    await Logger.create({
      moverId: mover._id,
      action: "load",
      payload: itemIds.join(", "),
    });
    res.status(200).json(mover);
  } catch (error) {
    res.status(400).json({ message: error });
  }
};

/**
 * strat a Mission
 * */

export const startMission = async (req: Request, res: Response) => {
  const { moverId } = req.params;
  try {
    const mover = await getMagicMover(moverId);
    if (!mover) {
      res.status(404).json({ message: "Mover not found" });
      return;
    }
    if (mover.questState === "on-mission") {
      res.status(400).json({ message: "Already on a mission" });
      return;
    }

    mover.questState = "on-mission";
    mover.missionCount += 1;
    await mover.save();

    // Log mission start activity
    await Logger.create({ moverId: mover._id, action: "start-mission" });

    res.status(200).json(mover);
  } catch (error) {
    res.status(400).json({ message: error });
  }
};

/**
 * end Mission
 * */
export const endMission = async (req: Request, res: Response) => {
  const { moverId } = req.params;

  try {
    const mover = await MagicMover.findById(moverId);
    if (!mover) {
      res.status(404).json({ message: "Mover not found" });
      return;
    }
    if (mover.questState === "resting") {
      res.status(400).json({ message: "Not on a mission" });
      return;
    }

    // Unload items
    mover.currentWeight = 0;
    mover.items = [];
    mover.questState = "resting";
    await mover.save();

    // Log mission end activity
    await Logger.create({ moverId: mover._id, action: "end-mission" });

    res.status(200).json(mover);
  } catch (error) {
    res.status(400).json({ message: error });
  }
};

/**
 * list missions stored by mission count
*/

export const  listMissions =  async (req:Request , res :Response)=>{
  try {
      const items =  await  missionSort();
      res.status(200).json(items)
  } catch (error) {
      res.status(400).json({ message: error });  
      
  }
}

//----------------------------------
export const insertMagicMover = async (data: any) => {
  const magicMover = new MagicMover(data);
  return await magicMover.save();
};

export const getMagicMover = async (id: any) => {
  const mover = await MagicMover.findById(id);
  return mover;
};

export const missionSort = async () => {
  return await MagicMover.find().sort({ missionCount: -1 });
};
