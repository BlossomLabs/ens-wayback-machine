
import "@fontsource/caveat/400.css";
import "@fontsource/amatic-sc/700.css";

import theme from '../theme'

import { ChakraProvider } from '@chakra-ui/react'

import {HashRouter as Router, Routes, Route} from 'react-router-dom';
import { useEffect, useState } from "react";

import Home from './index'
import PageViewer from './[url]'

export default function App() {
  const [render, setRender] = useState(false);
  useEffect(() => setRender(true), []);
  return render ?
    <ChakraProvider theme={theme}>
      {typeof window === 'undefined' ? null : (
        <Router>
          <Routes>
            <Route path="/:url" element={<PageViewer />} />
            <Route path="/" element={<Home />} />
          </Routes>
        </Router>
      )}
    </ChakraProvider>
    : null;
}
