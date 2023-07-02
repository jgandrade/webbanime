import React, { useState } from "react";
import { useRouter } from "next/navigation";

const SearchAnime = () => {
  const [query, setQuery] = useState<string>("");
  const router = useRouter();
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setQuery(value);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    router.push(`/search/${query}`);
  };

  return (
    <form onSubmit={(event) => handleSubmit(event)}>
      <input value={query} onChange={(event) => handleChange(event)} />
      <button type="submit">Search</button>
    </form>
  );
};

export { SearchAnime };
