'use client'

import { Check, Mail, Send } from "lucide-react";
import { useState } from "react";

export const Newsletter = () => {
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubscribed(true);
      setIsLoading(false);
    }, 1000);
  };

  return (
    <section
      id="newsletter"
      className="bg-neutral-900 py-24 relative overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/10"></div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Stay Updated with Latest Articles
          </h2>
          <p className="text-neutral-400 text-lg">
            Get notified about new articles, tutorials, and tech insights
            delivered straight to your inbox.
          </p>
        </div>

        <div className="max-w-xl mx-auto">
          {!isSubscribed && (
            <div className="bg-neutral-800 border border-neutral-700 rounded-2xl p-8">
              <form className="space-y-6" onSubmit={handleSubmit}>
                <div className="space-y-4">
                  <input
                    type="email"
                    name="email"
                    placeholder="Enter your email"
                    className="w-full bg-neutral-900 border border-neutral-700 rounded-lg px-4 py-3 text-white placeholder-neutral-500 focus:outline-none focus:border-blue-500 transition-colors duration-300"
                    required
                  />
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-800 text-white font-medium py-3 px-4 rounded-lg transition-colors duration-300 flex items-center justify-center gap-2"
                >
                  {isLoading ? (
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <>
                      <Mail className="w-5 h-5" />
                      Subscribe Now
                    </>
                  )}
                </button>
              </form>

              <div className="mt-6 pt-6 border-t border-neutral-700">
                <div className="flex items-center justify-center gap-6 text-neutral-400">
                  <div className="flex items-center gap-2">
                    <Check className="w-5 h-5 text-green-400" />
                    <span className="text-sm">No Spam</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-5 h-5 text-green-400" />
                    <span className="text-sm">Weekly Updates</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-5 h-5 text-green-400" />
                    <span className="text-sm">Unsubscribe Anytime</span>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          {isSubscribed && (
            <div className="flex flex-col items-center overflow-hidden rounded-lg border border-green-600 bg-neutral-800 p-5 text-center text-white">
              <span className="text-green-400">
                <Send className="mb-5 h-10 w-10 animate-bounce" />
              </span>
              <p className="font-semibold">
                Thank you for subscribing!
                <br />
                You&apos;ll receive our latest articles and updates.
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
