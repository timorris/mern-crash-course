//import { useState } from 'react'
//import reactLogo from './assets/react.svg'
//import viteLogo from '/vite.svg'
import { Route, Routes } from "react-router-dom";
import { Box } from "@chakra-ui/react";
import './App.css'
import HomePage from "./pages/HomePage";
import CreatePage from "./pages/CreatePage";
import Navbar from "./components/Navbar";

function App() {

  return (
    <Box minH="100vh" display="flex" flexDirection="column" justifyContent="center" alignItems="center" bg="gray.800" color="white">
      <Navbar />
      {/*
      <Navbar bg="teal.500" color="white" p={4} width="100%" mb={8}>
        <Box fontSize="xl" fontWeight="bold">My E-commerce Store</Box>
      </Navbar>
      <Box textAlign="center">
        <h1>Welcome to My E-commerce Store</h1>
        <p>Explore our products and enjoy shopping!</p>
      </Box>
      */}
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
