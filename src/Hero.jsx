import { useEffect, useState } from "react";
import { Sparkles, BookOpen } from "lucide-react";

export default function Hero({setView}) {
  const [books, setBooks] = useState([]);
  const [selectedSubject, setSelectedSubject] = useState("");

  const getNewArrivals = async () => {
    try {
      const subjects = [
        "fiction",
        "fantasy",
        "romance",
        "science",
        "history",
        "adventure",
        "war",
      ];

      const subject = subjects[Math.floor(Math.random() * subjects.length)];

      setSelectedSubject(subject);

      const response = await fetch(
        `https://openlibrary.org/search.json?subject=${encodeURIComponent(
          subject,
        )}&sort=new&limit=5`,
      );

      if (!response.ok) {
        throw new Error(`HTTP error: ${response.status}`);
      }

      const data = await response.json();

      setBooks(data.docs || []);
    } catch (error) {
      console.error("Failed to fetch new arrivals:", error);
      setBooks([]);
    }
  };

  useEffect(() => {
    getNewArrivals();
  }, []);

  const formattedSubject = selectedSubject
    ? selectedSubject.charAt(0).toUpperCase() + selectedSubject.slice(1)
    : "Books";

  return (
    <section className="relative w-full overflow-hidden bg-[#030014]">
      <div className="pointer-events-none absolute -left-40 -top-40 h-96 w-96 rounded-full bg-purple-600/20 blur-[120px]" />

      <div className="pointer-events-none absolute -right-40 top-20 h-96 w-96 rounded-full bg-blue-600/20 blur-[120px]" />

      <div
        className="pointer-events-none absolute inset-0 opacity-[0.08]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)
          `,
          backgroundSize: "45px 45px",
        }}
      />

      {/* Dotted pattern */}
      <div className="pointer-events-none absolute inset-0 opacity-20 [background-image:radial-gradient(circle_at_1px_1px,white_1px,transparent_0)] [background-size:22px_22px]" />

      <div className="relative z-10 px-5 pb-4 pt-8 sm:px-8">
        {/* Small badge */}
        <div className="mb-4 flex items-center gap-2">
          <div className="flex items-center gap-2 rounded-full border border-purple-400/20 bg-purple-500/10 px-3 py-1.5 text-xs font-semibold text-purple-300 backdrop-blur-md">
            NEW ARRIVALS
          </div>

          <div className="h-px w-16 bg-gradient-to-r from-purple-400/50 to-transparent" />
        </div>

        {/* Main heading */}
        <div className="max-w-3xl">
          <h1 className="text-3xl font-black leading-tight tracking-tight text-white sm:text-5xl lg:text-6xl">
            Discover Your
            <br />
            <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">
              Next Story
            </span>
          </h1>

          <p className="mt-3 max-w-xl text-sm leading-relaxed text-gray-400 sm:text-base">
            Explore the latest additions to our collection. New stories, new
            adventures, and worlds waiting to be discovered.
          </p>
        </div>

        <div className="mt-8 flex items-center gap-3">
          <div>
            <p className="text-xs uppercase tracking-[0.25em] text-gray-500">
              Recently discovered
            </p>

            <h2 className="text-xl font-bold text-gray-200 sm:text-2xl">
              New Arrivals From{" "}
              <span className="text-purple-400">{formattedSubject}</span>
            </h2>
          </div>
        </div>
      </div>

    
      <div className="relative z-10 w-full overflow-x-auto px-6 pb-10 pt-6 scrollbar-none">
        {/* Background Showcase text */}
        <div className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 select-none whitespace-nowrap text-[120px] font-black uppercase tracking-widest text-white/[0.025] sm:text-[180px]">
          SHOWCASE
        </div>

        <div className="relative flex w-max items-center gap-7">
          {books.map((book) => (
            <div
            onClick={()=>setView(book)}
              key={book.key}
              className="group relative h-64 w-44 shrink-0 [perspective:1200px] sm:h-72 sm:w-48"
            >
           
              <div
                className="
                  relative
                  h-full
                  w-full
                  overflow-hidden
                  rounded-r-xl
                  rounded-l-md
                  border
                  border-white/10
                  bg-[#08051b]
                  shadow-[10px_18px_35px_rgba(0,0,0,0.55)]
                  transition-all
                  duration-500
                  ease-out
                  [transform:rotateY(-12deg)_rotateX(4deg)]
                  group-hover:[transform:rotateY(0deg)_rotateX(0deg)_translateY(-14px)_scale(1.03)]
                  group-hover:shadow-[15px_25px_45px_rgba(0,0,0,0.7)]
                "
              >
           
                <div className="absolute inset-y-0 left-0 z-20 w-1 bg-white/20" />

                {book.cover_i ? (
                  <img
                    src={`https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`}
                    alt={book.title || "Book cover"}
                    className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                  />
                ) : (
                  <div className="flex h-full w-full flex-col bg-gradient-to-br from-[#171044] via-[#090625] to-[#02010b] p-4">
                    <div className="mb-5 flex items-center gap-2 text-[9px] uppercase tracking-[0.25em] text-purple-300/70">
                      <div className="h-px flex-1 bg-purple-300/20" />
                      <span>Showcase</span>
                      <div className="h-px flex-1 bg-purple-300/20" />
                    </div>

                    <h3 className="line-clamp-4 text-xl font-black leading-tight text-white">
                      {book.title || "Untitled"}
                    </h3>

                    <div className="mt-10">
                      <p className="text-xs text-gray-500">Written by</p>

                      <p className="mt-1 line-clamp-2 text-sm font-semibold text-purple-300">
                        {book.author_name?.[0] || "Unknown Author"}
                      </p>
                    </div>
                  </div>
                )}

             
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-80" />

              
                <div className="pointer-events-none absolute -bottom-10 left-1/2 h-20 w-32 -translate-x-1/2 rounded-full bg-purple-500/30 blur-2xl opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

         
                <div className="absolute bottom-0 left-0 right-0 z-10">
                  <div className="flex h-8 items-center justify-center border-t border-white/10 bg-black/60 px-2 backdrop-blur-md">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-purple-300">
                      Recently Added
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-purple-950/20 to-transparent" />
    </section>
  );
}
