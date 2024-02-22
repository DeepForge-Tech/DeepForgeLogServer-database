const db = require("./Database")
const express = require("express")
const bodyParser = require('body-parser');
const app = express()

app.use(bodyParser.json());

app.post("/insert", async function (req, res) {
    try {
        if (req.body["data"] && req.body["table"]) {
            await db.insertToDatabase(req.body["data"],req.body["table"]);
            res.sendStatus(200);
        }
    } 
    catch (error) {
        console.log(error);
        res.send(400).json({message:"Not Found"});
    }
})
app.get("/wake_up_db", async function (req, res) {
    try {
        await db.WakeUpDatabase();
        res.sendStatus(200);
    }
    catch (error) {
        console.log(error);
        res.send(400).json({message:"Not Found"});
    }
    
})
app.post("/find", async function (req, res) {
    try {
        if (req.body["data"] && req.body["table"]) {
            const record = await db.findFromDatabase(req.body["data"],req.body["table"]);
            if (record != 400 && record != null)
            {
                res.json({"record": record,"answer":"exists"});
            }
            else
            {
                res.json({"answer":"not exists"});
            }
        }
    } 
    catch (error) {
        console.log(error);
        res.send(400).json({message:"Not Found"});
    }
})
app.post("/find_all_records", async function (req,res) {
    try {
        if (req.body["table"]) {
            const records = await db.findAllFromDatabase(req.body["table"]);
            if (records != 400 && records.lenght > 0)
            {
                res.json({"records": records,"answer":"exists"});
            }
            else
            {
                res.json({"answer":"not exists"});
            }
        }
    }
    catch (error)
    {
        console.error(error);
        res.send(400).json({message:"Not Found"});
    }
})

app.listen(process.env.DB_SERVICE_PORT || 5001, async function () {
    console.log("Database service is running.")
})