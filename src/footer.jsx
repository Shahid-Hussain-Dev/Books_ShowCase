import { Copyright, ExternalLink,  BookOpen ,X } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-black text-white border-t border-gray-800">
      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="p-2 rounded-lg bg-white/10">
                <BookOpen size={22} />
              </div>

              <h2 className="text-xl font-bold">
                Book<span className="text-gray-400">Showcase</span>
              </h2>
            </div>

            <p className="text-sm text-gray-400 leading-6">
              Discover, explore and preview books from different sources
              in one simple place.
            </p>
          </div>

          {/* Sources */}
          <div>
            <h3 className="font-semibold text-white mb-4">
              Sources
            </h3>

            <div className="flex flex-col gap-3 text-sm">
              <a
                href="open-library"
                className="text-gray-400 hover:text-white transition-colors duration-200 flex items-center gap-2"
              >
                Open Library
                <ExternalLink size={13} />
              </a>

              <a
                href="google-library"
                className="text-gray-400 hover:text-white transition-colors duration-200 flex items-center gap-2"
              >
                Google Books
                <ExternalLink size={13} />
              </a>
            </div>
          </div>

          {/* Developer Links */}
          <div>
            <h3 className="font-semibold text-white mb-4">
              Developer Links
            </h3>

            <div className="flex flex-col gap-3 text-sm">
              <a
                href="portfolio"
                className="text-gray-400 hover:text-white transition-colors duration-200 flex items-center gap-2"
              >
                Portfolio
                <ExternalLink size={13} />
              </a>

              <a
                href="linkedin"
                className="text-gray-400 hover:text-white transition-colors duration-200 flex items-center gap-2"
              >
                
                LinkedIn
              </a>

              <a
                href="github"
                className="text-gray-400 hover:text-white transition-colors duration-200 flex items-center gap-2"
              >
              
                GitHub
              </a>
            </div>
          </div>

          {/* Projects */}
          <div>
            <h3 className="font-semibold text-white mb-4">
              More Projects
            </h3>

            <div className="flex flex-col gap-3 text-sm">
              <a
                href="easy-life"
                className="text-gray-400 hover:text-white transition-colors duration-200"
              >
                Easy-Life
              </a>

              <a
                href="linksphere"
                className="text-gray-400 hover:text-white transition-colors duration-200"
              >
                LinkSphere
              </a>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="my-10 border-t border-gray-800" />

        {/* Disclaimer */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs text-gray-500 leading-5">
          <p>
            We are not the owners of the full content of this website,
            including book data and metadata provided by external sources.
          </p>

          <p>
            We retain copyright over the original design, interface,
            organization, and original content created for this website.
          </p>
        </div>

        {/* Bottom Divider */}
        <div className="my-8 border-t border-gray-800" />

        {/* Copyright */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-sm">
          <p className="flex items-center gap-2 font-semibold">
            Shahid Hussain
            <Copyright size={14} />
            2026
          </p>

          <p className="text-xs text-gray-500">
            Built with React & Tailwind CSS
          </p>
        </div>
      </div>
    </footer>
  );
}