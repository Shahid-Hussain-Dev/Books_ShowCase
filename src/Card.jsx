export default function Card({
  book,
  handleMouseLeave,
  handlePreview,
  openPreview,
}) {
  return (
    <>
      <div
        key={book.key}
        onMouseEnter={() => handlePreview(book)}
        onMouseLeave={handleMouseLeave}
        onClick={() => openPreview(book)}
        className="
                        bg-[#190536]
                        text-white
                        rounded-2xl
                        flex
                        flex-col
                        justify-between
                        py-4
                        px-2
                        shadow-[2px_2px_2px_#190566]
                        duration-200
                        gap-3
                        cursor-pointer
                        hover:[transform:rotateY(0deg)_rotateX(0deg)_translateY(-14px)_scale(1.03)]
                        transition-all
                      "
      >
        {/* COVER */}

        {book.cover_i || book.cover_id ? (
          
          <img
            src={`https://covers.openlibrary.org/b/id/${book.cover_i?book.cover_i:book.cover_id}-M.jpg`}
            alt={book.title || "Book cover"}
            className="
                            rounded-2xl
                            h-50
                            min-w-40
                            object-cover
                          "
          />
        ) : (
          <div
            className="
      relative overflow-hidden
      self-center
      h-50 w-40
     
     
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

        {/* =TITLE == */}

        <h3 className="font-semibold text-sm line-clamp-2">
          {book.title || "Unknown Title"}
        </h3>
        <hr />
        <h3 className="font-semibold text-sm line-clamp-2 text-gray-400">
          {(() => {
            const author =
              book.author_name?.[0] || book.authors?.[0]?.name || "Unknown";

            return author.length > 15 ? `${author.slice(0, 15)}...` : author;
          })()}
        </h3>
      </div>
    </>
  );
}
