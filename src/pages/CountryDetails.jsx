import { Link, useParams } from "react-router-dom";
import NavBar from "../components/NavBar";
import { useEffect, useState } from "react";
import { ArrowLeft } from "lucide-react";

const CountryDetails = () => {
   const { name } = useParams();
   const [details, setDetails] = useState(null);
   const [borderCountries, setBorderCountries] = useState([]);
   useEffect(() => {
      const fetchCountryDetails = async () => {
         try {
            const response = await fetch(
               `https://restcountries.com/v3.1/name/${name}`
            );
            if (!response.ok) {
               throw new Error("Network response was not ok");
            }
            const data = await response.json();
            const country = data[0];
            setDetails(country);
            if (country.borders && country.borders.length > 0) {
               const codes = country.borders.join(",");
               const bordersRes = await fetch(
                  `https://restcountries.com/v3.1/alpha?codes=${codes}&fields=name`
               );
               const bordersData = await bordersRes.json();
               const borderNames = bordersData.map(
                  (border) => ({commonName:border.name.common,officialName:border.name.official})
               );
               setBorderCountries(borderNames);
            } else {
               setBorderCountries([]);
            }
         } catch (error) {
            console.error("Error fetching country details:", error);
         }
      };
      fetchCountryDetails();
   }, [name]);
   return (
      <div>
         <NavBar />
         <div className="container">
            <button
               className="btn-primary"
               onClick={() => window.history.back()}>
               <ArrowLeft className="left-arrow" />
               Back
            </button>
            {details ? (
               <div className="country-details">
                  <img src={details.flags.png} />
                  <div className="details-info">
                     <div>
                        <h2>{details.name.common}</h2>
                        <p>
                           Native Name:{" "}
                           <span>
                              {details.name.nativeName
                                 ? Object.values(details.name.nativeName)[0]
                                      .common
                                 : "N/A"}
                           </span>
                        </p>
                        <p>
                           Population: <span>{details.population}</span>
                        </p>
                        <p>
                           Region: <span>{details.region}</span>
                        </p>
                        <p>
                           Subregion: <span>{details.subregion || "N/A"}</span>
                        </p>
                        <p>
                           Capital:{" "}
                           <span>
                              {details.capital ? details.capital[0] : "N/A"}
                           </span>
                        </p>
                     </div>
                     <div>
                        <p>
                           Top Level Domain:{" "}
                           <span>
                              {details.tld ? details.tld.join(", ") : "N/A"}
                           </span>
                        </p>
                        <p>
                           Currencies:{" "}
                           <span>
                              {details.currencies
                                 ? Object.values(details.currencies)
                                      .map((currency) => currency.name)
                                      .join(", ")
                                 : "N/A"}
                           </span>
                        </p>
                        <p>
                           Languages:{" "}
                           <span>
                              {details.languages
                                 ? Object.values(details.languages).join(", ")
                                 : "N/A"}
                           </span>
                        </p>
                     </div>
                     <div className="border-countries">
                        <p>Border Countries :</p>
                        <div>
                           {borderCountries.length > 0 ? (
                              borderCountries.map((borderCountry, index) => (
                                 <button
                                    key={index}
                                    className="btn-primary border-btn">
                                    <Link to={`/details/${borderCountry.officialName}`} className="link-text">{borderCountry.commonName}</Link>
                                 </button>
                              ))
                           ) : (
                              <span>N/A</span>
                           )}
                        </div>
                     </div>
                  </div>
               </div>
            ) : (
               <div className="loading">Loading...</div>
            )}
         </div>
      </div>
   );
};

export default CountryDetails;
