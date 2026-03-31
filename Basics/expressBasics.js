const express = require("express"); //importing express to js 
const app = express(); //express = blueprint, app = actual server
app.use(express.json()); //Convert incoming API JSON into Javascript 
const PORT = 3000; //tells server which port to run on 
/*development servers - 3000
APIs - Server - 5000
Web Apps - 8080
*/
//temporary database, which will typically be stored in MongoDB or PostgreSQL
//array of objects
let flights =[
{
    flightNumber: "6E132",
    from:"Chennai",
    to:"Mumbai",
    aircraft:"VT-ANZ",
    delay:0
}
];
//first API endpoint
//app.get = Fetch data the "\"indicates homepage, req= request, res= response
//request contains - Userdata, Parameters, Headers and body. Usage of arrow => is a modern javascript function 
app.get("/",(req,res)=>{
    res.send("THIS IS THE NEW SERVER");
});
//second route from the server 
app.get("/flights",(req,res)=>{
    res.json(flights); //res.json sends data and not text 
});
//buidling a POST API 
app.post("/flights",(req,res)=>{
    const newFlight = req.body;
    flights.push(newFlight);
    res.json({
        message: "Flight added successfully",
        data:newFlight
    });
}); //Client sends data to server and then body contains the JSON data sent to the API
//app.listen is for starting the server 
app.listen(PORT,()=>{
    console.log("Server running on port"+PORT);
});



