# VanMap
Sprint 9. Route calculator.

## Introduction
VanMap is a web application for calculating caravan travel routes. Allows users to create custom routes with origin, destination and intermediate stops, as well as save favorite routes and locations in their profile.

## Features
- Firebase Authentication: Register and log in securely.
- Route calculation: Find routes between origin and destination, with the option of adding intermediate stops.
- Location management: ​​Save your favorite routes and locations to your profile.
- Modern and fast frontend: Developed with React + Vite, styled with TailwindCSS.
- Efficient API consumption: Axios for request management and Firestore as a real-time database.
- Smooth navigation: React Router DOM for a dynamic user experience.

## Requirements

To run this project, make sure you have the following tools installed:

- Node.js (version 14 or higher)
- npm (version 6 or higher)
- React (compatible versions with the code)
- React Router DOM (v6 or higher)
- Tailwind CSS (version 2 or higher)
- Firebase and Firestore (for authentication and data storage)
- Access to the Mapbox API (for route visualization and calculation)
- Modern browser (Google Chrome, Firefox, etc.)

## Technologies Used

- **React + Vite**
- **Tailwind CSS**
- **React Router**
- **Axios**
- **Mapbox**

## Instructions

### 1. Clone the repository

First, clone the repository to your local machine:

```bash
git clone https://github.com/Naomigarcia99/VanMap.git
cd VanMap
```

### 2. Install dependencies

```bash
  npm install
```

### 3. Configure Environment Variables

- Create an .env file in the project root and add your Mapbox credentials:
```bash
VITE_MAPBOX_ACCESS_TOKEN=Enter your token here
```
- Create a file called credentials.js in the project base with your firebase configuration.

- ### 4. Run the aplication

To start the application, use the following command:
```bash
 npm run dev
```
