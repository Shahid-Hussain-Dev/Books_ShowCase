import { useEffect, useState, useRef } from "react";
import { ArrowLeft, Loader2 } from "lucide-react";
import Related, { FromAuthor } from "./More";
import { FromSeries } from "./More";
export default function Viewer({ book, onClose, setView,setRedirects }) {
  const [allLang, setAllLang] = useState(false);
  const [tab, setTab] = useState("related");
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    const savedBooks = JSON.parse(localStorage.getItem("books")) || [];

    setIsSaved(savedBooks.some((savedBook) => savedBook.key === book.key));
  }, [book.key]);

  const handleSave = () => {
    const savedBooks = JSON.parse(localStorage.getItem("books")) || [];

    const alreadySaved = savedBooks.some(
      (savedBook) => savedBook.key === book.key,
    );

    if (alreadySaved) {
      const updatedBooks = savedBooks.filter(
        (savedBook) => savedBook.key !== book.key,
      );

      localStorage.setItem("books", JSON.stringify(updatedBooks));

      setIsSaved(false);
      return false;
    }

    const updatedBooks = [...savedBooks, book];

    localStorage.setItem("books", JSON.stringify(updatedBooks));

    setIsSaved(true);
    return true;
  };
  const tabs = [
    { id: "related", label: "Related" },
    {
      id: "author",
      label: `From ${book.author_name || book.authors?.[0]?.name || "Author"}`,
    },
    { id: "series", label: "From Series" },
  ];

  if (!book) {
    return (
      <div
        className="min-h-screen  flex items-center justify-center    fixed inset-0 z-[100]
          bg-[#08080c]/95
          backdrop-blur-xl
          text-white
          overflow-y-auto
         bg-gray-100"
      >
        <p className="text-gray-500">Something went wrong</p>
      </div>
    );
  }

  const languages = book.language || [];

  return (
    <main
      className="min-h-screen bg-gray-100 p-2 sm:p-4    fixed inset-0 z-[100]
          bg-[#08080c]/95
          backdrop-blur-xl
          text-black
          overflow-y-auto
        "
    >
      <div className="mx-auto flex max-w-5xl flex-col gap-4">
        {/* Book Hero */}
        <section className="relative overflow-hidden rounded-3xl bg-gray-900 shadow-lg">
          {/* Cover */}
          {book.cover_i || book.cover_id ? (
            <img
              src={`https://covers.openlibrary.org/b/id/${book.cover_i?book.cover_i:book.cover_id}-M.jpg`}
              alt={book.title || "Book cover"}
              className="h-80 w-full object-cover sm:h-96 md:h-[500px]"
            />
          ) : (
            <div
              className="
      relative overflow-hidden
      h-80 w-full
      sm:h-96 sm:w-64
      md:h-[500px] md:w-80
      rounded
      shadow-[1px_3px_8px_rgba(0,0,0,0.35)]
      flex flex-col justify-between
      p-5 sm:p-7
      text-white
      bg-gradient-to-br from-slate-950 via-slate-800 to-indigo-950
    "
            >
              <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-indigo-500/20 blur-2xl" />

              <div className="absolute -bottom-16 -left-10 h-40 w-40 rounded-full bg-purple-500/20 blur-2xl" />

              <div
                className="
        absolute inset-0 opacity-10
        bg-[radial-gradient(circle_at_1px_1px,white_1px,transparent_0)]
        bg-[size:18px_18px]
      "
              />

              {/* Top */}
              <div className="relative z-10">
                <div className="mb-4 h-1 w-10 rounded-full bg-indigo-400" />

                <p className="text-[10px] uppercase tracking-[0.3em] text-slate-400 sm:text-xs">
                  Book Showcase
                </p>
              </div>

              {/* Bottom */}
              <div className="relative z-10">
                {book.author_name?.[0] && (
                  <p className="mb-3 text-xs text-slate-300 sm:text-sm">
                    {book.author_name[0]}
                  </p>
                )}

                <div className="flex items-center gap-2">
                  <div className="h-px flex-1 bg-white/20" />

                  <span className="text-[8px] font-medium uppercase tracking-widest text-slate-400 sm:text-[10px]">
                    Cover unavailable
                  </span>
                </div>
              </div>
            </div>
          )}
          <div className="absolute top-2 left-50 ">
            {book.cover_i || book.cover_id ? (
              <img
                src={`https://covers.openlibrary.org/b/id/${book.cover_i ? book.cover_i : book.cover_id}-M.jpg`}
                alt={book.title || "Book cover"}
                className="h-50 rounded shadow-[1px_3px_5px] w-fit object-cover sm:h-96 md:h-[500px]"
              />
            ) : (
              <div
                className="
      relative overflow-hidden
      h-50 w-40
      sm:h-96 sm:w-64
      md:h-[500px] md:w-80
      rounded
      shadow-[1px_3px_8px_rgba(0,0,0,0.35)]
      flex flex-col justify-between
      p-5 sm:p-7
      text-white
      bg-gradient-to-br from-slate-950 via-slate-800 to-indigo-950
    "
              >
                <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-indigo-500/20 blur-2xl" />

                <div className="absolute -bottom-16 -left-10 h-40 w-40 rounded-full bg-purple-500/20 blur-2xl" />

                <div
                  className="
        absolute inset-0 opacity-10
        bg-[radial-gradient(circle_at_1px_1px,white_1px,transparent_0)]
        bg-[size:18px_18px]
      "
                />

                {/* Top */}
                <div className="relative z-10">
                  <div className="mb-4 h-1 w-10 rounded-full bg-indigo-400" />

                  <p className="text-[10px] uppercase tracking-[0.3em] text-slate-400 sm:text-xs">
                    Book Showcase
                  </p>
                </div>

                {/* Title */}
                <div className="relative z-10 flex flex-1 items-center">
                  <h1
                    className="
          break-words
          text-xl font-bold leading-tight
          sm:text-3xl
          md:text-4xl
        "
                  >
                    {book.title || "Untitled Book"}
                  </h1>
                </div>

                {/* Bottom */}
                <div className="relative z-10">
                  {book.author_name?.[0] && (
                    <p className="mb-3 text-xs text-slate-300 sm:text-sm">
                      {book.author_name[0]}
                    </p>
                  )}

                  <div className="flex items-center gap-2">
                    <div className="h-px flex-1 bg-white/20" />

                    <span className="text-[8px] font-medium uppercase tracking-widest text-slate-400 sm:text-[10px]">
                      Cover unavailable
                    </span>
                  </div>
                </div>
              </div>
            )}
          </div>
          <button
            onClick={onClose}
            className="absolute left-2 top-2 bg-[#333334] rounded-full text-white z-20 p-3 shadow cursor-pointer"
          >
            <ArrowLeft />
          </button>
          {/* Overlay */}
          <div className="absolute inset-x-0 bottom-0 bg-linear-to-t from-black/90 via-black/60 to-transparent p-4 pt-16 sm:p-6 sm:pt-24 z-50">
            <div className="flex flex-wrap gap-2">
              <span className="rounded-xl bg-white/90 px-3 py-2 text-sm font-medium">
                Author: {book.author_name || book.authors[0]?.name || "Unknown"}
              </span>

              {book.series_name && (
                <span className="rounded-xl bg-white/90 px-3 py-2 text-sm font-medium">
                  Series: {book.series_name}
                </span>
              )}
              {book.edition_count && (
                <span className="rounded-xl bg-white/90 px-3 py-2 text-sm font-medium">
                  Total Editions: {book.edition_count}
                </span>
              )}
              <span className="rounded-xl bg-white/90 px-3 py-2 text-sm font-medium">
                Published: {book.first_publish_year || "Unknown"}
              </span>

              <span className="rounded-xl bg-white/90 px-3 py-2 text-sm font-medium">
                {book.has_fulltext
                  ? "Full Text Available"
                  : "Full Text May Not Be Available"}
              </span>

              {book.ebook_access && (
                <span className="rounded-xl bg-white/90 px-3 py-2 text-sm font-medium">
                  {book.ebook_access}
                </span>
              )}
            </div>
          </div>
        </section>

        {/* Book Information */}
        <section className="rounded-3xl bg-white p-4 shadow-sm sm:p-5">
          <h1 className="text-xl font-bold text-gray-900 sm:text-2xl">
            {book.title || "Untitled Book"}
          </h1>
          {book.description && (
            <div>
              <h1>Description</h1>
              <p>{book.description}</p>
            </div>
          )}
          {/* Languages */}
          <div
            className="
    mt-4 flex flex-wrap items-center gap-2
    transition-[height] duration-200 ease-out
  "
          >
            <span className="font-semibold text-gray-700">
              Available Languages:
            </span>

            {languages.length > 0 ? (
              <>
                {languages
                  .slice(0, allLang ? languages.length : 5)
                  .map((lang) => (
                    <span
                      key={lang}
                      className="rounded-xl bg-gray-100 px-3 py-1.5 text-sm shadow-sm"
                    >
                      {lang}
                    </span>
                  ))}

                {languages.length > 5 && (
                  <button
                    onClick={() => setAllLang((prev) => !prev)}
                    className="rounded-xl bg-gray-800 px-3 py-1.5 text-sm font-medium text-white transition hover:bg-gray-700 active:scale-95"
                  >
                    {allLang ? "See less" : "See more"}
                  </button>
                )}
              </>
            ) : (
              <span className="text-sm text-gray-500">No languages data</span>
            )}
          </div>
        </section>

        {/* Actions */}
        <section className="flex gap-2 rounded-2xl bg-gray-200 p-1.5 shadow-sm sticky top-0">
          <button
          onClick={()=>  window.open(
              `https://openlibrary.org${book.key}`,
              "_blank",
              "noopener,noreferrer",
            )}
           className="flex-1 rounded-xl bg-blue-600 px-4 py-3 font-semibold text-white shadow-sm transition hover:bg-blue-700 active:scale-[0.98]">
            Borrow
          </button>

          <button
            onClick={() => handleSave()}
            className="flex-1 rounded-xl bg-white px-4 py-3 font-semibold text-gray-700 shadow-sm transition hover:bg-gray-50 active:scale-[0.98]"
          >
            {isSaved ? "Saved" : "Save"}
          </button>
        </section>
      </div>

      <nav className="flex gap-1 overflow-x-auto rounded-2xl bg-gray-200 p-1.5 shadow-sm">
        {tabs.map((item) => {
          if (item.id === "series" && !book.series) {
            return null;
          }

          return (
            <button
              key={item.id}
              onClick={() => setTab(item.id)}
              className={`flex-1 min-w-fit rounded-xl px-4 py-2.5 text-sm font-semibold cursor-pointer transition active:scale-95 ${
                tab === item.id
                  ? "bg-white text-gray-800 shadow-sm"
                  : "text-gray-600 hover:bg-white hover:text-gray-800"
              }`}
            >
              {item.label}
            </button>
          );
        })}
      </nav>

      <div className=" m-2">
        {tab == "related" && (
          <Related
            series={book.series_name}
            title={book.title}
            setView={setView}
          />
        )}
        {tab == "series" && (
          <FromSeries series={book.series_name} setView={setView} />
        )}
        {tab === "author" && (
          <FromAuthor
            author={book.author_name ? book.author_name : book.authors[0]?.name}
            setView={setView}
          />
        )}
      </div>
    </main>
  );
}
