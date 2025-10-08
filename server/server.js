const express = require("express");
const app = express();
const cors = require("cors");


app.use(cors());
app.use(express.json());


app.use("/authentication", require("./routes/jwtAuth"));

app.use("/dashboard", require("./routes/dashboard"));
app.use("/registration", require("./routes/registration"));
app.use("/postquestion", require("./routes/postQuestion"));
app.use("/projects", require("./routes/projects"));

app.listen(5000, () => {
  console.log(`Server is starting on port 5000`);
});
