import { useEffect, useRef, useState } from "react";
import { Search, X, Loader2, BookOpen, ArrowLeft } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
export default function SearchBooks({ setSearch, openPreview }) {
  const [query, setQuery] = useState("");
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);

  const inputRef = useRef(null);

  // Focus input when search opens
  useEffect(() => {
    inputRef.current?.focus();

    const handleEscape = (e) => {
      if (e.key === "Escape") {
        setSearch(false);
      }
    };

    window.addEventListener("keydown", handleEscape);

    return () => {
      window.removeEventListener("keydown", handleEscape);
    };
  }, [setSearch]);

  // Prevent background scrolling
  useEffect(() => {
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  const searchBooks = async (e) => {
    e?.preventDefault();

    const value = query.trim();

    if (!value) return;

    try {
      setLoading(true);
      setSearched(true);

      const res = await fetch(
        `https://openlibrary.org/search.json?q=${encodeURIComponent(
          value,
        )}&limit=30`,
      );

      if (!res.ok) {
        throw new Error(`HTTP error: ${res.status}`);
      }

      const data = await res.json();

      setBooks(data.docs || []);
    } catch (error) {
      console.error("Search failed:", error);
      setBooks([]);
    } finally {
      setLoading(false);
    }
  };

  const getCover = (book) => {
    if (book.cover_i) {
      return `https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`;
    }

    return null;
  };

  const handleBookClick = (book) => {
    openPreview(book);
  };

  return (
    <AnimatePresence>
      <motion.div
        className="
          fixed inset-0 z-[100]
          bg-[#08080c]/95
          backdrop-blur-xl
          text-white
          overflow-y-auto
        "
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        {/* Header */}
        <motion.header
          initial={{ y: -30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="
            sticky top-0 z-20
            bg-[#08080c]/90
            backdrop-blur-xl
            border-b border-white/10
          "
        >
          <div
            className="
              flex items-center gap-3
              px-4 py-4
            "
          >
            {/* Back */}
            <button
              onClick={() => setSearch(false)}
              className="
                shrink-0
                w-10 h-10
                flex items-center justify-center
                rounded-xl
                bg-white/5
                border border-white/10
                text-gray-400
                hover:text-white
                hover:bg-white/10
                transition
              "
              aria-label="Close search"
            >
              <ArrowLeft size={20} />
            </button>

            {/* Search Form */}
            <form onSubmit={searchBooks} className="flex-1">
              <div
                className="
                  flex items-center
                  gap-3
                  px-4
                  h-12
                  rounded-2xl
                  bg-white/5
                  border border-white/10
                  focus-within:border-blue-500/50
                  focus-within:shadow-[0_0_25px_rgba(59,130,246,0.15)]
                  transition-all
                "
              >
                <Search size={20} className="text-gray-500 shrink-0" />

                <input
                  ref={inputRef}
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search books, authors, subjects..."
                  className="
                    flex-1
                    bg-transparent
                    outline-none
                    text-white
                    placeholder:text-gray-600
                  "
                />

                {query && (
                  <button
                    type="button"
                    onClick={() => {
                      setQuery("");
                      setBooks([]);
                      setSearched(false);
                      inputRef.current?.focus();
                    }}
                    className="text-gray-500 hover:text-white"
                  >
                    <X size={18} />
                  </button>
                )}
              </div>
            </form>

            {/* Search button */}
            <button
              onClick={searchBooks}
              disabled={!query.trim() || loading}
              className="
                h-12
                px-6
                items-center
                gap-2
                rounded-2xl
                bg-blue-600
                text-white
                font-semibold
                hover:bg-blue-500
                disabled:opacity-40
                disabled:cursor-not-allowed
                transition
              "
            >
              <Search size={18} />
              Search
            </button>
          </div>
        </motion.header>

        {/* Content */}
        <main className="max-w-6xl mx-auto px-4 py-8">
          {/* Initial state */}
          {!searched && !loading && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="
                min-h-[60vh]
                flex flex-col
                items-center justify-center
                text-center
              "
            >
              <div
                className="
                  w-20 h-20
                  flex items-center justify-center
                  rounded-3xl
                  bg-gradient-to-br
                  from-blue-500/20
                  via-purple-500/20
                  to-pink-500/20
                  border border-white/10
                  mb-5
                "
              >
                <BookOpen size={38} className="text-blue-400" />
              </div>

              <h2 className="text-2xl font-bold">Discover your next book</h2>

              <p className="mt-2 text-gray-500 max-w-md">
                Search millions of books by title, author, subject, or keyword.
              </p>
            </motion.div>
          )}

          {/* Loading */}
          {loading && (
            <div
              className="
                min-h-[50vh]
                flex flex-col
                items-center justify-center
                gap-4
              "
            >
              <Loader2 size={42} className="animate-spin text-blue-400" />

              <p className="text-gray-500 font-medium">Searching books...</p>
            </div>
          )}

          {/* Results */}
          {!loading && searched && books.length > 0 && (
            <>
              <div className="mb-6">
                <h2 className="text-xl font-bold">Search Results</h2>

                <p className="text-sm text-gray-500 mt-1">
                  Found {books.length} books for{" "}
                  <span className="text-gray-300">"{query}"</span>
                </p>
              </div>

              <div
                className="
                  grid
                  grid-cols-2
                  sm:grid-cols-3
                  md:grid-cols-4
                  lg:grid-cols-5
                  xl:grid-cols-6
                  gap-4
                "
              >
                {books.map((book, index) => {
                  const cover = getCover(book);

                  return (
                    <motion.button
                      key={`${book.key}-${index}`}
                      onClick={() => handleBookClick(book)}
                      initial={{
                        opacity: 0,
                        y: 20,
                      }}
                      animate={{
                        opacity: 1,
                        y: 0,
                      }}
                      transition={{
                        delay: Math.min(index * 0.03, 0.4),
                      }}
                      className="
                        group
                        text-left
                        rounded-xl
                        overflow-hidden
                        bg-white/[0.03]
                        border border-white/5
                        hover:border-blue-500/30
                        hover:bg-white/[0.06]
                        transition-all duration-300
                      "
                    >
                      {/* Cover */}
                      <div
                        className="
                          relative
                          aspect-[2/3]
                          bg-gray-900
                          overflow-hidden
                        "
                      >
                        {cover ? (
                          <img
                            src={cover}
                            alt={book.title}
                            loading="lazy"
                            className="
                              w-full h-full
                              object-cover
                              transition-transform duration-500
                              group-hover:scale-105
                            "
                          />
                        ) : (
                          <div
                            className="
                              w-full h-full
                              flex flex-col
                              items-center
                              justify-center
                              p-4
                              bg-gradient-to-br
                              from-gray-800
                              to-gray-950
                              text-center
                            "
                          >
                            <BookOpen
                              size={35}
                              className="text-gray-600 mb-3"
                            />

                            <span className="text-sm font-semibold text-gray-400">
                              {book.title || "Unknown"}
                            </span>
                          </div>
                        )}

                        {/* Hover overlay */}
                        <div
                          className="
                            absolute inset-0
                            bg-gradient-to-t
                            from-black/70
                            via-transparent
                            to-transparent
                            opacity-0
                            group-hover:opacity-100
                            transition-opacity
                          "
                        />
                      </div>

                      {/* Details */}
                      <div className="p-3">
                        <h3
                          className="
                            text-sm
                            font-semibold
                            text-gray-200
                            line-clamp-2
                          "
                        >
                          {book.title || "Unknown Title"}
                        </h3>

                        <p
                          className="
                            mt-1
                            text-xs
                            text-gray-500
                            line-clamp-1
                          "
                        >
                          {book.author_name?.[0] || "Unknown Author"}
                        </p>

                        {book.first_publish_year && (
                          <p className="mt-1 text-[11px] text-gray-600">
                            {book.first_publish_year}
                          </p>
                        )}
                      </div>
                    </motion.button>
                  );
                })}
              </div>
            </>
          )}

          {/* No results */}
          {!loading && searched && books.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="
                min-h-[50vh]
                flex flex-col
                items-center justify-center
                text-center
              "
            >
              <div
                className="
                  w-16 h-16
                  rounded-2xl
                  bg-white/5
                  flex items-center justify-center
                  mb-4
                "
              >
                <Search size={30} className="text-gray-600" />
              </div>

              <h2 className="text-xl font-bold text-gray-300">
                No books found
              </h2>

              <p className="text-gray-600 mt-2">
                Try another title, author, or keyword.
              </p>
            </motion.div>
          )}
        </main>
      </motion.div>
    </AnimatePresence>
  );
}
