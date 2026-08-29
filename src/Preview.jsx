import { motion } from "framer-motion";
import { X } from "lucide-react";
export default function Preview({ book, onClose, setView }) {
  const ViewBook = () => {
    setView(book);
  };
  return (
    <motion.div
      onClick={ViewBook}
      initial={{ opacity: 0, scale: 0.9, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9, y: 20 }}
      transition={{ duration: 0.2 }}
      className="
        relative
        bg-white
        text-black
        flex
        flex-col
        gap-4
        p-5
        rounded-2xl
        w-[min(600px,95vw)]
        max-h-[90vh]
        overflow-y-auto
        shadow-2xl
      "
    >
      {/* Close button */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          onClose();
        }}
        className="
          absolute
          right-0
          top-0
          
          z-10
          bg-[#343334]
          font-bold
          text-white
          w-10
          h-10
          rounded-full
          hover:bg-black
          transition-colors
          flex items-center justify-center
        "
      >
        <X size={24} />
      </button>

      {/* ================= BOOK COVER ================= */}

      {book.cover_i ? (
        <img
          src={`https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`}
          alt={book.title || "Book cover"}
          className="h-80 w-full object-cover sm:h-96 md:h-[500px]"
        />
      ) : (
        <div
          className="
      relative overflow-hidden
      h-80 w-full
      
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

      <h1 className=" text-2xl absolute top-10 m-2 p-2 text-[#0d0d0d] text-wrap font-bold">
        {book.title || " "}
      </h1>
      {/* ================= TITLE ================= */}

      <h1 className="font-semibold text-lg">
        Title: {book.title || "Unknown"}
      </h1>

      {/* ================= AUTHOR ================= */}

      <h1>Author: {book.author_name?.join(", ") || "Unknown"}</h1>

      {/* ================= FULL TEXT ================= */}

      <h1>
        {book.has_fulltext ? "Full text available" : "No full text available"}
      </h1>

      {/* ================= LANGUAGES ================= */}

      <div className="flex gap-2 flex-wrap">
        <span>Languages:</span>

        {book.language?.length ? (
          book.language.slice(0, 4).map((lang) => (
            <span
              key={lang}
              className="
                bg-gray-200
                px-2
                py-1
                rounded-lg
                text-sm
              "
            >
              {lang}
            </span>
          ))
        ) : (
          <span className="text-gray-500">Unknown</span>
        )}
      </div>
    </motion.div>
  );
}
