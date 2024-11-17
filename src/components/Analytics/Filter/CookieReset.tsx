"use client";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";

function CookieReset() {
  const [reset, setReset] = useState(false);

  useEffect(() => {
    if (reset) {
      const timeout = setTimeout(() => {
        setReset(false);
      }, 3000);
      return () => {
        clearTimeout(timeout);
      };
    }
  }, [reset]);
  return (
    <button
      onClick={() => {
        Cookies.remove("startDate");
        Cookies.remove("endDate");
        Cookies.remove("ageGroup");
        Cookies.remove("gender");
        setReset(true);
      }}
      className="px-2 py-0.5 rounded-lg text-white bg-blue-500"
    >
      {reset ? "Reset Successful" : "Reset Cookies"}
    </button>
  );
}

export default CookieReset;
