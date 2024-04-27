# Overview

Smart Rota is a comprehensive, non-industry-specific rota-management platform designed to streamline time management and enhance communication between management and team members. It addresses common challenges in shift management, such as memory lapses and inaccuracies in shift timings, by empowering employees to request changes to their rotas and enabling managers to approve these requests efficiently.

![demo gif](/frontend/src/static/smart-rota.gif)

# Distinctiveness and Complexity

Smart Rota stands out from other projects in the course by providing a specialized solution for workforce management. This project does not replicate the functionality of any prior projects such as Search, Wiki, or Mail, ensuring it meets the distinctiveness criterion set by CS50W.

- **Models and Backend**: While the course requires at least one Django model, Smart Rota incorporates five distinct models and one user manager class, each serving a unique aspect of rota management. This architectural structure supports a robust backend necessary to provide complex business solutions.
- **Frontend Technologies**: The frontend utilizes React coupled with Redux for state management. This setup, particularly the use of Redux for managing authentication states, introduces a level of complexity not required in earlier projects.
- **User Interface**: Special attention has been given to the user interface, with smooth animations and custom-built data visualization components. These elements enhance the overall user experience by providing intuitive and visually engaging interactions.

  _Custom data visualisation component_:
  <br>
  <img src="frontend/src/static/data-visualisation.png" style="width: 70%; text-align:center; margin-left: auto; margin-right: auto;" />

- **Mobile Responsiveness**: Consistent with the requirements, Smart Rota is fully responsive across all devices. The mobile-first design approach ensures accessibility and usability, which is demonstrated in the accompanying screencast.

### Conclusion:

Smart Rota is designed with the goal of not only fulfilling but exceeding the requirements of the CS50W capstone project. It introduces new technologies and complex functionalities that set it apart from simpler web applications, thereby addressing a real-world problem with a scalable and innovative web solution.

# Files

## Backend

**/smart_rota/urls.py:**

This file configures the URL routing for the Smart Rota Django project, defining patterns that route requests to appropriate views. It includes routes for Django's admin interface, JWT authentication (obtain, refresh, verify tokens), and serving the `manifest.json` for web app features, alongside the primary application routes from `main.urls`.

**/main/urls.py:**

This file defines the URL patterns for the 'main' app in the Smart Rota project, routing various endpoints to their corresponding views. It includes paths for user authentication (login, logout), user registration for different roles (employer, employee, company), and rota management functions such as viewing and updating timetables, handling shift change requests, and retrieving team data.

**/main/utils.py:**

This utility file contains a function `check_message_duplicates` which checks for duplicate entries in the `Messages` and `TimeTable` models based on user details and shift times. This function is used to prevent the submission of redundant shift requests, enhancing data integrity within the application.

**/main/views.py:**

This file encapsulates all the view logic for the Smart Rota application, handling both web and API requests. It includes functions for user login, logout, registration, and various APIViews to manage company registration, team data retrieval, shift updates, and handling shift change requests. Each class and function is equipped to interact with the application's models using Django's ORM and handle HTTP requests, providing responses suitable for both web and API clients. The views also implement user authentication checks and data serialization to ensure secure and efficient data handling.

**/main/models.py:**

This file defines the data models for the application, extending Django's built-in user model and introducing custom models tailored to the application's needs.

1. **User**: Customized from `AbstractUser`, this model adds `employer_code` and `user_type` fields to facilitate role-based and company-specific functionalities.
2. **Company**: Represents companies with unique names and codes, enabling distinct access and management within the platform.
3. **MyUser**: An alternative user model that uses email as the primary identifier, managed by `UserAccountManager`, supporting both regular and superuser creation.
4. **TimeTable**: Stores shift schedules for users, including employer association, shift times, and dates, ensuring schedules are maintained per company and user.
5. **Messages**: Handles intra-application messaging and requests, such as shift changes, storing sender and receiver details, message types, and related scheduling information.

These models are crucial for managing users, companies, and operational data like schedules and communications within the application.

**/main/admin.py:**

This file configures the Django admin interface, registering the `User` and `Company` models to make them accessible through the admin panel. This allows for easy management and administration of these entities within the Django admin site.

**/main/apps.py:**

Defines the `MainConfig` class, which configures settings specific to the 'main' application, such as its name and the default field type for automatically generated primary keys.

**/main/serializers.py:**

Contains serializers for the `User`, `Company`, `TimeTable`, and `Messages` models, facilitating the conversion of model instances into JSON format and vice versa for API operations. This includes a `RegisterSerializer` for user registration, enforcing password validation and handling user creation.

**/main/tests.py:**

