#!/bin/bash

echo "Installing Node.js dependencies..."
npm install

echo "Building frontend..."
npm run build

echo "Starting FastAPI application..."
python main.py