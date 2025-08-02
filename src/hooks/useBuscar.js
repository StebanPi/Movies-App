import { useSearchParams } from "react-router-dom";
import { useState, useEffect, useCallback } from "react";

const useSearch = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  // Obtener valores de la URL
  const query = searchParams.get("q") || "";
  const page = Number(searchParams.get("page")) || 1;
  const genre = searchParams.get("genre") || "";
  const year = searchParams.get("year") || "";
  const sortBy = searchParams.get("sort") || "popularity.desc";

  // Estados locales
  const [isLoading, setIsLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);

  // Detectar si hay parámetros de búsqueda
  useEffect(() => {
    setHasSearched(!!query);
  }, [query]);

  // Función para actualizar la búsqueda
  const updateSearch = useCallback(
    (newParams) => {
      const params = new URLSearchParams();

      // Agregar solo parámetros con valores
      Object.entries(newParams).forEach(([key, value]) => {
        if (value && value !== "") {
          // Para page, solo agregar si no es 1
          if (key === "page" && value === 1) return;
          params.set(key, value);
        }
      });

      setSearchParams(params);
    },
    [setSearchParams]
  );

  // Funciones específicas
  const setQuery = useCallback(
    (newQuery) => {
      updateSearch({
        q: newQuery,
        page: 1,
        genre,
        year,
        sort: sortBy,
      });
    },
    [updateSearch, genre, year, sortBy]
  );

  const setPage = useCallback(
    (newPage) => {
      updateSearch({
        q: query,
        page: newPage,
        genre,
        year,
        sort: sortBy,
      });
    },
    [updateSearch, query, genre, year, sortBy]
  );

  const setFilters = useCallback(
    (filters) => {
      updateSearch({
        q: query,
        page: 1, // Reset page when changing filters
        ...filters,
        sort: filters.sort || sortBy,
      });
    },
    [updateSearch, query, sortBy]
  );

  const clearSearch = useCallback(() => {
    setSearchParams({});
  }, [setSearchParams]);

  const clearFilters = useCallback(() => {
    updateSearch({ q: query });
  }, [updateSearch, query]);

  return {
    // Valores actuales
    query,
    page,
    genre,
    year,
    sortBy,

    // Estados
    isLoading,
    setIsLoading,
    hasSearched,

    // Funciones
    setQuery,
    setPage,
    setFilters,
    clearSearch,
    clearFilters,
    updateSearch,

    // URL completa para compartir
    currentURL: window.location.href,
  };
};

export default useSearch;
