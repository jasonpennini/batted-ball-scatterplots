import React from 'react';
import '../index.css';

const Navbar = () => {
  return (
    <header className="bg-white py-3">
      <div className="container">
        <div className="row align-items-center">
          <div className="col">
            <h1 className="m-0">Batted Ball Scatterplots</h1>
          </div>
          <div className="col-auto">
            <img 
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/7/7a/Atlanta_Braves_Insignia.svg/2188px-Atlanta_Braves_Insignia.svg.png" 
              alt="Atlanta Braves Logo" 
              className="logo"
            />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;