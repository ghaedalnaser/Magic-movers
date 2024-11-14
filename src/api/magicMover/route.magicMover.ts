import { Router } from 'express';  
import { createMover, endMission, listMissions, loadMover, startMission } from './functions.magicMover';

/**
 * magicItem Router
 */
export const magicMoverRouter = Router(); 

magicMoverRouter.route('/createMover').post(createMover);
magicMoverRouter.route('/loadMover').post(loadMover);
magicMoverRouter.route('/:moverId/startMission').put(startMission);
magicMoverRouter.route('/:moverId/endMission').put(endMission);
magicMoverRouter.route('/missions').get(listMissions);


