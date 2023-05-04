import React from "react";
import s from "./Loading.module.css";
import loading from "../../assets/LoadingVerde.gif";

export default function Loading() {
  return (
    <div className={s.loading}>
      <img className={s.gif} src={loading} alt="Loader" />
    </div>
  );
}
