import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import tripRouter from "./routes/tripRouter";
import userRouter from "./routes/userRouter";
import { COOKIE_SECRET_KEY } from "./config/env";
import expensesRouter from "./routes/expensesRouter";
import { express as useragent } from "express-useragent";
import { errorHandler } from "./middleware/errorHandler";
import { agenda } from "./agenda";

const app = express();
const PORT = 3000; // this port is for out api.

//Middleware
app.use(
  cors({
    origin: process.env.LOCALHOST_ORIGIN,
    credentials: true,
  }),
); // Allows your React app (usually on port 3000 or 5173) to talk to this server
app.use(express.json()); // Allow server to read json.
app.use(useragent());
app.use(cookieParser(COOKIE_SECRET_KEY));

app.use("/api/authenticate", userRouter);

// Routes
app.use("/api/trips", tripRouter);
app.use("/api/expense", expensesRouter);
app.use(errorHandler);

app.listen(PORT, async () => {
  await agenda.start();
  console.log(`Server is running on http://localhost:${PORT}`);
});
