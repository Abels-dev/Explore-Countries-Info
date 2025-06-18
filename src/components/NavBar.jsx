import { useEffect, useState } from "react";

const NavBar = () => {
   const [currentTheme, setCurrentTheme] = useState("light");
   const handleClick = () => {
      document.body.classList.toggle("dark-mode");
      if (currentTheme === "light") {
         setCurrentTheme("dark");
         localStorage.setItem("theme", "dark");
      } else {
         setCurrentTheme("light");
         localStorage.setItem("theme", "light");
      }
   };

   useEffect(() => {
      const preferredTheme = localStorage.getItem("theme") || "light";
      setCurrentTheme(preferredTheme);
      document.body.classList.toggle("dark-mode", preferredTheme === "dark");
   }, []);
   return (
      <header>
         <h1>Where in the World?</h1>
         <div className="dark-mode-toggle-container">
            <button className="dark-mode-toggle" onClick={handleClick}>
               <img
                  src={`/assets/${
                     currentTheme === "light" ? "sun" : "moon"
                  }.png`}
                  alt={`${currentTheme}-mode`}
               />
            </button>
            <span>{currentTheme === "light" ? "Light Mode" : "Dark Mode"}</span>
         </div>
      </header>
   );
};

export default NavBar;
