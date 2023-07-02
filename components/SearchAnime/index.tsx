import React, { useState } from "react";

const SearchAnime = () => {
  const [query, setQuery] = useState<string>("");

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setQuery(value);
  };

  return (
    <form>
      <input value={query} onChange={(event) => handleChange(event)} />
    </form>
  );
};

export { SearchAnime };
