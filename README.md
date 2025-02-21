# PostIt AI - Social Media Content Generation

PostIt is an AI-powered application designed to automate the generation of social
media posts based on user-provided content. The system leverages Generative AI
models (OpenAI, Groq, or DeepSeek) to produce tailored posts for platforms like
LinkedIn, Facebook, and Twitter (X).

## Youtube link:

https://youtu.be/90T3fQ_VQII?si=HLIY1eHimbIlYl8m

## APIs Documentation:

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

### Home Page/ Dashboard (`home_page.py`)

*   **GET /home/:** Retrieves a list of saved posts for the logged-in user.
    *   Headers: `Authorization: Bearer <token>`
    *   Responses:
        *   `200`: `{"result": [{"title": "title", "content": "content", "generated_post": "generated_post", "style": "style", "platform": "platform"}, ...]}` (A list of dictionaries)
        *   `500`: `{"error": "Error message"}`

## Running the Project

1.  Clone the repository.
2.  Navigate to the project root.
3.  Run `./run.sh` to start the backend and frontend development servers.  The script will automatically handle installing dependencies, building the frontend, and handling port conflicts.

## Technologies Used

*   **Backend:** Flask (Python)
*   **Frontend:** React, Vite
*   **Database:** SQLite (database.db)
