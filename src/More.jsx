import { useRef, useState, useEffect } from "react";
import { Loader2 } from "lucide-react";
import Card from "./Card";

export function FromAuthor({ author, setView }) {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isPreview, setPreview] = useState(null);

  const timer = useRef(null);

  const handlePreview = (book) => {
    clearTimeout(timer.current);

    timer.current = setTimeout(() => {
      setPreview(book);
    }, 1000);
  };

  const openPreview = (book) => {
    clearTimeout(timer.current);
    setView(book);
  };

  const handleMouseLeave = () => {
    clearTimeout(timer.current);
  };

  const fetchData = async () => {
    try {
      setLoading(true);

      if (!author) {
        setBooks([]);
        return;
      }

      const response = await fetch(
        `https://openlibrary.org/search.json?author=${encodeURIComponent(
          author,
        )}&limit=35`,
      );

      if (!response.ok) {
        throw new Error(`HTTP error: ${response.status}`);
      }

      const data = await response.json();

      setBooks(data.docs);
    } catch (error) {
      console.error("Failed to fetch author's books:", error);
      setBooks([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();

    return () => {
      clearTimeout(timer.current);
    };
  }, [author]);

  if (loading) {
    return (
      <div className="flex justify-center py-10">
        <Loader2 className="animate-spin" />
      </div>
    );
  }

  if (!books.length) {
    return (
      <p className="py-5 text-center text-gray-500">
        No other books found from this author.
      </p>
    );
  }

  return (
    <>
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
        {books.map((book) => (
          <Card
            key={book.key}
            book={book}
            openPreview={openPreview}
            handleMouseLeave={handleMouseLeave}
            handlePreview={handlePreview}
          />
        ))}
      </div>
    </>
  );
}
export function FromSeries({ series, setView }) {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isPreview, setPreview] = useState(null);

  const timer = useRef(null);

  const handlePreview = (book) => {
    clearTimeout(timer.current);

    timer.current = setTimeout(() => {
      setPreview(book);
    }, 1000);
  };

  const openPreview = (book) => {
    clearTimeout(timer.current);
    setView(book);
  };

  const handleMouseLeave = () => {
    clearTimeout(timer.current);
  };

  const fetchData = async () => {
    try {
      setLoading(true);

      const response = await fetch(
        `https://openlibrary.org/search.json?series=${encodeURIComponent(series)}&limit=35`,
      );

      if (!response.ok) {
        throw new Error(`HTTP error: ${response.status}`);
      }

      const data = await response.json();

      setBooks(data.docs);
    } catch (error) {
      console.error("Failed to fetch books:", error);
      setBooks([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [series]);

  if (loading) {
    return (
      <div className="flex justify-center py-10">
        <Loader2 className="animate-spin" />
      </div>
    );
  }

  if (!books.length) {
    return (
      <p className="py-5 text-center text-gray-500">
        No more books founds from this series.
      </p>
    );
  }

  return (
    <>
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
        {books.map((book) => (
          <Card
            book={book}
            openPreview={openPreview}
            handleMouseLeave={handleMouseLeave}
            handlePreview={handlePreview}
          />
        ))}
      </div>
    </>
  );
}
export default function Related({ author, title, series, setView }) {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isPreview, setPreview] = useState(null);

  const timer = useRef(null);

  const handlePreview = (book) => {
    clearTimeout(timer.current);

    timer.current = setTimeout(() => {
      setPreview(book);
    }, 1000);
  };

  const openPreview = (book) => {
    clearTimeout(timer.current);
    setView(book);
  };

  const handleMouseLeave = () => {
    clearTimeout(timer.current);
  };

  const fetchData = async () => {
    try {
      setLoading(true);

      const query = [author, series, title].filter(Boolean).join(" ");

      if (!query) {
        setBooks([]);
        return;
      }

      const response = await fetch(
        `https://openlibrary.org/search.json?q=${encodeURIComponent(
          query,
        )}&limit=15`,
      );

      if (!response.ok) {
        throw new Error(`HTTP error: ${response.status}`);
      }

      const data = await response.json();

      setBooks(data.docs);
    } catch (error) {
      console.error("Failed to fetch books:", error);
      setBooks([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [author, title, series]);

  if (loading) {
    return (
      <div className="flex justify-center py-10">
        <Loader2 className="animate-spin" />
      </div>
    );
  }

  if (!books.length) {
    return (
      <p className="py-5 text-center text-gray-500">No related books found.</p>
    );
  }

  return (
    <>
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
        {books.map((book) => (
          <Card
            key={book.key}
            book={book}
            openPreview={openPreview}
            handleMouseLeave={handleMouseLeave}
            handlePreview={handlePreview}
          />
        ))}
      </div>
    </>
  );
}
