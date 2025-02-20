#!/bin/bash

# Navigate to the backend directory
cd backend

# Create and activate the virtual environment (only if it doesn't exist)
if [ ! -d "venv" ]; then
  python3 -m venv venv
fi
source venv/bin/activate

# Install dependencies from requirements.txt
pip install -r requirements.txt

# Run the backend
python3 main.py &
BACKEND_PID=$!

# Navigate back to the project root
cd ..

# Navigate to the frontend directory
cd frontend

# Run the frontend development server
npm run dev

# Kill the backend process when the frontend terminates (or script finishes)
if [[ -n "$BACKEND_PID" ]]; then
  trap "kill $BACKEND_PID; echo 'Backend process killed.'" INT TERM EXIT
fi

# Optional: Keep the script running until the frontend terminates
# while true; do
#   sleep 1
# done

echo "Script finished."