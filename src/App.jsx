import Select from "react-select";
import NavBar from "./components/NavBar";
import "./app.css";
import { CountryCard } from "./components/CountryCard";
import { useEffect, useState } from "react";
const App = () => {
   const [countries, setCountries] = useState([]);
   const [searchTerm, setSearchTerm] = useState("");
   const [allCountries, setAllCountries] = useState([]);
   const [selectedRegion, setSelectedRegion] = useState(null);

   const regionOptions = [
      { value: "Africa", label: "Africa" },
      { value: "Americas", label: "America" },
      { value: "Asia", label: "Asia" },
      { value: "Europe", label: "Europe" },
      { value: "Oceania", label: "Oceania" },
    ];

    const customStyles = {
      control: (provided) => ({
        ...provided,
        fontFamily: 'inherit',
        padding: '0 20px',       
        border: 'none',
        fontSize: '1rem',
        outline: 'none',
        color: 'var(--text-color)',
        backgroundColor: 'var(--secondary--bg-color)',
        boxShadow: '0 3px 4px rgba(0, 0, 0, 0.1)',
        borderRadius: '6px',
        cursor: 'pointer',
        minHeight: '48px',
        minWidth: '200px',          
      }),
      singleValue: (provided) => ({
        ...provided,
        color: 'var(--text-color)',
      }),
      indicatorSeparator: (provided) => ({
         ...provided,
         display: "none",
       }),
      menu: (provided) => ({
        ...provided,
        borderRadius: '6px',
        boxShadow: '0 3px 8px rgba(0, 0, 0, 0.15)',
        backgroundColor: 'var(--secondary--bg-color)',
      }),
      option: (provided, state) => ({
        ...provided,
        backgroundColor: state.isFocused ? 'rgba(0,0,0,0.05)' : 'var(--secondary--bg-color)',
        color: 'var(--text-color)',
        cursor: 'pointer',
      }),
    };
    

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
            setAllCountries(sortedData);
         } catch (error) {
            console.error("Error fetching countries:", error);
         }
      };
      fetchCountries();
   }, []);

   useEffect(() => {
      let filtered = allCountries;
    
      if (searchTerm) {
        filtered = filtered.filter((country) =>
          country.name.common.toLowerCase().includes(searchTerm.toLowerCase())
        );
      }
    
      if (selectedRegion) {
        filtered = filtered.filter(
          (country) => country.region === selectedRegion.value
        );
      }
    
      setCountries(filtered);
    }, [searchTerm, selectedRegion, allCountries]);
    
   return (
      <div>
         <NavBar />
         <div className="container">
            <div className="search-filter">
               <div className="search-bar">
                  <img src="/assets/search.png" alt="search-icon"/>
                  <input type="text" placeholder="Search for a country..." value={searchTerm} onChange={(e)=>{setSearchTerm(e.target.value)}}/>
               </div>
               <div className="filter-bar">
                  <Select
                  options={regionOptions}
                  styles={customStyles}
                  placeholder="Filter by Region"
                  value={selectedRegion}
                  onChange={setSelectedRegion}
                 />
               </div>
            </div>
            <div className="country-list">
               {countries.length > 0 ? countries.map((country) => {
                  return (
                     <CountryCard key={country.name.common} country={country} />
                  );
               }):<div className="no-countries">No Countries Found</div>}
            </div>
         </div>
      </div>
   );
};

export default App;
