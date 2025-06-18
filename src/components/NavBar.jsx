const NavBar = () => {
   return (
      <div>
         <h1>Where in the World?</h1>
         <div className="dark-mode-toggle-container">
            <button className="dark-mode-toggle">
               <img src="../assets/moon.png" alt="light-mode"/>
            </button>
            <span>Dark Mode</span>
         </div>
      </div>
   );
};

export default NavBar;
