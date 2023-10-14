import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./sector.scss";
import { useApi } from "../../hooks/useApi";

const BASE_URL = import.meta.env.VITE_BASE_URL;

export default function sector() {
  const [title, setTitle] = useState("");
  const [subTitle, setSubTitle] = useState("");
  const [sectors, setSectors] = useState([]);

  const { get } = useApi();

  const handleSuccess = (res) => {
    const {
      title,
      subTitle,
      sectors: { data: sectorArray },
    } = res.data.data.attributes;

    setTitle(title);
    setSubTitle(subTitle);
    setSectors(sectorArray);
  };

  const fetchHomeSector = async () => {
    await get("home-sector", {
      onSuccess: (res) => handleSuccess(res),
      params: {
        "populate[sectors][populate][categories][populate][jobs]": true,
        "populate[sectors][populate][smallImage]": true,
        "populate[sectors][populate][bigImage]": true,
        "populate[sectors][limit]": 3,
      },
    });
  };

  useEffect(() => {
    fetchHomeSector();
  }, []);
  return (
    <div className="sector">
      <h2>{title}</h2>
      <p>{subTitle}</p>

      <div className="sector__types">
        {sectors.map((sector) => {
          const { bigImage, smallImage, title, categories } = sector.attributes;
          const { url: smallImageUrl } = smallImage.data.attributes;
          const { url: bigImageUrl } = bigImage.data.attributes;

          return (
            <div key={sector.id} className="sector__wrap">
              <picture className="sector__picture">
                <source
                  srcSet={`${BASE_URL}${bigImageUrl}`}
                  media="(min-width: 767px)"
                />
                <source srcSet={`${BASE_URL}${smallImageUrl}`} />
                <img src={`${BASE_URL}${smallImageUrl}`} alt="" />
              </picture>
              <div className="sector__name">{title}</div>
              <ul className="sector__list">
                {categories.data.map((category) => {
                  const {
                    title,
                    jobs: { data: jobArray },
                  } = category.attributes;
                  return (
                    <li key={category.id}>
                      <Link to="">
                        {" "}
                        {title} <span>{jobArray.length}</span>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          );
        })}
      </div>
    </div>
  );
}
