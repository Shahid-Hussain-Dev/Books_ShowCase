import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Footer from "./footer";
import Viewer from "./Viewer";
import Preview from "./Preview";
import TimeRender, { CategoryRender } from "./Render";
import Hero from "./Hero";
import Search from "./Search";
import Saved from "./Saved";
export default function App() {
  const [search, setSearch] = useState(false);
  const [View, setView] = useState(null);
  const [save, setsave] = useState(false);
  const [isPreview, setPreview] = useState(null);
  const [redirect, setRedirect] = useState(null);
  const timer = useRef(null);
  const handlePreview = (book) => {
    clearTimeout(timer.current);
    timer.current = setTimeout(() => {
      setPreview(book);
    }, 1500);
  };
  const openPreview = (book) => {
    clearTimeout(timer.current);
    setView(book);
  };

  const handleMouseLeave = () => {
    clearTimeout(timer.current);
  };
  const closePreview = () => {
    clearTimeout(timer.current);
    setPreview(null);
  };
  useEffect(() => {
    return () => {
      clearTimeout(timer.current);
    };
  }, []);

  return (
    <div className="  bg-[#030014]">
      <nav
        id="nav"
        className="
    sticky top-0 z-50
    w-full
    flex items-center justify-between
    gap-4
    px-4 py-3
    bg-[#0b0b0f]/90
    backdrop-blur-xl
    border-b border-white/10
    shadow-[0_4px_20px_rgba(0,0,0,0.35)]
  "
      >
        {/* Logo */}
        <button
          className="
      group flex items-center gap-2
      shrink-0
      cursor-pointer
    "
        >
          {/* Brand Name */}
          <div className="leading-none">
            <h1
              className="
          text-lg sm:text-xl
          font-black
          tracking-tight
          text-white
        "
            >
              Books
              <span
                className="
            ml-1
            bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400
            bg-clip-text
            text-transparent
          "
              >
                Showcase
              </span>
            </h1>

            <p className="text-[9px] sm:text-[10px] text-gray-500 tracking-[0.2em] uppercase mt-1">
              Discover · Read · Explore
            </p>
          </div>
        </button>

        {/* Search */}
        <button
          onClick={() => setSearch(true)}
          className="
      flex-1 max-w-md
      flex items-center
      px-5 py-2.5
      rounded-2xl
      bg-white/5
      border border-white/10
      text-gray-500
      font-medium
      text-left
      transition-all duration-300
      hover:bg-white/10
      hover:border-blue-500/40
      hover:text-gray-300
      hover:shadow-[0_0_20px_rgba(59,130,246,0.12)]
      active:scale-[0.98]
    "
        >
          <span className="mr-2 text-lg">⌕</span>
          <span>Search books...</span>
        </button>

        {/* Actions */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setsave(true)}
            className="
        px-4 py-2
        rounded-xl
        text-gray-400
        font-semibold
        transition-all duration-200
        hover:bg-white/10
        hover:text-white
      "
          >
            Saved
          </button>
        </div>
      </nav>
      {search && (
        <section id="search">
          <Search openPreview={openPreview} setSearch={setSearch} />
        </section>
      )}
      {save && (
        <section>
          <Saved
            openPreview={openPreview}
            handleMouseLeave={handleMouseLeave}
            handlePreview={handlePreview}
            onback={() => setsave(false)}
          />
        </section>
      )}
      {View && (
        <section id="Viewer">
          <Viewer
            onClose={() => setView(false)}
            book={View}
            setView={setView}
            setRedirects={setRedirect}
          />
        </section>
      )}
     
      <section>
        <Hero setView={setView} />
      </section>
      <section id="Preview">
        <AnimatePresence>
          {isPreview && (
            <motion.div
              className="
              fixed
              inset-0
              z-[100]
              w-screen
              h-screen
              bg-black/40
              backdrop-blur-sm
              flex
              items-center
              justify-center
              p-4
            "
              onClick={() => setPreview(null)}
            >
              <div
                onClick={(event) => event.stopPropagation()}
                className="w-full flex justify-center"
              >
                <Preview
                  book={isPreview}
                  onClose={() => setPreview(null)}
                  setView={setView}
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </section>

      <main>
        {/* Today's Picks */}
        <section id="today-picks" className="w-full p-2">
          <h2 className="mb-1 text-xl font-bold text-gray-500">
            Today's Picks
          </h2>

          <div className="w-full overflow-x-auto pb-2">
            <TimeRender
              setView={setView}
              handleMouseLeave={handleMouseLeave}
              handlePreview={handlePreview}
              openPreview={openPreview}
              type="daily"
            />
          </div>
        </section>
        {/* All Time Favorites */}
        <section id="all-time-fav" className="w-full p-2">
          <h2 className="mb-1 text-xl font-bold text-gray-500">
            All Time Favorites
          </h2>

          <div className="w-full overflow-x-auto pb-2">
            <TimeRender
              setView={setView}
              handleMouseLeave={handleMouseLeave}
              handlePreview={handlePreview}
              openPreview={openPreview}
              type="now"
            />
          </div>
        </section>

        <section id="Romance" className="w-full p-2">
          <h2 className="mb-1 text-xl font-bold text-gray-500">Romance</h2>

          <div className="w-full overflow-x-auto pb-2">
            <CategoryRender
              handleMouseLeave={handleMouseLeave}
              handlePreview={handlePreview}
              openPreview={openPreview}
              category="romance"
            />
          </div>
        </section>
        <section id="Adventures" className="w-full p-2">
          <h2 className="mb-1 text-xl font-bold text-gray-500">Adventures</h2>

          <div className="w-full overflow-x-auto pb-2">
            <CategoryRender
              handleMouseLeave={handleMouseLeave}
              handlePreview={handlePreview}
              openPreview={openPreview}
              category="Adventure"
            />
          </div>
        </section>
        <section id="Stories" className="w-full p-2">
          <h2 className="mb-1 text-xl font-bold text-gray-500">Stories</h2>

          <div className="w-full overflow-x-auto pb-2">
            <CategoryRender
              handleMouseLeave={handleMouseLeave}
              handlePreview={handlePreview}
              openPreview={openPreview}
              category="stories"
            />
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
