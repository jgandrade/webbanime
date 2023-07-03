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
    <form onSubmit={(event) => handleSubmit(event)}>
      <input
        type="text"
        placeholder="Search Anime"
        value={query}
        onChange={(event) => handleChange(event.target.value)}
      />
      <button type="submit">Search</button>
    </form>
  );
};

export { SearchAnime };
