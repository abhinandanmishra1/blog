import { siteMetadata } from "../../data/metadata";

export const AboutAuthor = () => {
  const moveToNewsletter = () => {
    const newsletterSection = document.getElementById('newsletter');
    if (newsletterSection) {
      newsletterSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="bg-neutral-900 py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/10"></div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="relative">
            <div className="relative w-64 h-64 mx-auto lg:mx-0">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full animate-pulse"></div>
              <img src={siteMetadata.author.avatar} alt={siteMetadata.author.username} className="absolute inset-2 rounded-full w-60 h-60 object-cover border-4 border-neutral-800" />
            </div>
            <div className="absolute -bottom-4 left-1/2 lg:left-32 transform -translate-x-1/2 bg-neutral-800 rounded-full py-2 px-6 border border-neutral-700">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <span className="text-white text-sm font-medium">Available for hiring</span>
              </div>
            </div>
          </div>

          <div className="text-center lg:text-left">
            <div className="inline-block px-4 py-1 bg-neutral-800 rounded-full mb-6">
              <p className="text-neutral-400 text-sm">{siteMetadata.author.tagline}</p>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Hey, I'm {siteMetadata.author.name}</h2>
            <p className="text-neutral-300 text-lg mb-8 leading-relaxed">
              A passionate developer and technical writer sharing knowledge through detailed articles and tutorials.
            </p>
            
            <div className="flex flex-wrap gap-4 justify-center lg:justify-start mb-8">
              <div className="bg-neutral-800 rounded-xl p-4 border border-neutral-700">
                <div className="text-2xl font-bold text-white mb-1">50+</div>
                <div className="text-neutral-400 text-sm">Articles Published</div>
              </div>
              <div className="bg-neutral-800 rounded-xl p-4 border border-neutral-700">
                <div className="text-2xl font-bold text-white mb-1">10k+</div>
                <div className="text-neutral-400 text-sm">Readers Monthly</div>
              </div>
              <div className="bg-neutral-800 rounded-xl p-4 border border-neutral-700">
                <div className="text-2xl font-bold text-white mb-1">5+</div>
                <div className="text-neutral-400 text-sm">Years Experience</div>
              </div>
            </div>

            <div className="flex flex-wrap gap-4 justify-center lg:justify-start">
              <a href={siteMetadata.author.social.linkedin} className="inline-flex items-center px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-md transition-colors duration-300">
                Contact Me
              </a>
              <button onClick={moveToNewsletter} className="inline-flex items-center px-6 py-3 border border-neutral-600 text-white font-medium rounded-md hover:bg-neutral-800 transition-colors duration-300">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
