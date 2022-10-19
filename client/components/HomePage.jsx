import React, { useState } from "react";
import Form from "./Form.jsx";
import LoginsContainer from "./LoginsContainer.jsx";

const HomePage = () => {
  // keeping state here to indicate if database was updated
  const [updated, setUpdated] = useState(false);

  return (
    <div>
      <Form updated={updated} setUpdated={setUpdated} />
      <LoginsContainer updated={updated} setUpdated={setUpdated} />
    </div>
  );
}

export default HomePage;