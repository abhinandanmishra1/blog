import { Github, Linkedin, Mail, Twitter } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="bg-neutral-900 border-t border-neutral-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          <div className="space-y-6">
            <div className="text-white text-2xl font-bold">TechBlog</div>
            <p className="text-neutral-400">Exploring the latest in web development, programming, and technology through in-depth articles and tutorials.</p>
            <div className="flex space-x-4">
              <a href="#" className="text-neutral-400 hover:text-white transition-colors duration-300">
                <Twitter className="h-6 w-6" />
              </a>
              <a href="#" className="text-neutral-400 hover:text-white transition-colors duration-300">
                <Github className="h-6 w-6" />
              </a>
              <a href="#" className="text-neutral-400 hover:text-white transition-colors duration-300">
                <Linkedin className="h-6 w-6" />
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-6">Quick Links</h3>
            <ul className="space-y-4">
              <li><a href="#" className="text-neutral-400 hover:text-white transition-colors duration-300">Home</a></li>
              <li><a href="#" className="text-neutral-400 hover:text-white transition-colors duration-300">About</a></li>
              <li><a href="#" className="text-neutral-400 hover:text-white transition-colors duration-300">Articles</a></li>
              <li><a href="#" className="text-neutral-400 hover:text-white transition-colors duration-300">Categories</a></li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-6">Categories</h3>
            <ul className="space-y-4">
              <li><a href="#" className="text-neutral-400 hover:text-white transition-colors duration-300">React</a></li>
              <li><a href="#" className="text-neutral-400 hover:text-white transition-colors duration-300">JavaScript</a></li>
              <li><a href="#" className="text-neutral-400 hover:text-white transition-colors duration-300">Web Development</a></li>
              <li><a href="#" className="text-neutral-400 hover:text-white transition-colors duration-300">Programming</a></li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-6">Stay Updated</h3>
            <p className="text-neutral-400 mb-4">Subscribe to our newsletter for the latest updates.</p>
            <form className="space-y-4">
              <div className="relative">
                <input 
                  type="email" 
                  placeholder="Enter your email" 
                  className="w-full px-4 py-2 bg-neutral-800 border border-neutral-700 rounded-lg text-white placeholder-neutral-500 focus:outline-none focus:border-blue-500 transition-colors duration-300" 
                />
                <button type="submit" className="absolute right-2 top-1/2 -translate-y-1/2">
                  <Mail className="w-5 h-5 text-neutral-400 hover:text-white transition-colors duration-300" />
                </button>
              </div>
            </form>
          </div>
        </div>

        <div className="pt-8 border-t border-neutral-800">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-neutral-400 text-sm">
              © 2024 TechBlog. All rights reserved.
            </div>
            <div className="flex space-x-6 text-sm">
              <a href="#" className="text-neutral-400 hover:text-white transition-colors duration-300">Privacy Policy</a>
              <a href="#" className="text-neutral-400 hover:text-white transition-colors duration-300">Terms of Service</a>
              <a href="#" className="text-neutral-400 hover:text-white transition-colors duration-300">Cookie Policy</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;