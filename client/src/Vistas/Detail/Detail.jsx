import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import s from "./Detail.module.css";
import Loading from "../../Components/Loading/Loading";
import axios from "axios";

export default function Detail() {
  let { id } = useParams();
  const [game, setGame] = useState();

  useEffect(() => {
    axios
      .get(`http://localhost:3001/games/${id}`)
      .then((result) => setGame(result.data));
  }, [id]);

  return (
    <div className={s.container}>
      {game ? (
        <div className={s.gridContainer}>
          <div className={s.buttoncontainer}>
            <Link to="/videogames">
              <button className={s.homeButton}>Home</button>
            </Link>
          </div>
          <h2 className={s.name}>{game.name}</h2>
          <div className={s.divimage}>
            <img className={s.image} src={game.image} alt={game.image} />
          </div>
          <div className={s.containerfilters}>
            <div className={s.divrating}>
              <h2 className={s.ratetitle}>Rating</h2>
              <span className={s.rate}>{game.rating}</span>
            </div>
            <div className={s.divgenre}>
              <h2 className={s.genretitle}>Genres</h2>
              {game.genres.length === 2 ? (
                game.genres?.map((genre) => {
                  return <h4 className={s.duplig}>{genre}</h4>;
                })
              ) : game.genres.length === 1 ? (
                <h4 className={s.uniqueg}>{game.genres}</h4>
              ) : (
                game.genres?.map((genre) => {
                  return <h4 className={s.genre}>{genre}</h4>;
                })
              )}
            </div>
            <div className={s.divreleased}>
              <h2 className={s.releasedtitle}>Released</h2>
              <span className={s.released}>{game.released}</span>
            </div>
            <div className={s.divplatform}>
              <h2 className={s.platformtitle}>Platforms</h2>
              <div className={s.platformcontainer}>
                {game.platforms.length === 2 ? (
                  game.platforms?.map((plat) => {
                    return <h4 className={s.duplip}>{plat}</h4>;
                  })
                ) : game.platforms.length === 1 ? (
                  <h4 className={s.uniquep}>{game.platforms}</h4>
                ) : (
                  game.platforms?.map((plat) => {
                    return <h4 className={s.platform}>{plat}</h4>;
                  })
                )}
              </div>
            </div>
          </div>
          <div className={s.divdescription}>
            <h2 className={s.descriptiontitle}>Description</h2>
            <h4 className={s.description}>
              {game.description
                ?.split("<p>")
                .join("\n")
                .split("</p>")
                .join(" ")
                .split("<br />")
                .join("\n")}
            </h4>
          </div>
        </div>
      ) : (
        <Loading />
      )}
    </div>
  );
}
