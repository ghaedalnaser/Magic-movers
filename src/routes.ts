import { Router } from "express";
import { magicItemRouter } from "./api/magicItem/route.magicItem";
import { magicMoverRouter } from "./api/magicMover/route.magicMover";

export const apiRoutes: Router = Router();

apiRoutes.use('/mover',magicMoverRouter);
apiRoutes.use('/item',magicItemRouter);