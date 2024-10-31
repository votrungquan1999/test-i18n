"use client";

import { useState } from "react";

export default function Counter() {
  const [count, setCount] = useState(0);

  return (
    <div className="flex flex-col gap-2 items-start">
      <p>
        The button has been clicked <b>{count}</b> times
      </p>

      <button
        type="button"
        onClick={() => setCount(count + 1)}
        className="bg-blue-500 border border-slate-200 hover:bg-blue-600 focus:bg-blue-600 text-white p-2 rounded-md"
      >
        Increment
      </button>
    </div>
  );
}
