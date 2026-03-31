const express = require("express");
const axios = require("axios");

const app = express();
app.use(express.json());

const PORT = 3000;

//Example database just to see how exactly our code is working and performing 
let flights = [
  {
    flightNumber: "6E311",
    from: "MAA",
    to: "BLR",
    aircraft: "VT-ANQ",
    delay: 0
  },
  {
    flightNumber: "6E412",
    from: "BLR",
    to: "MAA",
    aircraft: "VT-ANQ",
    delay: 0
  }
];

//Server running check
app.get("/", (req, res) => {
  res.json({
    message: "FSARE Core Engine v1 Running"
  });
});

//Adding new flights - IATA codes only - due to airportgap.com/api/airports/{Airportcode} Takes only IATA codes and not ICAO codes
app.post("/addFlight", (req, res) => {
  try {
    const { flightNumber, from, to, aircraft } = req.body;

    if (!flightNumber || !from || !to || !aircraft) {
      return res.status(400).json({
        error: "Missing required flight information"
      });
    }

    const newFlight = {
      flightNumber,
      from,
      to,
      aircraft,
      delay: 0
    };

    flights.push(newFlight);

    res.json({
      message: "Flight added successfully",
      flight: newFlight
    });
  } catch (error) {
    res.status(500).json({
      error: "Failed to add flight"
    });
  }
});

//gets all flights 
app.get("/flights", async (req, res) => {
  try {
    const enrichedFlights = await Promise.all(
      flights.map(async (flight) => {
        let fromAirportName = "Unknown Airport";
        let toAirportName = "Unknown Airport";

        try {
          const fromAirport = await axios.get(
            `https://airportgap.com/api/airports/${flight.from}`
          );

          fromAirportName =
            fromAirport.data.data.attributes.name;
        } catch (err) {}

        try {
          const toAirport = await axios.get(
            `https://airportgap.com/api/airports/${flight.to}`
          );

          toAirportName =
            toAirport.data.data.attributes.name;
        } catch (err) {}

        return {
          ...flight,
          fromAirportName,
          toAirportName
        };
      })
    );

    res.json(enrichedFlights);
  } catch (error) {
    res.status(500).json({
      error: "Failed to fetch flights"
    });
  }
});

//Updates delays if any 
app.put("/updateDelay/:flightNumber", (req, res) => {
  try {
    const { flightNumber } = req.params;
    const { delay } = req.body;

    const flight = flights.find(
      (f) => f.flightNumber === flightNumber
    );

    if (!flight) {
      return res.status(404).json({
        error: "Flight not found"
      });
    }

    flight.delay = delay;

    res.json({
      message: "Delay updated",
      flight
    });
  } catch (error) {
    res.status(500).json({
      error: "Failed to update delay"
    });
  }
});

//Detect cascading delays and usage of the resolve engine 

app.post("/resolveDisruption", (req, res) => {
  try {
    const disruptedFlights = flights.filter(
      (f) => f.delay > 60
    );

    if (disruptedFlights.length === 0) {
      return res.json({
        message: "No disruptions detected"
      });
    }

    let impactReport = [];

    disruptedFlights.forEach((flight) => {
      const affectedFlights = flights.filter(
        (f) =>
          f.aircraft === flight.aircraft &&
          f.flightNumber !== flight.flightNumber
      );

      impactReport.push({
        disruptedFlight: flight.flightNumber,
        aircraft: flight.aircraft,
        affectedFlights: affectedFlights.map(
          (f) => f.flightNumber
        ),
        suggestion: "Consider aircraft reassignment"
      });
    });

    res.json({
      disruptionDetected: true,
      report: impactReport
    });
  } catch (error) {
    res.status(500).json({
      error: "Disruption analysis failed"
    });
  }
});

//Start servera

app.listen(PORT, () => {
  console.log(`FSARE Backend running on port ${PORT}`);
});