import { useState, useEffect } from "react";
import { Routes, Route, Link } from "react-router-dom";
import axios from 'axios'
import './App.css'
// import Card from "./components/Card";
// import Gallery from "./components/Gallery";
import DetailsPage from "./pages/DetailsPage";
import NotFoundPage from "./pages/NotFoundPage";
import HomePage from "./pages/HomePage";
import AuthFormPage from './pages/AuthFormPage'
import logo from '../src/assets/logo.png'


export default function App() {
  // Store API data here
  const [cpas, setCpas] = useState([]);
  const [detailsData, setDetailsData] = useState({});
  const [loginStatus, setLoginStatus] = useState(false)

  // Define an async function to JSONify the query response
  async function getData(url) {
    const res = await fetch(url);
    const data = await res.json();
    setCpas([])
    setCpas(cpas => cpas.concat(data.features))
  }

  useEffect(() => {
    // Call the async function
    getData(
      `https://api.geoapify.com/v2/places?api_key=${
        import.meta.env.VITE_CPA_KEY
      }&categories=office.accountant&filter=place:51d9d1938d628052c0595938a4ac3a5b4440f00101f90121af020000000000c00208`
    );
    if (localStorage.getItem('userToken')) {
      setLoginStatus(true)
    }
  }, []);

  // console.log(cpas)
  
  let authLink = <div className="flex lg:gap-5 md:gap-4 sm:gap-3 gap-2">
    <Link to="/auth/signup">
      <h2 className="md:text-lg sm:text-md font-medium">Sign Up</h2>
    </Link>
    <p>|</p>
    <Link to="/auth/login">
      <h2 className="md:text-lg sm:text-md font-medium">Log In</h2>
    </Link>
  </div>

  if (loginStatus) {
        authLink = <button className="md:text-lg sm:text-md font-medium" 
        onClick={() => {
          localStorage.clear() 
          setLoginStatus(false)
        }}>
        Log Out
    </button>
  }

  return (
    <>
      <div className="bg-[#d6e5f3]" >

        <nav className="

        mx-[10%] 
        flex items-center justify-between h-20">
          <Link to="/">
            <img src={logo} width="200px"></img>
          </Link>
          {authLink}
        </nav>
      </div>

      <Routes>
        <Route
          path="/"
          element={
            <HomePage
              cpas={cpas}
              refreshQueue={getData}
              updateDetails={setDetailsData}
            />
          }
        />

        <Route
          path="/details/:id"
          element={<DetailsPage cpa={detailsData} />}
        />
        <Route path="/*" element={<NotFoundPage />} />
        <Route path="/auth/:formType" element={<AuthFormPage setLoginStatus={setLoginStatus} />} />
      </Routes>
    </>
  );
}
