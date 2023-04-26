import React from "react";

export default function Navbar() {
  return (
    <div>
      <div className="navbar bg-primary text-primary-content">
        <img class="h-14" src="./picto.png" alt="image description" />
        <p className="text-primary-content uppercase font-bold">
          Creative World
        </p>{" "}
        <a href="/" className="btn btn-ghost normal-case text-xl">
          Home{" "}
        </a>
      </div>
    </div>
  );
}
