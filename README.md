# Al Amin Schools Frontend.

This project is live at [Al Amin Schools](https://al-amin.onrender.com).

This application serves as a comprehensive solution for managing student and employee information within a school environment. With features designed for both public-facing information and secure portals for students and employees, this app provides a seamless experience for all users.

## Features
- **Public Page**:
  - Accessible to anyone visiting.
  - Provides general school information.
  - Login portals for students and employees.
- **Student Portal**:
  - Secure login for authorized students.
  - View class, details and results.
  - Access academic standing after results are processed.
- **Employee Portal**:
  - Secure login for authorized employees (including class teachers).
  - View assigned student lists.
  - Upload student results for each subject.
- **Backend API**:
  - Provies login authorization and role based access/authentication for employees.
  - Manages user accounts (student and employee) creation.
  - Handles result upload and editing by admins or only class teachers of a class.
  - Calculates student grades and academic standing based on uploaded results.
  - Utilizes Redux RTK Query for efficient data fetching and caching.
    
## Getting Started

1. **Installation:** Clone the repository to your local machine.

   ```bash
   git clone https://github.com/Okunola11/al-amin-frontend
   
2. **Dependencies:** Install the required dependencies using npm or yarn.
   ```bash
   npm install
   ```
    Or
   ```bash
   yarn install
   ```
3. **Run the App:** Start the development server.
   ```bash
   npm start
   ```
    Or
   ```bash
   yarn start
   ```
4. **Access:** Access the app via your web browser at http://localhost:3000.

## Technologies Used
  - React.js
  - Redux Toolkit for state management
  - Redux RTK Query for data fetching and caching
  - HTML/CSS for styling

## Configuration

- **Backend API**: Ensure that the backend API endpoints are correctly configured in the frontend application. Update the API URLs in the `.env` file if necessary.
- **MongoDB**: Set up MongoDB database and configure the connection details in the backend server files.

## Usage

1. Open the application in your web browser.
2. Navigate through the public-facing pages for general information.
3. Log in to the appropriate portal as a student or employee.
4. Perform actions such as viewing class details, uploading results, and viewing grades.

## Contributing

Contributions are welcome! If you'd like to contribute to this project, please follow these steps:

1. Fork the repository.
2. Create a new branch: `git checkout -b feature-branch`
3. Make your changes and commit them: `git commit -am 'Add new feature'`
4. Push to the branch: `git push origin feature-branch`
5. Submit a pull request.



---
© 2024 Al Amin Schools. All Rights Reserved.

 
