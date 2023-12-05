import React from "react";

export default function Navbar() {
  return (
    <div>
      <div className="navbar bg-orange-700 text-primary-content">
        <img class="h-14" src="./picto2.png" alt="image description" />
        <p className="text-primary-content uppercase font-bold">
          Algerie Poultry forum
        </p>{" "}
        <a href="/" className="btn btn-ghost normal-case text-xl">
          Home{" "}
        </a>
      </div>
    </div>
  );
}
