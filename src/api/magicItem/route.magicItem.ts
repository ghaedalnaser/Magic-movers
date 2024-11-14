import { Router } from 'express';  
import { createItem, getAllItems } from './functions.magicItem';  

/**
 * magicItem Router
 */
export const magicItemRouter = Router();  

magicItemRouter.route('/createItem').post(createItem);  
magicItemRouter.route('/getAllItems').get(getAllItems);