Provides test cases for various views within the 'main' application using Django's testing framework. This file includes tests for user authentication processes (login and logout), viewing the index page, and other functionalities such as team retrieval, ensuring that each component behaves as expected.

## Frontend

### Root

**/frontend/src/App.jsx:**

This file serves as the main React component for the application, setting up the routing and global state management using React Router and Redux. It configures routes for various pages like the homepage, team, messages, dashboard, and user registration, and integrates a dynamic navigation bar and footer based on the user's current route, while also handling user authentication checks on initial load.

**/frontend/src/App.jsx:**

This CSS file establishes the visual design for the application, setting styles for the HTML structure, navigation, and responsive layouts across various devices. It incorporates animations, media queries, and a flexible layout to ensure the application is visually appealing and functional on all screen sizes.

**/frontend/src/store.js:**

This file sets up the Redux store for the application, integrating `redux-persist` to manage state persistence across sessions using local storage. It specifically configures persistence for user-related data, including authentication status, and enables Redux DevTools in development environments.

**/frontend/src/static:**

This directory contains all the images used for the frontend. It serves as a centralized repository for static resources like icons, backgrounds, and logos, ensuring they are efficiently managed and easily accessible throughout the app.

### Pages

**/frontend/src/pages/homepage.jsx:**

This file defines the Homepage component for the application, using React and Redux to manage access based on authentication status. If a user is not authenticated, they are redirected to the login page. The homepage includes animated elements for welcoming users and showcasing the application's features, utilizing `framer-motion` for smooth animations and `@splinetool/react-spline` for interactive 3D models.

**/frontend/src/pages/dashboard.jsx:**

This file contains the Dashboard component of the application, which checks user authentication and loading state using Redux. If a user is not authenticated, they are redirected to the login page, while a loading state triggers a loading screen. The dashboard includes components for both the top and bottom sections, organized in a layout with a sidebar for navigation, providing a comprehensive view of user-specific dashboard data.

**/frontend/src/pages/login.jsx**

This component manages the login functionality, leveraging Redux for state management and responsive design for varying screen sizes. It displays an animated form, processes user login data, and redirects authenticated users to the homepage.

**/frontend/src/pages/messages.jsx**

Handles the display of change requests related to shift schedules. It fetches and formats these requests asynchronously and updates the UI accordingly. The component uses Redux for state management and includes conditional rendering based on authentication and loading states.

**/frontend/src/pages/notfound.jsx**
It appears you’ve mentioned a file "notfound.jsx" but provided the content under a different name. Please clarify or provide the correct file content if you need a description.

**/frontend/src/pages/register-company.jsx**

This component provides a form for registering a company, handling form submissions to a server endpoint and displaying responses such as a generated company code. It uses animations for transitions and matches for responsive design considerations.

**/frontend/src/pages/register-employee.jsx**

Manages the registration process for employees. It includes form handling that submits employee data to the server and updates the UI based on the registration status. The component is responsive, adjusting its layout based on the screen size.

**/frontend/src/pages/register-manager.jsx**

Similar to RegisterEmployee but tailored for manager registrations, this component handles form submissions for registering managers, updating the UI based on responses and incorporating responsive design for better usability across devices.

**/frontend/src/pages/rota.jsx**

Focused on displaying weekly schedules, this component allows users to navigate through weeks and view shifts. It fetches shift data based on the current week and handles user interactions with animations and dynamic content loading.

**/frontend/src/pages/team.jsx**

Displays a list of team members and their schedules. It includes functionality to fetch team data and manage visibility of detailed schedules. The component also handles user authentication and loading states, ensuring data is displayed appropriately.

### Components

**/frontend/src/components/dashboard-bottom.jsx:**

This component displays a line chart visualization of hours worked each month using the Recharts library. It is designed to offer insights into work trends over the year and includes features like tooltips and legends for better data comprehension, making it an integral part of the dashboard's bottom section.

**/frontend/src/components/date-div.jsx:**

This component handles the display and interaction with individual date entries, allowing for viewing and modifying shift requests. It integrates animations for a dynamic user interface and provides functionalities such as accepting changes for managers and requesting shift changes for employees, reflecting updates in real-time.

**/frontend/src/components/footer.jsx:**

The Footer component provides a structured display of company information, links, and other resources. It is divided into sections for solutions, quick links, and other relevant content, ensuring easy navigation and access to important areas of the application, all styled consistently with the rest of the site.

**/frontend/src/components/hour-blocks.jsx:**

This component dynamically generates visual representations of hourly blocks for shift timings. It adjusts the appearance based on shift changes and displays color-coded blocks to indicate different states like active, changed, or idle hours, enhancing the user's ability to track shifts visually.

