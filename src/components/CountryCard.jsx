export const CountryCard = ({country}) => {
   return (
      <div className="country-card">
         <div className="country-flag">
            <img src={country.flags.png} />
         </div>
         <div className="country-info">
            <h2>{country.name.common}</h2>
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
