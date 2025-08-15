import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import methodOverride from "method-override";
import { connectDB } from "./db.js";
import playersRouter from "./routes/players.js";
import dotenv from "dotenv";
dotenv.config();

const app = express();
const __dirname = path.dirname(fileURLToPath(import.meta.url));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "..", "public")));
app.use(methodOverride("_method"));

app.get("/", (req, res) => res.render("index"));
app.use("/players", playersRouter);

const PORT = process.env.PORT || 3000;
connectDB()
  .then(() => {
    app.listen(PORT, () => console.log(`🚀 http://localhost:${PORT}`));
  })
  .catch((err) => {
    console.error("DB Error:", err);
    process.exit(1);
  });
