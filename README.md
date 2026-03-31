FSARE: Flight Scheduling and Recovery Engine

FSARE is a backend system that simulates how airline flight operations behave when delays occur. It is the first core module of a larger system called ADMS (Airline Disruption Management System).

Problem Statement 

Airlines do not operate flights independently. In real world airline operations, a single aircraft performs multiple flights in sequence throughout the day. This sequence is known as an aircraft rotation.

Example:

Aircraft VT-ANQ
	1.	Chennai to Bangalore
	2.	Bangalore to Delhi
	3.	Delhi to Mumbai

If the first flight gets delayed, the aircraft arrives late at the next airport. This reduces the turnaround time, which is the time required to prepare the aircraft for the next departure (boarding, refueling, checks, etc.).

Because of this, delays begin to propagate across the schedule.

Flight delay propagation:

Flight 1 delayed
1. Aircraft arrives late
2.  Flight 2 departs late
3.   Flight 3 also gets delayed

This is known as a cascading delay or a domino effect in airline operations. Managing such disruptions is a major challenge for airline operations control centers.

Modern airlines use complex systems to monitor aircraft rotations, detect disruptions, and recover schedules. However, building a simplified simulation of this logic helps understand how airline operations work behind the scenes.

Project Objective

FSARE is designed to simulate and demonstrate how delays impact connected flights that share the same aircraft.

The system currently focuses on:
	•	Managing flight records
	•	Tracking aircraft assigned to flights
	•	Recording delays
	•	Fetching airport information
	•	Providing API endpoints to interact with the system

This project acts as the core scheduling engine that will later support advanced disruption management features.

Current Features (Version 1)
	•	Node.js and Express backend
	•	REST API for managing flights
	•	Flight delay tracking
	•	Airport lookup integration
	•	Basic simulation of airline flight operations

Future Scope

FSARE will evolve into a more advanced scheduling and recovery engine as part of the ADMS platform. Future versions will include:
	•	Aircraft rotation simulation
	•	Flight timing and turnaround modeling
	•	Disruption impact analysis
	•	Aircraft reallocation logic
	•	Airport-based aircraft availability
	•	Schedule recovery strategies

Project Vision

This project is part of a larger system:

ADMS — Airline Disruption Management System

The goal is to build a multi-module aviation operations platform that can simulate real airline scheduling challenges and recovery strategies.

FSARE is the first step toward building that system. 
