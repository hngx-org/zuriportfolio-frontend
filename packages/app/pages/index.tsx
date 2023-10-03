import { useState } from "react";

function Home() {
  const [count, setCount] = useState(0);

  return (
    <div className="App">
      <div className="w-full h-[100vh] flex flex-col items-center justify-center bg-blue-400 text-[#fff] ">
        <h3 className="text-white-200 text-[25px] font-extrabold">
          Nextjs(Typescript) + Tailwindcss
        </h3>
        <br />
        <button
          className="px-4 py-2 rounded-md bg-blue-600"
          onClick={() => setCount((count) => count + 1)}
        >
          count is {count}
        </button>
        <br />
      </div>
    </div>
  );
}

export default Home;
