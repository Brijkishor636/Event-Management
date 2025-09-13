"use client";

import axios from "axios";
import { useState } from "react";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  async function handleClick() {
    try {
      const response = await axios.post(
        "http://localhost:3001/api/v1/user/signin",
        { username, password },
        { withCredentials: true } // 🔥 important
      );

      //@ts-ignore
      console.log("Token:", response.data?.token);

      // If backend sets an httpOnly cookie, it will be stored automatically
      // by the browser because we used `withCredentials: true`.

      alert("Login successful!");
    } catch (error) {
      console.error("Login failed", error);
      alert("Login failed");
    }
  }

  return (
    <div className="pt-30 flex flex-col gap-2">
      <input
        onChange={(e) => setUsername(e.target.value)}
        value={username}
        type="text"
        placeholder="username"
        className="border rounded-lg px-3 py-2"
      />
      <input
        onChange={(e) => setPassword(e.target.value)}
        value={password}
        type="password"
        placeholder="password"
        className="border rounded-lg px-3 py-2"
      />
      <button
        className="py-2 px-3 bg-gray-400 rounded-lg cursor-pointer"
        onClick={handleClick}
      >
        Signin
      </button>
    </div>
  );
}
