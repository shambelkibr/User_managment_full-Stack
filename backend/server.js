import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import userRoutes from "./routes/userRoutes.js";

dotenv.config();

const app = express();
const PORT = Number(process.env.PORT) || 5000;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.status(200).json({ message: "User Management API is running" });
});

app.use("/api", userRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});


// # Health check
// Invoke-RestMethod -Method Get -Uri "http://localhost:5000/"

// # Get all users
// Invoke-RestMethod -Method Get -Uri "http://localhost:5000/api/users"

// # Create user
// $body = @{
//   first_name = "John"{"message":"Failed to fetch users","error":"Access denied for user 'shambel'@'localhost' (using password: YES)"}
//   last_name  = "Doe"
//   age        = 25
//   email      = "john.doe@example.com"
// } | ConvertTo-Json
// Invoke-RestMethod -Method Post -Uri "http://localhost:5000/api/users" -ContentType "application/json" -Body $body

// # Get user by id
// Invoke-RestMethod -Method Get -Uri "http://localhost:5000/api/users/1"

// # Update user
// $update = @{
//   first_name = "Johnny"
//   last_name  = "Doe"
//   age        = 26
//   email      = "johnny.doe@example.com"
// } | ConvertTo-Json
// Invoke-RestMethod -Method Put -Uri "http://localhost:5000/api/users/1" -ContentType "application/json" -Body $update

// # Delete user
// Invoke-RestMethod -Method Delete -Uri "http://localhost:5000/api/users/1"