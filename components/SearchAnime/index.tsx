import React, { useState } from "react";
import { useRouter } from "next/navigation";

const SearchAnime = () => {
  const [query, setQuery] = useState<string>("");
  const router = useRouter();
  const handleChange = (value: string) => {
    setQuery(value);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    router.push(`/search/${query}`);
  };

  return (
    <form
      onSubmit={(event) => handleSubmit(event)}
      className="flex items-center"
    >
      <input
        type="text"
        placeholder="Search Anime"
        value={query}
        onChange={(event) => handleChange(event.target.value)}
        className="px-4 py-2 rounded-l-lg bg-gray-900 text-gray-200 focus:outline-none focus:ring-2 focus:ring-e53935"
      />
      <button
        type="submit"
        className="px-4 py-2 rounded-r-lg bg-[#e53935] text-white"
      >
        Search
      </button>
    </form>
  );
};

export { SearchAnime };
