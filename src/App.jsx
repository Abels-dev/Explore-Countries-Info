import NavBar from "./components/NavBar";
import "./app.css";
import { CountryCard } from "./components/CountryCard";
import { useEffect, useState } from "react";
const App = () => {
   const [countries, setCountries] = useState([]);

   useEffect(() => {
      const fetchCountries = async () => {
         try {
            const res = await fetch(
               "https://restcountries.com/v3.1/all?fields=flags,name,population,region,capital"
            );
            const data = await res.json();
            const sortedData = data.sort((a, b) =>
               a.name.common.localeCompare(b.name.common)
            );            
            setCountries(sortedData);

         } catch (error) {
            console.error("Error fetching countries:", error);
         }
      };
      fetchCountries();
   },[]);
   return (
      <div>
         <NavBar />
         <div className="container">
            <div className="country-list">
               {countries.map((country) => {
                  return (
                     <CountryCard key={country.name.common} country={country} />
                  );
               })}
            </div>
         </div>
      </div>
   );
};

export default App;
