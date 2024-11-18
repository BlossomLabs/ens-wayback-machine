import "@fontsource/edu-qld-beginner";
import "@fontsource/megrim";

import { ChakraProvider } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { Route, HashRouter as Router, Routes } from "react-router-dom";

import "@/styles/global.css";

import { system } from "@/theme";
import PageViewer from "./[url]";
import Home from "./index";

export default function App() {
  const [render, setRender] = useState(false);
  useEffect(() => setRender(true), []);
  return render ? (
    <ChakraProvider value={system}>
      {typeof window === "undefined" ? null : (
        <Router>
          <Routes>
            <Route path="/:url" element={<PageViewer />} />
            <Route path="/" element={<Home />} />
          </Routes>
        </Router>
      )}
    </ChakraProvider>
  ) : null;
}
