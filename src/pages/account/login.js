import axios from "axios";
import Cookies from "js-cookie";
import { useState } from "react";
import { useRouter } from "next/router";

export default function Login() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    loginUser();
  };

  const loginUser = async () => {
    const data = await axios
      .post("https://nezwelt-server.herokuapp.com/Account/SignIn", {
        username,
        password,
      })
      .then((res) => res.data)
      .catch((e) => {
        if (e.response.status === 401) alert("Invalid Password");
        if (e.response.status === 404) alert("No Such User");
      });

    if (data) {
      const { token } = data;

      Cookies.set("jwt", token);
      router.push("/home");
    }
  };

  return (
    <>
      <main>
      </main>
    </>
  );
}
