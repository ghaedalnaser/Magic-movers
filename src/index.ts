import * as  express from "express";
import { Request, Response, NextFunction } from "express";
import * as createError from "http-errors";
import { HttpError } from "http-errors";
import { StatusCodes } from "http-status-codes";
import { cors } from "./lib.cors";
import { connectMongoDB } from "./lib.mongoose";
import { apiRoutes } from "./routes";
const app = express();

/**
 * connect to database
 * */
connectMongoDB();

app.use(cors);

/**
 * 100mb on body instead of  100kb
 * */ 

app.use(express.json({ limit: 100 * 1024 * 1024 }));
app.use(apiRoutes);

/**
 * Create Errors and send it 
 * to  error handling middleware
 *  */ 
app.use((req: Request, res: Response, next: NextFunction) => {
  throw createError(StatusCodes.NOT_IMPLEMENTED, "Not implemented");
});

/**
 *  Global error handling middleware
 * */ 
app.use(
  (error: HttpError, req: Request, res: Response, next: NextFunction) => {
    console.log(error);
    const code =  error.StatusCodes || StatusCodes.INTERNAL_SERVER_ERROR;
    const message  = code===StatusCodes.INTERNAL_SERVER_ERROR?"Server Error":error.message;
    res.status(code).json({
      code,
      data:{error : error.errors},
      message:message,
      error: error.message || message
    }) 
  }
);

/**
 * start the Express Server
 * */
 app.listen(3000, () => {
  console.log(`Server started successfully at http://localhost:`,3000);
});

