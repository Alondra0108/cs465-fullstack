# Travlr Getaways Full Stack Web Application

## Project Overview

Travlr Getaways is a full stack web application created using the MEAN stack: MongoDB, Express, Angular, and Node.js. The application includes a customer-facing website where visitors can view available trips and an administrative single-page application where authorized users can add, edit, and delete trip information. The final version also includes secure administrator authentication and protected API endpoints.

## Architecture

### Frontend Development

This project allowed me to work with different types of frontend development, including Express HTML templates, JavaScript, and an Angular single-page application. The customer-facing website uses Express with Handlebars templates to generate HTML on the server. When a customer opens the travel page, Express retrieves trip information from the API and renders the page with the current data. This approach works well for displaying public content because the server prepares a complete page before sending it to the browser.

JavaScript supports the application’s logic and communication between its different parts. It is used throughout the Express server, API controllers, database models, authentication system, and frontend services. The administrative side uses Angular to provide a single-page application. Unlike the customer-facing website, the SPA can update the interface and move between views without reloading an entirely new page each time. Angular components, services, routing, and reactive forms provide a more interactive experience for administrators who need to manage trip records.

The Express website and Angular SPA both display information from the same backend, but they serve different purposes. The Express website focuses on presenting information to customers, while the Angular SPA provides reusable components and interactive tools for authorized administrators.

### MongoDB Database

The backend uses MongoDB because it is a NoSQL database that stores information in flexible, document-based records. Trip data contains fields such as a trip code, name, length, start date, resort, price, image, and description. MongoDB stores these fields in a JSON-like structure that works naturally with JavaScript, Node.js, and the API.

MongoDB was also appropriate because the application did not require the complex relationships and tables commonly associated with a relational database. Mongoose provided a schema for validating the trip data before storing it. It also allowed the application to create, retrieve, update, and delete records efficiently. In the final version, trip codes are unique so that each record can be identified reliably.

## Functionality

### JavaScript and JSON

JavaScript is a programming language used to create application behavior and logic, while JSON is a text-based format used to represent and exchange data. Although JSON resembles the syntax of a JavaScript object, JSON does not contain programming instructions, functions, or application logic.

JSON connects the frontend and backend portions of the Travlr Getaways application. The backend retrieves trip records from MongoDB and returns them through the RESTful API as JSON. The Angular application sends HTTP requests to the API and converts the JSON responses into trip objects that its components can display. When an administrator adds or updates a trip, the SPA sends the form information to the backend in JSON format. This creates a consistent way for the frontend, API, and database layers to exchange information.

### Refactoring and Reusable Components

Throughout the project, I refactored the original static website into a full stack application. The travel page was changed from hard-coded HTML to a Handlebars template that displays trip records dynamically. I separated the server-side logic into models, views, controllers, and routes, which made the application more organized and easier to maintain. I also created API controllers for database operations instead of placing all of the logic in one file.

On the administrative side, I used an Angular service to manage API requests so that the individual components did not have to repeat the same communication logic. Authentication was also organized into separate services, a route guard, and an HTTP interceptor. The interceptor automatically adds the authentication token to protected requests, while the route guard prevents unauthenticated users from opening administrative forms.

The trip card is an example of a reusable UI component. Instead of writing the same layout for every trip, the trip listing passes each trip record to the same card component. Reusable components reduce repeated code, provide a consistent appearance, and make future changes easier because one component can be updated instead of changing every instance separately. Components also make the application easier to test, debug, and expand.

## Testing

A full stack application uses HTTP methods and API endpoints to perform different operations. In this project, `GET` requests retrieve all trips or one trip identified by its code. `POST` creates a new trip, `PUT` updates an existing trip, and `DELETE` removes a trip. An endpoint is the specific API address that receives one of these requests. For example, `/api/trips` handles the trip collection, while `/api/trips/:tripCode` works with an individual trip.

Testing required more than confirming that a page appeared in the browser. I tested whether each endpoint returned the expected data and an appropriate HTTP status code. Positive testing confirmed that valid requests could create, retrieve, update, and delete database records. Negative testing included missing information, nonexistent trip codes, duplicate trip codes, and requests without authorization. I also verified that the customer-facing website could retrieve and display information from the API.

Security added another layer to the testing process. The administrator submits login credentials to the authentication endpoint. After successful authentication, the server creates a JSON Web Token, and the Angular application includes that token in requests to protected endpoints. Adding, updating, and deleting trips requires a valid token, while public trip information remains available without authentication. Testing therefore included valid login credentials, invalid credentials, missing tokens, and authenticated requests. This process helped me understand that frontend controls alone are not enough. The backend must also protect sensitive operations because someone could attempt to contact an API endpoint without using the application’s interface.

## Reflection

This course helped me move closer to my professional goals by giving me experience developing a complete application instead of working with only one part of a system. Before completing this project, I understood individual concepts such as HTML, JavaScript, databases, and APIs, but this course showed me how those technologies communicate in a full stack environment. Building both the customer-facing website and administrative SPA helped me better understand the responsibilities of the frontend and backend.

I developed stronger skills in Express, Node.js, Angular, MongoDB, RESTful APIs, JSON, reusable components, reactive forms, and database operations. I also gained practical experience with authentication, JSON Web Tokens, protected endpoints, testing, debugging, and GitHub version control. One of the most valuable lessons was learning how to divide a large application into smaller components, services, routes, controllers, and models that can be developed and tested separately.

These skills make me a more marketable candidate because I can now explain and demonstrate how a full stack application is designed, secured, tested, and maintained. I also have a completed portfolio project that shows my ability to build an application through multiple stages, respond to problems, improve the code, and connect the user interface to a secure database-backed API.
