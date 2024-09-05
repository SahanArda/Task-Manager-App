# Task Manager
desc

## TechStack
- __Backend__: NodeJs NestJs MongoDB
- __Frontend__: ReactJS Bootstrap Sass
- __Libraries/Tools__:
    - bcrypt hashes passwords to protect sensitive user data. 
    - helmet is middleware that adds various HTTP headers to secure your Express application by protecting against common web vulnerabilities.
    - jsonwebtoken is a library for generating and verifying JSON Web Tokens (JWTs).
    - cors used to control and secure cross-origin HTTP requests, allowing or restricting access to resources based on specified policies
    - Bootstrap for components.

## Project Structure
The project has these key components
- __`Client`__: Contains all the frontend side of the project.
- __`Server`__: Contains all the backend side of the project.

## Functionality
- __Routes:__
    - __`/books`__: Contains information about books and endpoint to retrieve books
    - __`/users`__: Contains all the information and operations related to the users such as login and register
 
## How to Run Project
### Backend
  - Navigate to __`Server`__

  1. Install dependencies

   ```sh
   npm install
   ```

  2. Start Server
  
   ```sh
   npm run start:dev
   ```
### Frontend
  - Navigate to __`Client`__

  1. Install dependencies

   ```sh
   npm install
   ```

  2. Start Frontend
  
   ```sh
   npm run dev
   ```

## Environment Variables

For this project, you need to set the following environment variables:

- **`PORT`:** Specify the port on which the server will run. Default is 3000.
- **`MONGODB_URI`:** The URI for connecting to your MongoDB database.
- **`JWT_TOKEN`:** Used for securing JSON Web Tokens (JWTs) in your authentication system. It should be a secret key shared between your server and the authentication provider to sign and verify JWTs.

You can create a `.env` file in the project root and define these variables there. Make sure not to commit your `.env` file to version control.

```env
PORT=3000
MONGODB_URI="Link to your mongodb database"
JWT_TOKEN=value
```

## Features to implement:
- __Search Functionality:__
    - Allow users to quickly search for another user.
- __Pagination:__
    - Implement pagination to prevent users from continuously scrolling.
- __Forgot Password:__
    - Allow users to recover or change their password.
- __Filter:__
    - Create a filter system which allows users to filter the posts and search for a specific type of project.
