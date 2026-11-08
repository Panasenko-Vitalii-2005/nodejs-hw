import "dotenv/config";
import express from "express";
import cors from "cors";
import pinoHttp from "pino-http";

const app = express();
const PORT = Number(process.env.PORT) || 3000;

app.use(cors());
app.use(express.json());
app.use(pinoHttp());

app.get("/notes", (req, res) => {
  res.status(200).json({
    message: "Retrieved all notes",
  });
});

app.get("/notes/:noteId", (req, res) => {
  const { noteId } = req.params;

  res.status(200).json({
    message: `Retrieved note with ID: ${noteId}`,
  });
});

app.get("/test-error", () => {
  throw new Error("Simulated server error");
});

// 404: маршрут не найден
app.use((req, res) => {
  res.status(404).json({
    message: "Route not found",
  });
});

// 500: обработка ошибок
app.use((err, req, res, next) => {
  req.log.error(err);

  if (res.headersSent) {
    return next(err);
  }

  res.status(500).json({
    message: err.message,
  });
});

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server is running on port ${PORT}`);
});
