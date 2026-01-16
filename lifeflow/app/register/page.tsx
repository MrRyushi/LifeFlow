"use client";
import React, { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "@/firebase/firebase";
import { doc, setDoc } from "firebase/firestore";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
      if (password !== confirmPassword) {
        alert("Passwords do not match");
        return;
      }

      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      const user = userCredential.user;

      await setDoc(
        doc(db, "users", user.uid),
        { role: "donor" },
        { merge: true }
      );

      alert("Registration Successful");
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.error(error.code, error.message);
      alert(error.message);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <div className="flex flex-col justify-center text-left px-4 md:px-20 montserrat">
        <h1 className="text-3xl font-bold mb-1">Donor Sign Up</h1>
        <p>Please fill in the form to create a donor account.</p>
        <form onSubmit={handleSubmit} className="flex flex-col">
          <div className="flex flex-col mt-2">
            <label>Email:</label>
            <input
              type="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-gray-200 py-1 rounded-lg"
            />
          </div>
          <div className="flex flex-col mt-2">
            <label>Password:</label>
            <input
              type="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="bg-gray-200 py-1 rounded-lg"
            />
          </div>
          <div className="flex flex-col mt-2">
            <label>Confirm your password:</label>
            <input
              type="password"
              name="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="bg-gray-200 py-1 rounded-lg"
            />
          </div>
          <button
            type="submit"
            className="mt-4 px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
          >
            Register
          </button>
        </form>
        <div>
          <p className="mt-4 text-sm text-center">Already have an account? <a href="/login" className="text-blue-500 underline">Login here</a></p>
        </div>
      </div>
    </div>
  );
};

export default Register;
