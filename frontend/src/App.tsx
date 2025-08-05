
import { Route, Routes } from "react-router-dom";
import { Box } from "@chakra-ui/react";
import './App.css'
import HomePage from "./pages/HomePage";
import CreatePage from "./pages/CreatePage";
import Navbar from "./components/Navbar";
import { JSX } from "react";

function App(): JSX.Element {
  return (
    <Box minH="100vh" color="white">
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/create" element={<CreatePage />} />
        <Route path="/about" element={<h1>About Page</h1>} />
        <Route path="*" element={<h1>404 Not Found</h1>} />
      </Routes>
    </Box>
  )
}

export default App;
