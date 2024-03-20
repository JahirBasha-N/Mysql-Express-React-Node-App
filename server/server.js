const { log } = require("console");
const express = require("express");
const cors = require("cors");
// const service = require("./service");
const studentRouter = require("./router/student");
const staffRouter = require("./router/staff");
// const adminRouter = require("./router/admin");

const app = express();
const { json } = express;

app.use(json());
app.use(cors());

app.use("/students", studentRouter);
app.use("/staff", staffRouter);
// app.use("/admin", adminRouter);

app.listen(8080, () => {
  log("node connected to localhost:8080");
});
