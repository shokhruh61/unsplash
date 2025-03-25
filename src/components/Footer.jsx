import { FaInstagram, FaTwitter, FaYoutube } from "react-icons/fa";

function Footer() {
  return (
    <footer className="bg-neutral py-6 text-neutral-content">
      <div className="container mx-auto flex flex-col items-center justify-between gap-4 px-4 md:flex-row">
        <p>© {new Date().getFullYear()} - All rights reserved</p>
        <div className="flex gap-4">
          <a
            href="https://youtube.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaYoutube className="h-7 w-7 hover:text-red-500" />
          </a>
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaInstagram className="h-7 w-7 hover:text-pink-500" />
          </a>
          <a href="https://x.com" target="_blank" rel="noopener noreferrer">
            <FaTwitter className="h-7 w-7 hover:text-blue-500" />
          </a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
