import { Check, Github, Linkedin, Mail, Twitter } from "lucide-react";

import { Link } from "react-router-dom";
import { siteMetadata } from "../../data/metadata";
import { useSubscribeToNewsletter } from "../../hooks/useSubscribeToNewsletter";

export const Footer = () => {
  const {
    mutate: subscribeToNewsletter,
    data,
    isIdle,
    isLoading,
  } = useSubscribeToNewsletter();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const email = formData.get("email") as string;
    subscribeToNewsletter(email);
  };

  return (
    <footer className="bg-neutral-900 border-t border-neutral-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          <div className="space-y-6">
            <div className="text-white text-2xl font-bold">
              {siteMetadata.title}
            </div>
            <p className="text-neutral-400">{siteMetadata.description}</p>
            <div className="flex space-x-4">
              <a
                href={siteMetadata.author.social.twitter}
                className="text-neutral-400 hover:text-white transition-colors duration-300"
              >
                <Twitter className="h-6 w-6" />
              </a>
              <a
                href={siteMetadata.author.social.github}
                className="text-neutral-400 hover:text-white transition-colors duration-300"
              >
                <Github className="h-6 w-6" />
              </a>
              <a
                href={siteMetadata.author.social.linkedin}
                className="text-neutral-400 hover:text-white transition-colors duration-300"
              >
                <Linkedin className="h-6 w-6" />
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-6">Quick Links</h3>
            {/* this link should separate in two columns */}
            <div className="grid grid-cols-2">
              <ul className="space-y-4">
                <li>
                  <Link
                    to="/"
                    className="text-neutral-400 hover:text-white transition-colors duration-300"
                  >
                    Home
                  </Link>
                </li>
                <li>
                  <Link
                    to="/about"
                    className="text-neutral-400 hover:text-white transition-colors duration-300"
                  >
                    About
                  </Link>
                </li>
                <li>
                  <Link
                    to="/articles"
                    className="text-neutral-400 hover:text-white transition-colors duration-300"
                  >
                    Articles
                  </Link>
                </li>
                <li>
                  <Link
                    to="/categories"
                    className="text-neutral-400 hover:text-white transition-colors duration-300"
                  >
                    Categories
                  </Link>
                </li>
              </ul>
              <ul className="space-y-4">
                <li>
                  <Link
                    to="/"
                    className="text-neutral-400 hover:text-white transition-colors duration-300"
                  >
                    Home
                  </Link>
                </li>
                <li>
                  <Link
                    to="/about"
                    className="text-neutral-400 hover:text-white transition-colors duration-300"
                  >
                    About
                  </Link>
                </li>
                <li>
                  <Link
                    to="/articles"
                    className="text-neutral-400 hover:text-white transition-colors duration-300"
                  >
                    Articles
                  </Link>
                </li>
                <li>
                  <Link
                    to="/categories"
                    className="text-neutral-400 hover:text-white transition-colors duration-300"
                  >
                    Categories
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-6">Categories</h3>
            <ul className="space-y-4">
              <li>
                <a
                  href="#"
                  className="text-neutral-400 hover:text-white transition-colors duration-300"
                >
                  React
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-neutral-400 hover:text-white transition-colors duration-300"
                >
                  JavaScript
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-neutral-400 hover:text-white transition-colors duration-300"
                >
                  Web Development
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-neutral-400 hover:text-white transition-colors duration-300"
                >
                  Programming
                </a>
              </li>
            </ul>
          </div>

          {(isIdle || isLoading) && (
            <div>
              <h3 className="text-white font-semibold mb-6">Stay Updated</h3>
              <p className="text-neutral-400 mb-4">
                Subscribe to our newsletter for the latest updates.
              </p>
              <form className="space-y-4" onSubmit={handleSubmit}>
                <div className="flex gap-2">
                  <div className="relative flex-1">
                    <input
                      name="email"
                      type="email"
                      placeholder="Enter your email"
                      className="w-full px-4 py-2 bg-neutral-800 border border-neutral-700 rounded-lg text-white placeholder-neutral-500 focus:outline-none focus:border-blue-500 transition-colors duration-300"
                    />
                  </div>
                  <button
                    type="submit"
                    className="flex items-center gap-2 px-4 py-2 bg-neutral-800 hover:bg-neutral-700 border border-neutral-700 rounded-lg text-neutral-400 hover:text-white transition-colors duration-300"
                  >
                    <Mail className="w-4 h-4" />
                    <span className="text-sm">Subscribe</span>
                  </button>
                </div>
              </form>
            </div>
          )}

          {data?.status === "PENDING" && (
            <div>
              <div className="flex items-center gap-2 text-green-400">
                <Check className="w-5 h-5" />
                <p>Thank you for subscribing!</p>
              </div>
            </div>
          )}

          {data?.error && (
            <div>
              <p className="text-red-400">{data.error}</p>
            </div>
          )}
        </div>

        <div className="pt-8 border-t border-neutral-800">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-neutral-400 text-sm">
              © 2024 {siteMetadata.title}. All rights reserved.
            </div>
            <div className="flex space-x-6 text-sm">
              <a
                href="#"
                className="text-neutral-400 hover:text-white transition-colors duration-300"
              >
                Privacy Policy
              </a>
              <a
                href="#"
                className="text-neutral-400 hover:text-white transition-colors duration-300"
              >
                Terms of Service
              </a>
              <a
                href="#"
                className="text-neutral-400 hover:text-white transition-colors duration-300"
              >
                Cookie Policy
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
