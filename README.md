# TopRestaurant

![Top Restaurant 1](https://lh3.googleusercontent.com/d/1RXElI694I-yzJCrVeOXfZIPO6A29peFc)
![Top Restaurant 2](https://lh3.googleusercontent.com/d/1S1RowUGmlYH1acdEEP17Xl_zhyXubt-C)
![Top Restaurant 3](https://lh3.googleusercontent.com/d/12u3dFEUBzBQUA5SB_lrLqf88JQc5f_YH)

Top Top Restaurants is a mobile web application that redefines the dining experience by allowing users to discover nearby restaurants as if it were a social network, and easily manage reservations.

- [Website](https://toprestaurant-production.up.railway.app/)

## Overview
In my third project during the Ironhack web development bootcamp, I created a mobile web application that served as a social platform for exploring nearby restaurants, adding them to favorites, and accessing their menus and reservations.

## Features
- **Menu Management**: Easily create, update, and delete menu items.
- **Order Processing**: Manage orders in real-time.
- **Customer Reviews**: Collect and display customer reviews.
- **Reservation System**: Allow customers to make reservations online.
- **User Authentication**: Secure login and registration for users.
- **Dashboard**: Comprehensive dashboard for monitoring restaurant activities.

## 🛠️ Technologies Used
- **HTML5**: For structuring the web application.
- **CSS3**: For designing and laying out the interface.
- **JavaScript**: To create functionality and interactivity.
- **Node.js**: For server-side development.
- **Express.js**: For handling server and routes.
- **MongoDB**: As the database for storing restaurant, menu, and user data.
- **GitHub**: For version control and collaboration.
- **Bootstrap**: For responsive design and styling.

## 📦 Installation
To get a local copy up and running, follow these simple steps:

### Prerequisites
- Node.js installed
- npm installed

### Installation
1. Clone the repo
   ```sh
   git clone https://github.com/LuisEUM/TopRestaurant.git
   ```
2. Install NPM packages
   ```sh
   npm install
   ```
3. Run the application
   ```sh
   npm start
   ```

## API Usage

This section provides instructions on how to interact with the TopRestaurant API, including setup and usage of the provided Postman collection.

### Setting Up the API

Before you begin, ensure that you have the API running locally or deployed on a server. Follow the installation instructions provided in the previous sections to get the API up and running.

### Importing the Postman Collection

1. Download the `TopTop.json` file from the project repository. This file contains the Postman collection with pre-configured requests for the TopRestaurant API.
2. Open Postman and import the `TopTop.json` file by clicking on `File` > `Import...` and selecting the file from your computer.
3. Once imported, you will see a new collection named `TopRestaurant` in your Postman sidebar, containing various API requests.

### Configuring Environment Variables

The collection uses an environment variable `{{urlV1}}` to dynamically set the API's base URL. To configure this:

1. In Postman, click on the `Environments` tab on the left sidebar.
2. Create a new environment (e.g., `TopRestaurant Local`) and add a variable named `urlV1` with the value set to your API's base URL (e.g., `http://localhost:4001/api/v1/` for local development).
3. Select the environment you just created from the dropdown at the top right corner of Postman to activate it.

### Using the API Routes

The API provides several routes for managing restaurants, menus, bookings, and more. Here are some of the key routes:

- **Authentication**: Register, authenticate, and logout users.
- **Restaurants**: Create, update, and retrieve restaurant details.
- **Menus**: Manage restaurant menus and menu items.
- **Bookings**: Handle customer reservations and bookings.
- **Reviews**: Collect and display customer reviews.

Refer to the Postman collection for detailed request examples and parameters for each route.

### Example Requests

- **Register a User**: Select the `Register` request from the collection, modify the request body as needed, and hit send.
- **Create a Booking**: Choose the `Create Booking` request, ensure you're authenticated (use the `Authenticate` request if needed), and customize the request body with your booking details.

For more information on the available routes and their usage, refer to the `api/routes/` directory in the project repository.

## 📱 Application Pages and Usage

This section outlines the key pages within the TopRestaurant application and provides a brief overview of their functionality and usage.

### Home Page

- **Path**: `/`
- **Description**: The landing page of the application, showcasing featured restaurants and user reviews. Users can start their search for restaurants from here.

### Sign Up / Login

- **Path**: `/signup`, `/login`
- **Description**: Pages for user registration and login. Essential for accessing personalized features like making reservations and adding restaurants to favorites.

### Restaurant List

- **Path**: `/restaurants`
- **Description**: Displays a list of restaurants based on the user's search criteria or location. Users can filter results by cuisine, rating, or other parameters.

### Restaurant Details

- **Path**: `/restaurants/:id`
- **Description**: Provides detailed information about a specific restaurant, including its menu, reviews, and booking options. Users can also add the restaurant to their favorites from this page.

### Booking

- **Path**: `/booking/:restaurantId`
- **Description**: Allows users to make a reservation at a restaurant. Users must specify the date, time, and number of guests.

### User Profile

- **Path**: `/profile`
- **Description**: Displays the user's profile information, including past bookings, favorite restaurants, and the option to edit personal details.

### Dashboard (Admin)

- **Path**: `/admin/dashboard`
- **Description**: Accessible only to users with administrative privileges. Provides an overview of the application's metrics, user activity, and other administrative functions.

### Menu Management (Admin)

- **Path**: `/admin/menu`
- **Description**: Allows administrators to add, edit, or delete menu items for any restaurant. This page is part of the administrative dashboard.

### Booking Management (Admin)

- **Path**: `/admin/bookings`
- **Description**: Enables administrators to view, confirm, or cancel bookings. This feature is crucial for managing restaurant reservations efficiently.

### Review Management (Admin)

- **Path**: `/admin/reviews`
- **Description**: Admins can monitor and manage user reviews for restaurants, ensuring the quality and reliability of feedback displayed on the site.

## 🤝 Contributing
Contributions are what make the open-source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📜 License
Distributed under the MIT License. See `LICENSE` for more information.

## 📞 Contact
Project Link: [https://github.com/LuisEUM/TopRestaurant](https://github.com/LuisEUM/TopRestaurant)