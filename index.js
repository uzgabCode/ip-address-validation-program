import express from "express";
import bodyParser from "body-parser";
import { isIP, version } from "range_check"

// Here are the const variables:
const app = express();
const port = 8080;

// Set variables to let:
let ip, isValid, v;

// For access to public css files:
app.use(express.static('public'));

// BodyParser:
app.use(bodyParser.urlencoded({ extended: true }));


// Using get method:
app.get("/", (req, res) => {
  res.render("index.ejs", {
    ipAddress: "No IP address indicated",
    ipValid: "N/A",
    ipVersion: "None"
  })
})

// Using post method:
app.post("/", (req, res) => {
  ip = req.body["ip"];
  isValid = isIP(ip);
  v = version(ip);

  if (!isValid) {
    res.render("index.ejs", {
      ipAddress: `Invalid! Please try again.`,
      ipValid: "No",
      ipVersion: `None`
    })
  } 
  
  else {
    res.render("index.ejs", {
      ipAddress: `${ip}`,
      ipValid: "Yes",
      ipVersion: `IPv${v}`
    })
  }
})

// Listening on port 8080:
app.listen(port, () => {
  console.log(`Listening on port ${port}.`);
})