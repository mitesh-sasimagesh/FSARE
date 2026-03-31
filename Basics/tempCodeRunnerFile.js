/*const express = require("express"); //importing express to js 
const app = express(); //express = blueprint, app = actual server
app.use(express.json()); //Convert incoming API JSON into Javascript 
const PORT = 4000; //tells server which port to run on 
/*development servers - 3000
APIs - Server - 5000
Web Apps - 8080
*/
//temporary database, which will typically be stored in MongoDB or PostgreSQL
//array of objects
/*let flights =[
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
//app.listen is for starting the server 
app.listen(PORT,()=>{
    console.log("Server running on port 3000");
});
*/

const express = require("express");

const app = express();

app.use(express.json());

const PORT = 3000;

app.get("/", (req, res) => {
  res.send("NEW SERVER RUNNING");
});

app.get("/flights", (req, res) => {
  res.json([
    {
      flightNumber: "6E132",
      from: "Chennai",
      to: "Mumbai"
    }
  ]);
});

app.listen(PORT, () => {
  console.log("FILE IS RUNNING");;
});