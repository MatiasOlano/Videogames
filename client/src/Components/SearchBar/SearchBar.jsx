import { useState } from "react";
import { useDispatch } from "react-redux";
import { getNameGames } from "../../Redux/Actions";
import s from "../SearchBar/SearchBar.module.css";

export default function SearchBar() {
  const dispatch = useDispatch();
  const [search, setSearch] = useState("");

  function handleSearch(e) {
    setSearch(e.target.value);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (search.length) {
      await dispatch(getNameGames(search));
      setSearch("");
    }
  }

  return (
    <div className={s.container}>
      <form className={s.search} onSubmit={handleSubmit}>
        <div>
          <input
            className={s.input}
            id="search"
            type="text"
            value={search}
            placeholder="Search..."
            onChange={(e) => handleSearch(e)}
            autoComplete="off"
          />
        </div>
      </form>
    </div>
  );
}
