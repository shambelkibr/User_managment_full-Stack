import db from "../config/db.js";

const getAllUsers = async () => {
  const [rows] = await db.query(
    "SELECT user_id, first_name, last_name, age, email FROM users"
  );
  return rows;
};

const getUserById = async (userId) => {
  const [rows] = await db.query(
    "SELECT user_id, first_name, last_name, age, email FROM users WHERE user_id = ?",
    [userId]
  );
  return rows[0] || null;
};

const createUser = async ({ first_name, last_name, age, email }) => {
  const [result] = await db.query(
    "INSERT INTO users (first_name, last_name, age, email) VALUES (?, ?, ?, ?)",
    [first_name, last_name, age, email]
  );

  return {
    user_id: result.insertId,
    first_name,
    last_name,
    age,
    email,
  };
};

const updateUser = async (userId, { first_name, last_name, age, email }) => {
  const [result] = await db.query(
    "UPDATE users SET first_name = ?, last_name = ?, age = ?, email = ? WHERE user_id = ?",
    [first_name, last_name, age, email, userId]
  );

  if (result.affectedRows === 0) {
    return null;
  }

  return {
    user_id: Number(userId),
    first_name,
    last_name,
    age,
    email,
  };
};

const deleteUser = async (userId) => {
  const [result] = await db.query("DELETE FROM users WHERE user_id = ?", [userId]);
  return result.affectedRows > 0;
};

export { getAllUsers, getUserById, createUser, updateUser, deleteUser };
