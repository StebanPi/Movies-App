// SearchPage.jsx
import { useMovies } from "@/context/MoviesContext";
import MoviesContainer from "@/components/layout/MoviesContainer";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Search, X, Film } from "lucide-react";

const SearchPage = () => {
  const {
    buscarPeliculas: searchMovies,
    movies,
    buscarPeliculasPorGenero,
  } = useMovies();
  const [searchParams, setSearchParams] = useSearchParams();

  // Obtener parámetros de la URL
  const query = searchParams.get("q") || "";
  const genre = searchParams.get("genre") || "";
  const currentPage = Number(searchParams.get("page")) || 1;

  const [searchQuery, setSearchQuery] = useState(query);
  const [isLoading, setIsLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);

  useEffect(() => {
    if (query) {
      setSearchQuery(query);
      handleSearch(query, currentPage);
      setHasSearched(true);
    } else if (genre) {
      handleSearchByGenre(genre, currentPage);
      setHasSearched(true);
    } else {
      setHasSearched(false);
    }
  }, [query, genre, currentPage]);

  const handleSearch = async (searchQuery, page = 1) => {
    if (!searchQuery.trim()) return;

    setIsLoading(true);
    try {
      await searchMovies(searchQuery, page);
    } catch (error) {
      console.error("Error al buscar películas:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearchByGenre = async (genreQuery, page = 1) => {
    setIsLoading(true);
    try {
      await buscarPeliculasPorGenero(genreQuery, page);
    } catch (error) {
      console.error("Error al buscar películas por género:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const cambiarPagina = (nuevaPagina) => {
    const params = {};
    if (query) params.q = query;
    if (genre) params.genre = genre;
    if (nuevaPagina !== 1) params.page = nuevaPagina;
    setSearchParams(params);
  };

  const actualizarBusqueda = (newQuery) => {
    if (newQuery.trim()) {
      setSearchParams({ q: newQuery });
    } else {
      setSearchParams({});
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    actualizarBusqueda(searchQuery);
  };

  const handleClear = () => {
    setSearchQuery("");
    setSearchParams({});
  };

  return (
    <div className="py-8 animate__animated animate__fadeIn">
      {/* Barra de búsqueda */}
      <div className="mb-8">
        <Card>
          <CardContent className="pt-0">
            <form onSubmit={handleSubmit} className="flex gap-2">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Buscar películas... (ej: The Matrix, Batman, Spider-Man)"
                  className="pl-10 pr-10"
                  disabled={isLoading}
                />
                {searchQuery && (
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={handleClear}
                    className="absolute right-1 top-1/2 transform -translate-y-1/2 h-7 w-7 p-0"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                )}
              </div>
              <Button
                type="submit"
                disabled={isLoading || !searchQuery.trim()}
                className="px-6"
              >
                {isLoading ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                    Buscando...
                  </>
                ) : (
                  <>
                    <Search className="h-4 w-4 mr-2" />
                    Buscar
                  </>
                )}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>

      {/* Loading skeleton */}
      {isLoading && (
        <div className="space-y-4">
          <div className="flex items-center gap-2 mb-6">
            <Skeleton className="h-6 w-32" />
            <Skeleton className="h-6 w-48" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 xl:grid-cols-6 gap-6">
            {Array.from({ length: 12 }).map((_, i) => (
              <Card key={i} className="overflow-hidden">
                <Skeleton className="aspect-[2/3] w-full" />
                <CardContent className="p-4">
                  <Skeleton className="h-4 w-full mb-2" />
                  <Skeleton className="h-3 w-2/3" />
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* No hay resultados */}
      {hasSearched && !isLoading && movies.length === 0 && (
        <Alert>
          <Film className="h-4 w-4" />
          <AlertDescription className="inline-block">
            No se encontraron películas para <strong>"{query || genre}"</strong>
            . Intenta con otros términos de búsqueda.
          </AlertDescription>
        </Alert>
      )}

      {/* Resultados */}
      {hasSearched && !isLoading && movies.length > 0 && (
        <>
          <div className="mb-6 flex items-center gap-2 flex-wrap">
            <h2 className="text-2xl font-bold">Resultados para:</h2>
            <Badge variant="secondary" className="text-lg px-3 py-1">
              "{query || genre}"
            </Badge>
            <Badge variant="outline">Página {currentPage}</Badge>
            <Badge variant="outline">{movies.length} películas</Badge>
          </div>

          <MoviesContainer
            paginacion={cambiarPagina}
            paginaActual={currentPage}
            search={true}
          />
        </>
      )}

      {/* Estado inicial */}
      {!hasSearched && !isLoading && (
        <div className="text-center py-16">
          <Card className="text-center py-16">
            <CardContent className="pt-6">
              <div className="mx-auto w-16 h-16 bg-muted rounded-full flex items-center justify-center mb-4">
                <Search className="h-8 w-8 text-muted-foreground" />
              </div>
              <h2 className="text-3xl font-bold mb-4">Descubre Películas</h2>
              <p className="text-muted-foreground text-lg mb-6 max-w-md mx-auto">
                Busca entre miles de películas por título, género o actor.
                ¡Encuentra tu próxima película favorita!
              </p>
              <div className="flex flex-wrap gap-2 justify-center">
                <Badge
                  variant="outline"
                  className="cursor-pointer hover:bg-muted transition-colors"
                  onClick={() => actualizarBusqueda("The Matrix")}
                >
                  The Matrix
                </Badge>
                <Badge
                  variant="outline"
                  className="cursor-pointer hover:bg-muted transition-colors"
                  onClick={() => actualizarBusqueda("Batman")}
                >
                  Batman
                </Badge>
                <Badge
                  variant="outline"
                  className="cursor-pointer hover:bg-muted transition-colors"
                  onClick={() => actualizarBusqueda("Marvel")}
                >
                  Marvel
                </Badge>
                <Badge
                  variant="outline"
                  className="cursor-pointer hover:bg-muted transition-colors"
                  onClick={() => actualizarBusqueda("Harry Potter")}
                >
                  Harry Potter
                </Badge>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};

export default SearchPage;
