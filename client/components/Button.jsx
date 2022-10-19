import React from "react";

import { useState } from "react";

const Button = () => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [err, setErr] = useState("");

  const handleClick = async () => {
    setIsLoading(true);

    try {
      const response = await fetch("/api/", {
        method: "GET",
        headers: {
          Accept: "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(`Error! status: ${response.status}`);
      }

      const result = await response.json();


      setData(result);
    } catch (err) {
      setErr(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      {err && <h2>{err}</h2>}

      <button onClick={handleClick}>Fetch data</button>

      {isLoading && <h2>Loading...</h2>}

      {data.map((login) => {
        return (
          <div key={login.id}>
            <h2>{login.username}</h2>
            <h2>{login.password}</h2>
          </div>
        )
      })}
    </div>
  );
};

export default Button;
