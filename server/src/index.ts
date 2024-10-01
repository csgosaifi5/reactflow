import express, { Request, Response, NextFunction } from "express";
import http from "http";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import cors from "cors";

// Load environment variables
dotenv.config();

const port = process.env.PORT || 3056;
const app = express();

// Middlewares
app.use(bodyParser.urlencoded({ extended: true, limit: "20mb" }));
app.use(bodyParser.json({ limit: "20mb" }));

// Route imports
import NodesRoute from "./routes/nodeFlow.route";


// MongoDB connection
mongoose.connect(
  `mongodb://${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`);

mongoose.connection.on("connected", () => {
  console.log("Connected to MongoDB database");
});

mongoose.connection.on("error", (err: Error) => {
  console.log("Error at MongoDB: " + err.message);
});

// CORS configuration
app.use(
  cors({
    credentials: true,
    origin: [process.env.FRONTEND_BASE_URL!, process.env.ADMIN_PANEL_BASE_URL!],
  })
);


// Routes
app.use("/flows", NodesRoute);


// Error handling middleware
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  if (err.status) {
    res.status(err.status).send(err);
  } else {
    res.status(404).json(err);
  }
});

// Server creation
const server = http.createServer(app);

server.listen(port, () => {
  console.log(`Server is starting at ${port}`);
});
