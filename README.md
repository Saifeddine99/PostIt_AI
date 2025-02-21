# PostIt AI - Social Media Content Generation

This project provides a backend API (Flask) and a frontend interface (React/Vite) for generating and managing social media content.  Users can generate posts based on provided criteria, save them, and view their history.

## Project Structure
.
├── backend
│   ├── instance
│   │   └── database.db
│   ├── main.py
│   ├── requirements.txt
│   └── website
│      ├── auth.py
│      ├── db_models.py
│      ├── decorators.py
│      ├── home_page.py
│      ├── init.py
│      └── post_generation.py
├── frontend
│   ├── ... (Frontend files)
└── run.sh

## Backend (Flask)

The backend API is built using Flask and provides the following endpoints:

### Authentication (`auth.py`)

*   **POST /auth/signup:** Registers a new user.
    *   Request Body:
        ```json
        {
          "username": "your_username",
          "password": "your_password"
        }
        ```
    *   Responses:
        *   `201`: `{"message": "User created successfully"}`
        *   `400`: `{"message": "Username already exists"}`
*   **POST /auth/login:** Logs in an existing user.
    *   Request Body:
        ```json
        {
          "username": "your_username",
          "password": "your_password"
        }
        ```
    *   Responses:
        *   `200`: `{"token": "your_token"}`
        *   `401`: `{"message": "Invalid credentials"}`

### Post Generation and Saving (`post_generation.py`)

*   **POST /generate_post/:** Generates a social media post.
    *   Headers: `Authorization: Bearer <token>`
    *   Request Body:
        ```json
        {
          "content": "Post content",
          "platform": "Platform (e.g., Twitter, LinkedIn)",
          "tone_style": "Tone style (e.g., Formal, Informal)"
        }
        ```
    *   Responses:
        *   `200`: `{"post": "Generated post text"}`
        *   `400`: `{"error": "Missing required parameters"}`
        *   `500`: `{"error": "Error message"}`
*   **POST /generate_post/save/:** Saves a generated post.
    *   Headers: `Authorization: Bearer <token>`
    *   Request Body:
        ```json
        {
          "content": "Original post content",
          "platform": "Platform",
          "tone_style": "Tone style",
          "generated_post": "Generated post text"
        }
        ```
    *   Responses:
        *   `200`: `{"message": "saved successfully!"}`
        *   `400`: `{"error": "Missing required parameters"}`
        *   `500`: `{"error": "Error message"}`

### Home Page/Dashboard (`home_page.py`)

*   **GET /home/:** Retrieves a list of saved posts for the logged-in user.
    *   Headers: `Authorization: Bearer <token>`
    *   Responses:
        *   `200`: `{"result": [{"title": "title", "content": "content", "generated_post": "generated_post", "style": "style", "platform": "platform"}, ...]}` (A list of dictionaries)
        *   `500`: `{"error": "Error message"}`

## Frontend (React/Vite)

The frontend is built using React and Vite. It provides a user interface for interacting with the backend API. Key pages include:

*   **Home/Dashboard:** Displays a list of previous saved posts (titles only). Clicking on a title displays the full post details.
*   **Login:** Allows users to log in.
*   **Register:** Allows users to create new accounts.

## Running the Project

1.  Clone the repository.
2.  Navigate to the project root.
3.  Run `./run.sh` to start the backend and frontend development servers.  The script will automatically handle installing dependencies, building the frontend, and handling port conflicts.

## Technologies Used

*   **Backend:** Flask (Python)
*   **Frontend:** React, Vite
*   **Database:** SQLite (database.db)

## Contributing

Contributions are welcome! Please open an issue or submit a pull request.
