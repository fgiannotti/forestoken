import Link from "next/link";
import { FC } from "react";

const Navbar : FC = () => {
  return (
    <nav className="navbar">
      <div className="container">
        <Link href="/">Home</Link>
        <Link href="/about">About</Link>
        <Link href="/services">Services</Link>
      </div>
    </nav>
  );
}

export default Navbar;