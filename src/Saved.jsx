import { useEffect, useState } from "react";
import { ArrowLeft, BookmarkX, BookOpen, Delete } from "lucide-react";
import Card from "./Card";

export default function Saved({
  openPreview,
  handleMouseLeave,
  handlePreview,
  onback,
}) {
  const [books, setBooks] = useState([]);

  const loadSavedBooks = () => {
    try {
      const saved = localStorage.getItem("books");

      if (!saved) {
        setBooks([]);
        return;
      }

      const parsedBooks = JSON.parse(saved);

      setBooks(Array.isArray(parsedBooks) ? parsedBooks : []);
    } catch (error) {
      console.error("Failed to load saved books:", error);
      setBooks([]);
    }
  };
  const Remove = (book) => {
    const updatedBooks = books.filter(
      (savedBook) => savedBook.key !== book.key,
    );
    localStorage.setItem("books", JSON.stringify(updatedBooks));
    setBooks(updatedBooks);
  };

  useEffect(() => {
    loadSavedBooks();

    // Update when localStorage changes from another tab
    const handleStorage = (event) => {
      if (event.key === "books") {
        loadSavedBooks();
      }
    };

    window.addEventListener("storage", handleStorage);

    return () => {
      window.removeEventListener("storage", handleStorage);
    };
  }, []);

  return (
    <section
      className="   fixed inset-0 z-[100]
          bg-[#08080c]/95
          backdrop-blur-xl
          text-white
          overflow-y-auto
          p-4
        "
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-3 mb-8">
          <div
            onClick={onback}
            className="
              w-11 h-11
              flex items-center justify-center
              rounded-xl
              bg-blue-500/10
              border border-blue-500/20
            "
          >
            <ArrowLeft size={22} className="text-blue-400" />
          </div>

          <div>
            <h1 className="text-2xl font-bold">Saved Books</h1>

            <p className="text-sm text-gray-500">
              {books.length} {books.length === 1 ? "book" : "books"} saved
            </p>
          </div>
        </div>

        {/* Empty */}
        {books.length === 0 ? (
          <div
            className="
              min-h-[50vh]
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
                bg-white/5
                border border-white/10
                mb-5
              "
            >
              <BookmarkX size={36} className="text-gray-600" />
            </div>

            <h2 className="text-xl font-semibold text-gray-300">
              No saved books
            </h2>

            <p className="mt-2 text-gray-600 max-w-sm">
              Books you save will appear here so you can easily find them later.
            </p>
          </div>
        ) : (
          /* Books */
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
            {books.map((book, index) => (
              <div key={book.key || index} className="relative group">
                <Card
                  book={book}
                  openPreview={openPreview}
                  handleMouseLeave={handleMouseLeave}
                  handlePreview={handlePreview}
                />

                <button
                  onClick={() => Remove(book)}
                  aria-label="Remove saved book"
                  className="
      absolute top-2 right-2 z-10
      w-9 h-9
      flex items-center justify-center
      rounded-xl
      bg-black/70
      backdrop-blur-md
      border border-white/10
      text-gray-400
      hover:text-red-400
      hover:bg-red-500/20
      hover:border-red-500/30
      hover:scale-110
      transition-all duration-200
    "
                >
                  <Delete size={18} />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
