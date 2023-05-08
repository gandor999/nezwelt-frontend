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

      Cookies.set("jwt", token, {
        expires: new Date(new Date().getTime() + 60 * 60 * 1000),
      });
      router.push("/home/index");
    }
  };

  return (
    <>
      <main>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label for="exampleInputEmail1" className="form-label">
              Username
            </label>
            <input
              type="username"
              className="form-control"
              name="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label for="exampleInputPassword1" className="form-label">
              Password
            </label>
            <input
              type="password"
              className="form-control"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="mb-3 form-check"></div>
          <button type="submit" className="btn btn-primary">
            Login
          </button>
        </form>
      </main>
    </>
  );
}
