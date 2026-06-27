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

        await axios.post("http://13.60.213.121:5000/submittodoitem", params);

        res.send("✅ Data sent to backend successfully!");
    } catch (error) {
        console.error("ERROR:", error.message);
        res.send("❌ Error connecting backend: " + error.message);
    }
});

app.listen(3000, "0.0.0.0", () => {
    console.log("Frontend running on port 3000");
});