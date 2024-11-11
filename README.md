# Road Assist

**Road Assist** is a fuel delivery application developed as a mini-project for the 6th semester. This application provides on-demand fuel delivery services to users facing fuel shortages, allowing them to request fuel delivery to their current location from nearby fuel stations.

### Table of Contents
- [Project Overview](#project-overview)
- [Features](#features)
- [Technology Stack](#technology-stack)
- [Installation](#installation)
- [Usage](#usage)
- [Future Enhancements](#future-enhancements)
- [Team Members](#team-members)
- [Screenshots](#screenshots)

---

## Project Overview

Vehicle breakdowns due to fuel shortages can happen unexpectedly, especially in unfamiliar areas. Road Assist helps users easily locate and request fuel from nearby stations, ensuring quick and reliable support. The app enables fuel stations to accept delivery requests based on fuel availability and partner resources, updating the user with real-time status changes until delivery completion. 

---

## Features

- **User Registration**: Users can register and add vehicle details.
- **Fuel Request**: Users can select the fuel type and quantity, and the nearest fuel stations are shown based on the user’s location.
- **Order Tracking**: Real-time status updates for fuel requests from the nearest available station.
- **Order History**: Completed orders are recorded in both user and fuel station profiles for future reference.
- **Pump Management**: Fuel stations can manage availability, accept or decline requests, and track order status.

---

## Technology Stack

- **Frontend**: React, Tailwind CSS
- **Backend**: Supabase
- **Database**: PostgreSQL
- **Mapping**: OpenStreetMap API,html5 geolocationapi

---

## Installation

### Prerequisites
- Node.js and npm installed on your system
- Supabase account setup

### Steps
(Note: If you are running this in your desktop or laptop inspect and view it on mobile dimensions)
1. **Clone the Repository**
   ```bash
   git clone https://github.com/your-repo/road-assist.git
   cd road-assist
   ```

2. **Install Dependencies**
     ```bash
     npm install
     ```


3. **Environment Setup**
   - Configure environment variables for Supabase in `.env` files for both frontend and backend.

4. **Run the Application**
      
     ```bash
     npm run dev
     ```

---

## Usage

1. **User Side**:
   - Register or log in to the app.
   - Give permission for location access.
   - Add vehicle details.
   - Select fuel type and quantity, then submit the request to a nearby fuel station.
   - Track the request status in real-time until completion.
   - View past orders in the history section.

2. **Fuel Station Side**:
   - Log in and set up pump details.
   - View incoming fuel requests, update availability status, and manage orders.
   - Accept requests based on fuel availability and partner resources.

---

## Future Enhancements

- **Geographical Expansion**: Extend service coverage to new regions.
- **Incentives for Delivery Partners**: Reward programs for high performance.
- **AI-Driven Route Optimization**: Enhance delivery speed and efficiency.
- **Diversified Services**: Include towing, emergency mechanical assistance, and tire replacement.

---

## Team Members

- Ann Maria Antony - [GitHub](https://github.com/AnnMariaAntony)
- Hisham Rashid - [GitHub](https://github.com/HishamRashid)
- Parveen Navas - [GitHub](https://github.com/ParveenNavas)
- Yadhu Krishnan B C - [GitHub](https://github.com/YBC2204)

---

## Report

This link contains all the details including schema design, ER diagram , Tech stacks and the screenshots of the project

[REPORT](https://drive.google.com/file/d/1VMWNii3GsfiUdyqWetveeCHDizG0ZQrN/view?usp=sharing)

---


