import Filters from "../Filters/Filters";
import s from "./NavBar.module.css";

export default function NavBar({ setOrder, setCurrentPage }) {
  return (
    <nav className={s.nav}>
      <Filters setCurrentPage={setCurrentPage} setOrder={setOrder} />
    </nav>
  );
}
