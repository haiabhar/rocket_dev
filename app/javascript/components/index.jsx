import React from "react";
import { useContext, useEffect, useRef, useState } from "react";
import { createRoot } from "react-dom/client";
import {App} from "./App";
import { Grommet } from 'grommet';
import { hpe } from 'grommet-theme-hpe';
document.addEventListener("turbo:load", () => 
{
  const root = createRoot(
    document.body.appendChild(document.createElement("div"))
  );
  //root.render(<App />);

  root.render(
  <>
  <Grommet theme={hpe} full> 
    <App />
  </Grommet>  
  </>
  );
});