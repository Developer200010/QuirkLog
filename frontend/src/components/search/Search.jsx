import React, { useState, useEffect } from "react";

const Search = ({ input, setInput }) => {
  const [query, setQuery] = useState(input);

  // debounce effect
  useEffect(() => {
    const handler = setTimeout(() => {
      setInput(query); // update parent state after 400ms idle
    }, 400);

    return () => clearTimeout(handler);
  }, [query, setInput]);

  function handleSubmit(e) {
    e.preventDefault();
    setInput(query); // still support manual submit
  }

  return (
    <div className="w-full flex flex-col items-center bg-gray-100 py-10">
      <form
        onSubmit={handleSubmit}
        className="flex gap-3 items-center w-full max-w-xl px-4"
      >
        <input
          type="text"
          placeholder="search by title or username"
          className="flex-grow px-4 py-2 rounded-md border border-gray-300 shadow-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </form>
    </div>
  );
};

export default Search;
