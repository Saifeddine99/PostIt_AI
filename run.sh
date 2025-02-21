#!/bin/bash

# Function to check and kill process using a port
kill_process_using_port() {
  port="$1"
  pid=$(lsof -i :"$port" -t) # -t for just the PID
  if [[ -n "$pid" ]]; then
    echo "Process using port $port found (PID: $pid). Killing..."
    kill "$pid"
    echo "Process killed."
  fi
}


# Navigate to the backend directory
cd backend

# Create and activate the virtual environment (only if it doesn't exist)
if [ ! -d "venv" ]; then
  python3 -m venv venv
fi
source venv/bin/activate

# Install dependencies from requirements.txt
pip install -r requirements.txt

# Check and kill if port 5000 is in use
kill_process_using_port 5000

# Run the backend
echo "Starting backend on port 5000..."
python3 main.py &
BACKEND_PID=$!
echo "Backend started with PID: $BACKEND_PID"

# Navigate back to the project root
cd ..

# Navigate to the frontend directory
cd frontend

echo "Installing frontend dependencies..."
npm install
echo "Frontend dependencies installed."

echo "Building the frontend..."
npm run build
echo "Frontend built."

echo "Serving the frontend with preview..."
npm run preview &
FRONTEND_PID=$!
echo "Frontend preview server started with PID: $FRONTEND_PID"