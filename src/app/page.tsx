"use client";

import { GoogleSignInButton } from "@/components/authButtons";
import { PiPokerChip } from "react-icons/pi";
import Image from "next/image";


export default function Home() {
  return (
    <div className="flex w-full h-screen">
      <div className="hidden lg:flex flex-col h-full w-1/2 justify-center">
        <div className="flex flex-row space-x-6 pl-20 pr-10">
          <div className="flex items-center justify-center w-30 h-30 rounded-xl bg-white">
            <Image src="/poker-scrum-icon.png" alt="test" width="90" height="90" />
          </div>
          <h1 className="flex text-white text-5xl select-none font-bold items-center">
            Planning Poker
          </h1>
        </div>

        <div className="relative pl-8 sm:pl-32 py-6 group">
          <div className="flex flex-col sm:flex-row items-start mb-1 group-last:before:hidden before:absolute before:left-2 sm:before:left-0 before:h-full before:px-px before:bg-slate-300 sm:before:ml-[6.5rem] before:self-start before:-translate-x-1/2 before:translate-y-3 after:absolute after:left-2 sm:after:left-0 after:w-2 after:h-2 after:bg-indigo-600 after:border-4 after:box-content after:border-slate-50 after:rounded-full sm:after:ml-[6.5rem] after:-translate-x-1/2 after:translate-y-1.5">

          </div>
          <div className="italic text-lg">Improve estimation accuracy</div>
        </div>

        <div className="relative pl-8 sm:pl-32 py-6 group">
          <div className="flex flex-col sm:flex-row items-start mb-1 group-last:before:hidden before:absolute before:left-2 sm:before:left-0 before:h-full before:px-px before:bg-slate-300 sm:before:ml-[6.5rem] before:self-start before:-translate-x-1/2 before:translate-y-3 after:absolute after:left-2 sm:after:left-0 after:w-2 after:h-2 after:bg-indigo-600 after:border-4 after:box-content after:border-slate-50 after:rounded-full sm:after:ml-[6.5rem] after:-translate-x-1/2 after:translate-y-1.5">

          </div>
          <div className="italic text-lg">Increase team engagement</div>
        </div>

        <div className="relative pl-8 sm:pl-32 py-6 group">
          <div className="flex flex-col sm:flex-row items-start mb-1 group-last:before:hidden before:absolute before:left-2 sm:before:left-0 before:h-full before:px-px before:bg-slate-300 sm:before:ml-[6.5rem] before:self-start before:-translate-x-1/2 before:translate-y-3 after:absolute after:left-2 sm:after:left-0 after:w-2 after:h-2 after:bg-indigo-600 after:border-4 after:box-content after:border-slate-50 after:rounded-full sm:after:ml-[6.5rem] after:-translate-x-1/2 after:translate-y-1.5">

          </div>
          <div className="italic text-lg">Boost satisfaction</div>
        </div>
      </div>
      <div className="w-full flex flex-col items-center justify-center lg:w-1/2" style={{
        backgroundImage: `url(/blurred.png)`,
      }}>
        <div className="w-4/5 flex flex-col items-center justify-center bg-white rounded-3xl shadow-lg p-10 space-y-8">
          <div className="flex flex-col items-center justify-center space-y-4">
            <div className="flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-blue-500 to-green-500">
              <PiPokerChip size={64} />
            </div>

            <h1 className="text-black font-extrabold text-2xl">
              Create an account
            </h1>

            <p className="text-black text-sm">
              Sign in with services below to create your account
            </p>
          </div>
          <GoogleSignInButton />
        </div>
      </div>
    </div>
  );
}