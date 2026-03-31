const express = require("express");
const app = express();
app.use(express.json());
const PORT = 3000;
let flights = [
    {
        fno: "6E421",
        from: "Chennai",
        to: "Mumbai",
        aircraft:"VT-ABC",
        delay: 0
    }
    ,{
        fno: "AI213",
        from: "Dubai",
        to: "Kolkata",
        aircraft: "VT-AIX",
        delay: 4
    }
]; //array of flights ends
app.get("/",(req,res)=>{
    res.send("The new practice backend server is now working");
});
//this is to get the information regarding the flights 
app.get("/flights",(req,res)=>{
    res.json(flights);
});
//to get the total number of flights 
app.get("/total-flights",(req,res)=>{
    res.json(flights.length);
});
//post API 
app.post("/bulk-flights",(req,res)=>{
    const newFlight = req.body;
    flights.push(newFlight);
    res.json({
        message: "Flight added successfully",
        data:newFlight
    });
});
//creating a route to find a specific flight 
app.get("/flights/:fno",(req,res)=>{
    const flightNumber = req.params.fno;
    const flight = flights.find(f=> f.flightNumber === fno);
    if(!flight){
        return res.json({
            messgae: "Flight not found"
        });
    }
    res.json(flight);
});
//Change delay
app.post("/delay", (req, res) => {
    const { flightNumber, delay } = req.body;

    const flight = flights.find(f => f.flightNumber === flightNumber);

    if (!flight) {
        return res.json({
            message: "Flight not found"
        });
    }

    flight.delay = delay;

    res.json({
        message: "Delay updated successfully",
        updatedFlight: flight
    });
});
//code to start server 
app.listen(PORT,()=>{
    console.log("Practice server ON, and running");
});

