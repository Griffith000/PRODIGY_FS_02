# Employee Management System

This project is an Employee Management System built with a React frontend and a Node.js backend using Express and Sequelize ORM for PostgreSQL. The system allows for managing employee data, including creating, updating, and deleting employee records.

## Features

- **Employee Management**: Add, update, and delete employee records.
- **Authentication**: Secure login and token verification.
- **Database Integration**: Uses PostgreSQL for data storage.
- **File Uploads**: Supports profile image uploads using Firebase Storage.
- **Responsive Design**: Frontend built with React and Tailwind CSS for a responsive user interface.
- **Data Visualization**: Uses Chart.js for visualizing employee data.
  
## Tech Stack

**Client:** React, Redux, TailwindCSS , Vite

**Server:** Node, Express , Sequelize ,PostgreSQL

## Environment Variables

To configure the environment variables for the project, follow these steps:

1. Create a `.env` file in the root directory of the project and in the root of the `frontend` folder.
2. Add the following environment variables to the `.env` file:

### ./frontend
`VITE_FIREBASE_API_KEY`
`VITE_AUTH_DOMAIN`
`VITE_PROJECT_ID`
`VITE_STORAGE_BUCKET`
`VITE_MESSAGING_SENDER_ID`
`VITE_APP_ID`

### ./

`DATABASE_URL`
`JWT_SECRET`
`ADMIN_EMAIL`
`ADMIN_PASSWORD`



