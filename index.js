import compression from "compression";
import express from "express";
import request from "request";
import fs from "fs";
import path from "path";

const app = express();
const port = process.env.PORT || 8080;
const vcap_services = process.env.VCAP_SERVICES;
app.use(compression());
app.enable("trust proxy");

fs.writeFileSync(
  `./env.js`,
  `var VCAP_SERVICES = ${process.env.VCAP_SERVICES};`
)

app.use(express.static("./build"));
app.use(express.static("./env.js"))

app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "build", "index.html"));
});

app.listen(port, err => {
    if (err) {
        console.log(err);
        return;
    }
    console.log(`App and API are live at http://localhost:${port}`);
    console.log(`VCAP_SERVICES ARE: ${vcap_services}`)
});
