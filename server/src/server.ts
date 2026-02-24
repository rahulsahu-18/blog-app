import dotenv from 'dotenv'
dotenv.config();

import express from "express";
import cors from "cors";
import cookieParser from 'cookie-parser';
import { connectDB } from "./config/db.connect";
import adminRoutes from "./routes/adminRoutes";
import blogRouter from "./routes/blogRouter";

const app = express();
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH"]
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use('/admin',adminRoutes);
app.use('/blog',blogRouter);

app.get("/", (req, res) => {
  res.json({message:"TS Server running 🚀"});
});

app.listen(process.env.PORT || 5000, () => {
   connectDB();
  console.log(`Server running on port ${process.env.PORT || 5000}`);
});
