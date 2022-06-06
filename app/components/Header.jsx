import React from "react";
import { Link } from "react-router-dom";

function Header() {
  return (
    <header className="header-bar bg-primary mb-3">
      <div className="container d-flex flex-column flex-md-row align-items-center p-3">
        <h4 className="my-0 mr-md-auto font-weight-normal">
          <Link className="text-white" to="/">
            ComplexApp
          </Link>
        </h4>
      </div>
    </header>
  );
}

export default Header;
