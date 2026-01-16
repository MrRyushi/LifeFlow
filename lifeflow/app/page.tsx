"use client";
import { ModeToggle } from "@/components/ModeToggle";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <main className="flex flex-col items-center justify-center w-full flex-1 px-4 md:px-20 text-center montserrat">
        <h1 className="text-4xl md:text-5xl font-bold">Welcome to LifeFlow</h1>
        <p className="text-lg md:text-xl">Take the First Step to Saving Lives</p>
        <button className="mt-4 px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
        onClick={() => router.push('/register')}>
          Get Started
        </button>
      </main>
    </div>
  );
}
