"use client";
import { ModeToggle } from "@/components/ModeToggle";
import React, {useState} from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "@/firebase/firebase";
import { doc, getDoc } from "firebase/firestore";
import { useRouter } from "next/navigation";

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleLogin = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      console.log('Login successful:', user);

      // Redirect the user based on their role
      const userRef = doc(db, "users", user.uid);
      const userSnap = await getDoc(userRef);

      if (userSnap.exists()) {
      const userData = userSnap.data();
      console.log("User data:", userData);

      if (userData.role === "blood-center-staff") {
        router.push("/blood-center-donors");
      }
    } else {
      console.error("No user document found!");
    }

    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <div className="flex flex-col justify-center text-left px-4 md:px-20 montserrat">
        <h1 className="text-3xl font-bold mb-1">Donor Login</h1>
        <p>Please enter your credentials to log in.</p>
        <form onSubmit={handleLogin} className="flex flex-col">
          <div className="flex flex-col mt-2">
            <label>Email:</label>
            <input
              type="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-gray-200 py-1 rounded-lg px-2 text-black"
            />
          </div>
          <div className="flex flex-col mt-2">
            <label>Password:</label>
            <input
              type="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="bg-gray-200 py-1 rounded-lg px-2 text-black"
            />
          </div>
          <button
            type="submit"
            className="mt-4 px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
          >
            Login
          </button>
        </form>
        <div>
          <p className="mt-4 text-sm text-center">{"Don't"} have an account? <a href="/register" className="text-blue-500 underline">Register here</a></p>
        </div>
      </div>
    </div>
  );
};

export default Login;
