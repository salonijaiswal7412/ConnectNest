# ConnectNest

ConnectNest is a dynamic web application that allows users to register, create and manage posts, and interact with others. The app includes user authentication, profile management, and the ability to upload profile pictures. It’s built using Node.js, Express, MongoDB, and EJS, with Multer handling file uploads for user profile pictures.

## Features

- **User Registration & Login**: Users can create an account and log in securely.
- **Create and Manage Posts**: Authenticated users can create, edit, and delete posts.
- **Profile Management**: Users can upload and update their profile pictures.
- **Post Interaction**: Users can like and unlike posts.
- **User Authentication**: Secure authentication with JWT (JSON Web Tokens).
- **Responsive Design**: The application is styled with Tailwind CSS for a clean, responsive user interface.

## Technologies Used

- **Backend**: Node.js, Express.js
- **Database**: MongoDB, Mongoose
- **Templating Engine**: EJS (Embedded JavaScript)
- **File Uploads**: Multer
- **Authentication**: JWT (JSON Web Token)
- **Styling**: Tailwind CSS

## Installation

1. **Clone the repository:**
    ```bash
    git clone https://github.com/salonijaiswal7412/ConnectNest.git
    cd ConnectNest
    ```

2. **Install dependencies:**
    ```bash
    npm install
    ```

3. **Set up MongoDB:**
    - Ensure MongoDB is installed and running.
    - Create a `.env` file in the root directory with your MongoDB URI and JWT secret.

    Example `.env` file:
    ```
    MONGODB_URI=mongodb://localhost:27017/connectnest
    JWT_SECRET=your_secret_key
    ```

4. **Start the application:**
    ```bash
    npm start
    ```
    The application will be accessible at `http://localhost:4000`.

## Usage

1. **Home Page:**
    - Visit `http://localhost:4000/` to access the home page.
    - Register as a new user or log in if you already have an account.

2. **Profile Page:**
    - After logging in, visit your profile page to view and manage your posts.
    - Upload or update your profile picture.

3. **Post Management:**
    - Create new posts directly from your profile page.
    - Edit or delete existing posts.
    - Like or unlike posts created by you or other users.

4. **Profile Picture Upload:**
    - Go to the profile upload page to change your profile picture.

5. **Logout:**
    - Log out by clicking the logout button, which will end your session.
## Contributing

Contributions are welcome! If you'd like to contribute to ConnectNest, please fork the repository and submit a pull request.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for more details.

---

**Enjoy using ConnectNest!** 
