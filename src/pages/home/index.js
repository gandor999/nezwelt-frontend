import Cookies from "js-cookie";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import axios from "axios";

export default function Home() {
  const router = useRouter();
  const [territories, setTerritories] = useState([]);

  useEffect(() => {
    getTerritories();
  }, []);

  const getTerritories = async () => {
    return await axios
      .get("https://nezwelt-server.herokuapp.com/Territories/All", {
        headers: {
          Authorization: `Bearer ${Cookies.get("jwt")}`,
        },
      })
      .then((res) => setTerritories(res.data.territories))
      .catch((e) => {
        if (e.response.status === 403) router.push("/account/login");
      });
  };

  const insertChildren = (territory, territories) => {
    return {
      ...territory,
      children: territories
        .filter((t) => t.parent === territory.id)
        .map((child) => insertChildren(child, territories)),
    };
  };

  const unflattenedTerritories = territories
    .map((t) => insertChildren(t, territories))
    .filter((t) => t.parent === null);

  const renderTerritories = (territory) => {
    return (
      <>
        <li>
          <span>{territory.name}</span>
          <ul>
            {territory.children.map((child) => {
              return (
                <>
                  <li>{renderTerritories(child)}</li>
                </>
              );
            })}
          </ul>
        </li>
      </>
    );
  };

  return (
    <>
      <main>
        <h1>Territories</h1>
        <h3>Here are a list of territories:</h3>
        <ul>{unflattenedTerritories.map((ter) => renderTerritories(ter))}</ul>
      </main>
    </>
  );
}
