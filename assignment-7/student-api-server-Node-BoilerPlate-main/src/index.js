const express = require('express')
const app = express()
const bodyParser = require("body-parser");
const port = 8080
const data = require("./InitialData.js")
var studentid = data.length
console.log(data)
app.use(express.urlencoded());
// Parse JSON bodies (as sent by API clients)
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
// your code goes here
app.get("/api/student",(req,res)=>{
    res.json(data)
})
app.get("/api/student/:id",(req,res)=>{
    console.log(req.params.id)
    const index = data.findIndex(element=>element.id==req.params.id)
    if(index >= 0){
        const student = data[index]
        res.json(student)
    }
    else{
        res.json({
            status: "400",
            message : "id not found"
        })
    }
})
app.post("/api/student",(req,res)=>{
     studentid++
     data.push({
           id : studentid,
            name : req.body.name,
            currentClass : req.body.currentClass,
            division: req.body.division
     })
    res.json({studentid})
})
app.delete("/api/student/:id",(req,res)=>{
    const index = data.findIndex(element=>element.id==req.params.id)
    if(index in data){
       const student = data.splice(index,1)
        res.json({data})
    }
})
app.put("/api/student/:id",(req,res)=>{
    const index = data.findIndex(element=>element.id==req.params.id)
    if(index in data){
        const out = data[index]
        out.id = req.body.id,
        out.name = req.body.name,
        out.currentClass = req.body.currentClass,
        out.division = req.body.division,
        res.json({out})
    }
})
app.listen(port, () => console.log(`App listening on port ${port}!`))
module.exports = app;