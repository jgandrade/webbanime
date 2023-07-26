import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Search } from "@mui/icons-material";

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
        spellCheck={false}
      />
      <button
        className="absolute right-3 top-[10px] text-[#DC2626]"
        type="submit"
      >
        <Search />
      </button>
    </form>
  );
};

export { SearchAnime };
