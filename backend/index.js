const express = require("express");
const cors = require("cors");
const mainRouter = require("./routes/index");




const app = express();

app.use((req, res, next) => {
  res.setHeader("Cross-Origin-Opener-Policy", "same-origin-allow-popups");
  res.setHeader("Cross-Origin-Embedder-Policy", "require-corp"); // Optional but recommended for security
  next();
});
app.use(cors());
app.use(express.json());


app.use("/api/v1",mainRouter);  

app.listen(3000);

