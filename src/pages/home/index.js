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

  

  

  return (
    <>
      <main>
        <h1>Territories</h1>
        <h3>Here are a list of territories:</h3>
       
      </main>
    </>
  );
}
