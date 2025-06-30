import React from "react";
import { IoMdCloseCircleOutline } from "react-icons/io";

export default function RecommandedAlert({ setClose }) {
  return (
    <div
      class="bg-yellow-50 border-l-4 border-yellow-400 text-yellow-800 p-4 rounded-md shadow-sm flex items-start gap-3 absolute top-6"
      role="alert"
    >
      <div className=" relative">
        <IoMdCloseCircleOutline
          size={25}
          className=" absolute right-2 top-1 cursor-pointer"
          onClick={() => setClose(false)}
        />
        <svg
          class="w-5 h-5 text-yellow-500 mt-0.5 shrink-0"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M13 16h-1v-4h-1m1-4h.01M12 2a10 10 0 1010 10A10 10 0 0012 2z"
          />
        </svg>
        <div>
          <p class="font-semibold">VPN Recommended</p>
          <p class="text-sm">
            API access is currently not avliable in your region. Please use a
            VPN to continue using the app.
          </p>
        </div>
      </div>
    </div>
  );
}
