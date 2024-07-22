import React from "react";

function Footer() {
  return (
    <footer className="bg-zinc-800 text-center text-white py-4 mt-20">
      <p className="text-sm">
        © {new Date().getFullYear()} Nicolás Viruel. All rights reserved.
      </p>
      <p className="text-sm">
        Contact:{" "}
        <a
          href="mailto:nicolasviruel@gmail.com"
          className="text-blue-400 hover:underline"
        >
          nicolasviruel@gmail.com
        </a>
      </p>
    </footer>
  );
}

export default Footer;
