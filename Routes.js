const db = require("./Database")
const express = require("express")
const bodyParser = require('body-parser');
const app = express()

app.use(bodyParser.json());

app.post("/insert", async function (req, res) {
    try {
        if (req.body["data"] && req.body["table"]) {
            await db.InsertToDatabase(req.body["data"],req.body["table"]);
            res.sendStatus(200);
        }
    } 
    catch (error) {
        console.log(error);
        res.sendStatus(403);
    }
})
app.get("/wake_up_db", async function (req, res) {
    try {
        await db.WakeUpDatabase();
        res.sendStatus(200);
    }
    catch (error) {
        console.log(error);
        res.sendStatus(403);
    }
    
})
app.post("/find", async function (req, res) {
    try {
        if (req.body["data"] && req.body["table"]) {
            const user = await db.FindFromDatabase(req.body["data"],req.body["table"]);
            if (user != 400 && user != null)
            {
                res.json({"user": user,"answer":"exists"});
            }
            else
            {
                res.json({"answer":"not exists"});
            }
        }
    } 
    catch (error) {
        console.log(error);
        res.sendStatus(400);
    }
})

app.listen(process.env.DB_SERVICE_PORT || 5001, async function () {
    console.log("Database service is running.")
})