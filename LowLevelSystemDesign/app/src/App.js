import { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import Body from "./components/Body";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Body />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
