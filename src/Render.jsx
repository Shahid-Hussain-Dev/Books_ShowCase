import { useEffect, useState } from "react";
import Card from "./Card";
import { Loader2 } from "lucide-react";

export function CategoryRender({
  category,
  handleMouseLeave,
  handlePreview,
  openPreview,
}) {
  const [limit, setLimit] = useState(15);
  const [showMore, setShowMore] = useState(false);
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const handleMore = () => {
    setShowMore((prev) => {
      setLimit(prev ? 15 : 35);
      return !prev;
    });
  };

  const trendingBooks = async () => {
    try {
      setLoading(true);
      setError(false);

      const res = await fetch(
        `https://openlibrary.org/subjects/${encodeURIComponent(category)}.json?limit=35`,
      );

      if (!res.ok) {
        throw new Error(`HTTP error: ${res.status}`);
      }

      const data = await res.json();
      console.log(data.works);
      setBooks(data.works || []);
    } catch (error) {
      console.error("Failed to fetch books:", error);
      setBooks([]);
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setLimit(15);
    setShowMore(false);
    trendingBooks();
  }, [category]);

  // Loading
  if (loading) {
    return (
      <section className="w-full min-h-[400px] flex flex-col items-center justify-center gap-4">
        <Loader2 size={50} className="animate-spin text-gray-400" />

        <div className="flex items-center gap-1 text-gray-500 font-semibold">
          <span>Loading books</span>

          <span className="animate-pulse">.</span>
          <span className="animate-pulse [animation-delay:200ms]">.</span>
          <span className="animate-pulse [animation-delay:400ms]">.</span>
        </div>
      </section>
    );
  }

  // Error
  if (error) {
    return (
      <section className="w-full min-h-[300px] flex flex-col items-center justify-center gap-3">
        <p className="text-gray-500 font-semibold">Failed to load books.</p>

        <button
          onClick={trendingBooks}
          className="px-5 py-2 rounded-lg bg-gray-800 text-white hover:bg-gray-700 transition"
        >
          Try Again
        </button>
      </section>
    );
  }

  // No books
  if (books.length === 0) {
    return (
      <section className="w-full min-h-[300px] flex items-center justify-center">
        <p className="text-gray-500 font-semibold">No books found.</p>
      </section>
    );
  }

  return (
    <div className="flex gap-2 items-center overflow-x-auto">
      {books.slice(0, limit).map((book) => (
        <Card
          key={book.key}
          book={book}
          openPreview={openPreview}
          handleMouseLeave={handleMouseLeave}
          handlePreview={handlePreview}
        />
      ))}

      {books.length > 15 && (
        <div
          onClick={handleMore}
          className="
            bg-[#454545]
            h-60
            min-w-40
            rounded
            flex
            items-center
            justify-center
            cursor-pointer
            hover:bg-[#505050]
            transition
            duration-200
            shrink-0
          "
        >
          <h1 className="text-white text-3xl text-center font-bold px-3">
            {showMore ? "Show Less" : "Show More"}
          </h1>
        </div>
      )}
    </div>
  );
}
export default function TimeRender({
  openPreview,
  handleMouseLeave,
  handlePreview,
  setView,
  type,
}) {
  const [Limit, setLimit] = useState(15);
  const [showMore, SetShowMore] = useState(false);
  const [books, setBooks] = useState([]);

  const HandlMore = () => {
    SetShowMore((prev) => {
      setLimit(prev ? 15 : 35);
      return !prev;
    });
  };
  const TrendingBooks = async () => {
    const limit = 35;

    try {
      const res = await fetch(
        `https://openlibrary.org/trending/${type}.json?limit=${limit}`,
      );

      if (!res.ok) {
        throw new Error(`HTTP error: ${res.status}`);
      }

      const data = await res.json();

      setBooks(data.works || []);
    } catch (error) {
      console.error("Failed to fetch trending books:", error);
      setBooks([]);
    }
  };
  useEffect(() => {
    TrendingBooks();
  }, []);
  return (
    <>
      {books.length === 0 ? (
        <section id="loading">
          <div className="min-h-screen w-full flex flex-col items-center justify-center gap-4">
            <Loader2 size={50} className="animate-spin" />

            <div className="flex items-center gap-1 text-gray-600 font-semibold">
              <span>Loading books</span>

              <span className="animate-pulse">.</span>
              <span className="animate-pulse [animation-delay:200ms]">.</span>
              <span className="animate-pulse [animation-delay:400ms]">.</span>
            </div>
          </div>
        </section>
      ) : (
        <div className="flex gap-2 items-center">
          {books.slice(0, Limit).map((book) => (
            <Card
              key={book.key}
              book={book}
              openPreview={openPreview}
              handleMouseLeave={handleMouseLeave}
              handlePreview={handlePreview}
            />
          ))}
          <div
            onClick={HandlMore}
            className="bg-[#454545] h-60 min-w-40 rounded flex items-center justify-center"
          >
            <h1 className="text-white text-4xl text-center font-bold cursor-pointer">
              {showMore ? "Show Less" : "Show More"}
            </h1>
          </div>
        </div>
      )}
    </>
  );
}