**/frontend/src/components/loading-screen.jsx:**

The LoadingScreen component offers a visual indicator during data fetching or processing phases, utilizing a circular loading icon from the `react-loading-icons` library. It ensures users are aware of ongoing operations, improving the interface's responsiveness and user experience.

**/frontend/src/components/member-card.jsx:**

MemberCard is a component designed to display key information about a team member. It shows the member's username and email and can be interacted with to view detailed schedules or perform management tasks, supporting different styles for roles like manager or employee for immediate role recognition.

**/frontend/src/components/navbar.jsx:**

NavBar manages the navigation across the application, featuring responsive design to adjust to different screen sizes. It provides links to various pages and handles user authentication states to toggle between guest and authenticated user links, enhancing site navigation and usability.

**/frontend/src/components/screenshot-section.jsx:**

This component showcases key features or screens of the application using images. It uses motion effects for transitions, providing an engaging visual display that highlights the application's user interface and functionalities in a marketing or presentation context.

**/frontend/src/components/sidebar.jsx:**

AppSidebar facilitates navigation within the application, particularly in dashboard contexts. It displays different navigation options based on the user's role and screen size, and includes interactive icons and links for efficient access to various application sections, adjusting dynamically to user status and device.

**/frontend/src/components/timeline.jsx:**

Timeline visually represents shift timings within a specific date context, using nested HourBlocks components to depict individual hours. It reacts to changes in shift times, providing a graphical overview that helps users quickly grasp schedule details and changes.

**/frontend/src/components/timeRow.jsx:**

TimeRow component allows for detailed input and adjustment of shift times using a time picker interface. It supports both morning and evening shifts, providing interactive elements to adjust start and end times, which helps in precise scheduling within the application.

**/frontend/src/components/timetable-skeleton.jsx:**

This component serves as a placeholder or skeleton screen for the Timetable component, displaying a static or loading state while the actual timetable data is being fetched, improving the user's perception of loading times and system responsiveness.

**/frontend/src/components/timetable.jsx:**

TimeTable manages the display and interaction with a user's weekly schedule. It allows for editing and saving of shift times, offers a week-by-week navigation, and integrates with backend APIs to fetch and update timetable data, providing comprehensive management of work schedules.

### Helpers

**/frontend/src/heplers/calculate-time-attrs.js:**

This JavaScript function `calculateTimeAttributes` is designed to manipulate and interpret time attributes for shift handling. It dynamically adjusts time properties based on the hour within a day, managing specific cases like the start or end of shifts with conditional logic, making it essential for scheduling applications.

**/frontend/src/heplers/convert-to-24hr.js:**

The `convertTo24HourFormat` function converts a given hour into a 24-hour format string, ensuring all hours are properly formatted for displays and logs. This function is particularly useful in applications where time needs to be displayed or processed in a standardized format.

**/frontend/src/heplers/convertId.js:**

`convertId` simplifies date strings from a standard format like '09-01-25' to a more compact '9-1-25', removing unnecessary zeros. This function is beneficial for handling and displaying dates in a cleaner, more efficient manner within user interfaces.

**/frontend/src/heplers/format-date.js:**

The `formatDate` function transforms a date string into a more structured object, providing formatted strings for day, month, year, and the day of the week. It's useful for any part of a system that requires human-readable date representations or needs to perform operations based on these date components.

**/frontend/src/heplers/format-time.js:**

`formatTime` parses a time range string into an object detailing the start and end times in a block format based on a predefined work schedule. This function supports the visualization and management of work shifts by converting standard time inputs into more granular, actionable data segments.

**/frontend/src/heplers/handle-rota-change.js:**

This helper function manages updates to shift data, applying changes to either a list or a single object of shift times based on user interactions. It's crucial for applications requiring dynamic shift management and scheduling, ensuring that all changes are reflected accurately in real time.

**/frontend/src/heplers/rota-helpers.js:**

The `getDates` function generates a list of formatted date objects for a given week, enhancing calendar or scheduling features by providing ready-to-use date strings along with unique identifiers for each day, facilitating easy integration with other date-related functionalities in the application.

### Features

**/frontend/src/features/user.js:**

This JavaScript module handles user authentication in a Redux toolkit framework, including actions for registration, login, verification, and logout, with state management for user sessions and instructional insights derived from a tutorial by Bryan Brkic on YouTube.

# Features

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
- Managers are notified and can approve requests.

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

- Setup the Django environment in root directory by running `pip install -r requirements.txt` or `pipenv install -r requirements.txt` if you are using pipenv (recommended).

- run `python manage.py runserver` or `pipenv run python manage.py runserver` (recommended)

## License

This project is licensed under the MIT License.
