import express from "express";
import urlRoutes from "./routes/url.routes";
import { errorHandler } from "./middlewares/error-handler.middleware";

const app = express();

app.use(express.json());
app.use("/", urlRoutes);
app.use(errorHandler);

export default app;
