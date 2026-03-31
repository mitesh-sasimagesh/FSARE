const express = require("express");
const axios = require("axios");
const app = express();
app.use (express.json());
const PORT = 3000;
//use only ICAO Codes
let flights = [{
    flightNumber: "6E311",
    from: "VOMM",
    to: "VOBL",
    delay: 0,
    aircraft: "VT-ANQ"
}];
app.get("/", (req, res) => {
res.json({
message: "Day 3 backend is running",
flights: flights
});
});
app.get("/flightsDashboard", async (req, res) => {
  try {
    const result = [];

    for (const flight of flights) {
      const fromAirport = await axios.get(
        `https://airportsapi.com/api/airports/ICAO/${flight.from}`
      );

      const toAirport = await axios.get(
        `https://airportsapi.com/api/airports/ICAO/${flight.to}`
      );

      result.push({
        ...flight,
        fromAirportName: fromAirport.data.name,
        toAirportName: toAirport.data.name
      });
    }

    res.json(result);
  } catch (error) {
    res.status(500).json({ error: "Airport lookup failed" });
  }
});
app.post("/includeFlights", async (req, res) => {
    try {
        const { flightNumber, from, to, aircraft, delay } = req.body;

        // Call airport API - only using ICAO codes
        const fromAirport = await axios.get(`https://airportsapi.com/api/airports/${from}`);
        const toAirport = await axios.get(`https://airportsapi.com/api/airports/${to}`);

        const newFlight = {
            flightNumber,
            fromCode: from,
            fromName: fromAirport.data.name,
            toCode: to,
            toName: toAirport.data.name,
            aircraft,
            delay
        };

        flights.push(newFlight);

        res.json({
            message: "Flight added with airport data",
            data: newFlight
        });

    } catch (error) {
        res.json({
            message: "Error fetching airport info"
        });
    }
});
app.get("/flights/:flightNumber",(req,res)=>{
    const flightNumber = req.params.flightNumber;
    const flight = flights.find(f=> f.flightNumber === flightNumber);
    if(!flight){
        return res.json({
            message: "Flight not found"
        });
    }
    res.json(flight);
});
app.delete("/flights/:flightNumber", (req, res) => {
    const flightNumber = req.params.flightNumber.trim().toUpperCase();

    const index = flights.findIndex(
        f => f.flightNumber.toUpperCase() === flightNumber
    );

    if (index === -1) {
        return res.json({
            message: "Flight not found"
        });
    }

    const removedFlight = flights.splice(index, 1);

    res.json({
        message: "Flight removed successfully",
        removedFlight
    });
});
app.listen(PORT, ()=>{
    console.log("Back-end working successfully and project is now on.");
    console.log("Backend server on PORT: "+PORT);
});
