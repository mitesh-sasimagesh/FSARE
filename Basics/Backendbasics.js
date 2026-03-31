const express = require("express");
const app = express();
const PORT = 3000;
app.get("/",(req,res)=>{
    res.send("Airline Disruption Management System Backend running");
});
app.listen(PORT,()=>{
    console.log('Server running on port 3000');
});
