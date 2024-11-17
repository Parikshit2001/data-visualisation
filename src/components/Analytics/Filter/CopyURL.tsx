"use client";

import { useEffect, useState } from "react";

function CopyURL({
  startDate,
  endDate,
  ageGroup,
  gender,
}: {
  startDate: string;
  endDate: string;
  ageGroup: string;
  gender: string;
}) {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (copied) {
      const timeout = setTimeout(() => {
        setCopied(false);
      }, 3000);
      return () => {
        clearTimeout(timeout);
      };
    }
  }, [copied]);
  return (
    <div>
      <button
        className="px-2 py-0.5 rounded-lg text-white bg-blue-500"
        onClick={() => {
          navigator.clipboard.writeText(
            `${process.env.NEXT_PUBLIC_URL}?startDate=${startDate}&endDate=${endDate}&ageGroup=${ageGroup}&gender=${gender}`
          );
          setCopied(true);
        }}
      >
        {copied ? "Copied" : "Your Custom URL"}
      </button>
    </div>
  );
}

export default CopyURL;
