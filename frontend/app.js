const express = require("express");
const bodyParser = require("body-parser");
const axios = require("axios");

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("views"));

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/views/form.html");
});

app.post("/submit", async (req, res) => {
    try {
        const params = new URLSearchParams();
        params.append("itemName", req.body.itemName);
        params.append("itemDescription", req.body.itemDescription);

        const url = "http://localhost:5000/submittodoitem"

        console.log("URL =", JSON.stringify(url));

        await axios.post(url, params);

        res.send("Success");
    } catch (error) {
        console.error(error);
        res.send(error.message);
    }
});

app.listen(3000, "0.0.0.0", () => {
    console.log("Frontend running on port 3000");
});