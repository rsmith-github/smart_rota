## Overview

Smart Rota is a comprehensive, non-industry-specific rota-management platform designed to streamline time management and enhance communication between management and team members. It addresses common challenges in shift management, such as memory lapses and inaccuracies in shift timings, by empowering employees to request changes to their rotas and enabling managers to approve these requests efficiently.

![demo gif](/frontend/src/static/smart-rota.gif)

## Distinctiveness and Complexity

Harvard CS50W - Web Programming with Python and Javascript requires this capstone project to be distinctive from other projects in the course, and more complex. Thus, a project that is a social network or an e-commerce site will not pass. Smart Rota is neither a social network or a e-commerce site, nor does it mimic any of the other projects including Search, Wiki, or Mail. This project is a general-purpose SaaS platform for rota management, and solves a problem seen in companies that still use paper to clock in and clock out. In terms of complexity, the minimum requirement is that there should be one Django model, but this project has six. Furthermore, the project uses React/Redux for user authentication state management, which is not required for previous projects, but is more complex. Furthermore, a significant amount of time was spent on implementing smooth animations for better UX, as well as a built-from-scratch data visualisation components for visualising rota times. Lastly, the app is mobile responsive on every page, which is shown in the screencast.

  _Custom data visualisation component_:
  <br>
  <img src="frontend/src/static/data-visualisation.png" style="width: 70%; text-align:center; margin-left: auto; margin-right: auto;" />

## Features

### Landing Page

- A welcoming interface introducing users to the system.
- Interactive elements and animations for an engaging user experience.

### User Profiles

- Distinct roles for managers and employees within a company.
- Managers can set and edit rotas.
  Employees can request changes to closed rotas.

### Company Server

- A unique server for users of the same company to interact.
- Secure and isolated environment for each company.

### Sign-Up Process

- Users provide a unique code to join a specific work environment.
- Streamlined process to guide users to their respective homepages.

### Dashboard

- Centralized area for accessing various functionalities.
- Visual representations and summaries of rotas and requests.

### Timetable

- Detailed view of individual and team rotas.
- Interactive interface for easy understanding of shift schedules.

### Messaging System

- Platform for communication between managers, employees, and colleagues.
- Facilitates seamless coordination and information sharing.

### Shift Change Requests

- Employees can submit requests for rota changes.
- Managers receive notifications and can approve or decline requests.

### Technology Stack

Frontend: React, Redux for state management, Framer Motion for animations.
Backend: Django, providing robust and secure server-side functionality.

## Getting Started

To get started with Smart Rota, clone the repository and follow the setup instructions for both frontend (React) and backend (Django) environments.

## Prerequisites

Node.js and npm
Python and Django

## Installation

- Clone the repository.
- Navigate to the frontend directory and install dependencies:
  `npm install`

## Start the React server:

### Dev

- `npm run dev`

### Prod

- `npm run build`
- Open localhost:8000

## Run the Django server.

- Navigate to the backend directory and set up the Django environment.

- run `python3 manage.py runserver`

## License

This project is licensed under the MIT License.
