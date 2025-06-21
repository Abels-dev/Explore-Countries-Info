import { Link } from "react-router-dom";

export const CountryCard = ({country}) => {
   return (
      <div className="country-card">
         <div className="country-flag">
            <img src={country.flags.png} />
         </div>
         <div className="country-info">
            <Link to={`/details/${country.name.official}`} className="country-name"><h2>{country.name.common}</h2></Link>
            <p>
               Population: <span>{country.population}</span>
            </p>
            <p>
               Region: <span>{country.region}</span>
            </p>
            <p>
               Capital: <span>{country.capital[0]}</span>
            </p>
         </div>
      </div>
   );
};
