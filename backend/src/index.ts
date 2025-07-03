import express from "express";
import dotenv from "dotenv";
import userRoutes from "./routes/user";
import bookRoutes from "./routes/book";
import { logRequests } from "./middlewares/logger";

dotenv.config();

const PORT = process.env.PORT;

const app = express();

//middlewares
app.use(express.json());
app.use(logRequests);


//auth routes
app.use("/api", userRoutes)

//book routes
app.use("/api/books", bookRoutes);

//handles unknown path requests
app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});

//entry point
app.listen(PORT, () => console.log(`Server running on ${PORT}`)
)