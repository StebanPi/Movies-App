import { ArrowLeft, Star, Calendar, Clock, Heart, Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { useParams, useNavigate } from "react-router";
import { useMovies } from "@/context/MoviesContext";
import { useEffect } from "react";

const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500";
const BACKDROP_BASE_URL = "https://image.tmdb.org/t/p/original";

export default function MoviePage() {
  const navigate = useNavigate();
  console.log(navigate);
  const { id } = useParams();
  const { detallesPeliculas, selectedMovie } = useMovies();

  useEffect(() => {
    const getRatedMovies = async () => {
      try {
        await detallesPeliculas(Number(id));
      } catch (error) {
        console.error("Error al cargar la pelicula:", error);
      }
    };
    getRatedMovies();
  }, [id]);

  const movieData = selectedMovie;

  const formatRuntime = (minutes) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}h ${mins}m`;
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("es-ES", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div className="min-h-screen bg-background p-3 sm:p-6 animate__animated animate__fadeInLeft">
      {/* Navigation */}
      <div className="max-w-6xl mx-auto mb-4 sm:mb-8">
        <Button
          variant="ghost"
          size="sm"
          className="hover:cursor-pointer"
          onClick={() => navigate(-1)}
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Volver
        </Button>
      </div>

      {/* Main Card */}
      <div className="max-w-6xl mx-auto">
        <Card className="overflow-hidden">
          <CardContent className="p-0">
            {/* Hero Section with Backdrop */}
            <div className="relative h-64 sm:h-80 lg:h-96 overflow-hidden">
              <div
                className="absolute inset-0 bg-cover bg-center bg-no-repeat blur-xs"
                style={{
                  backgroundImage: `url(${BACKDROP_BASE_URL}${movieData?.backdrop_path})`,
                }}
              >
                <div className="absolute inset-0 bg-black/50" />
              </div>

              {/* Content Over Backdrop - Mobile First */}
              <div className="relative z-10 h-full flex items-end p-4 sm:p-8">
                {/* Mobile Layout - Stacked */}
                <div className="flex flex-col sm:hidden gap-4 w-full">
                  {/* Movie Info - Mobile */}
                  <div className="text-white">
                    <h1 className="text-2xl font-bold mb-3 leading-tight">
                      {movieData?.title}
                    </h1>

                    {/* Genres - Mobile */}
                    <div className="flex flex-wrap gap-1 mb-3">
                      {movieData?.genres?.slice(0, 3).map((genre) => (
                        <Badge
                          key={genre.id}
                          variant="secondary"
                          className="bg-white/20 text-white text-xs"
                        >
                          {genre.name}
                        </Badge>
                      ))}
                    </div>

                    {/* Rating & Details - Mobile */}
                    <div className="flex items-center gap-4 text-sm">
                      <div className="flex items-center gap-1">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        <span className="font-semibold">
                          {movieData?.vote_average?.toFixed(1)}
                        </span>
                      </div>

                      <div className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        <span>
                          {new Date(movieData?.release_date).getFullYear()}
                        </span>
                      </div>

                      <div className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        <span>{formatRuntime(movieData?.runtime)}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Desktop/Tablet Layout - Side by Side */}
                <div className="hidden sm:flex gap-6 lg:gap-8 items-end w-full">
                  {/* Poster */}
                  <img
                    src={`${IMAGE_BASE_URL}${movieData?.poster_path}`}
                    alt={movieData?.title}
                    className="w-32 h-48 sm:w-40 sm:h-60 lg:w-48 lg:h-72 object-cover rounded-lg shadow-2xl border-2 border-white/30 flex-shrink-0"
                  />

                  {/* Movie Info - Desktop/Tablet */}
                  <div className="text-white pb-4 flex-1 min-w-0">
                    <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4 leading-tight">
                      {movieData?.title}
                    </h1>

                    {/* Genres - Desktop/Tablet */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {movieData?.genres?.map((genre) => (
                        <Badge
                          key={genre.id}
                          variant="secondary"
                          className="bg-white/20 text-white"
                        >
                          {genre.name}
                        </Badge>
                      ))}
                    </div>

                    {/* Rating & Details - Desktop/Tablet */}
                    <div className="flex flex-wrap items-center gap-4 lg:gap-6 mb-6">
                      <div className="flex items-center gap-2">
                        <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                        <span className="text-lg lg:text-xl font-semibold">
                          {movieData?.vote_average?.toFixed(1)}
                        </span>
                      </div>

                      <div className="flex items-center gap-2">
                        <Calendar className="h-5 w-5" />
                        <span>
                          {new Date(movieData?.release_date).getFullYear()}
                        </span>
                      </div>

                      <div className="flex items-center gap-2">
                        <Clock className="h-5 w-5" />
                        <span>{formatRuntime(movieData?.runtime)}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Poster Section - Mobile Only */}
            <div className="sm:hidden p-4 mt-4 relative z-20">
              <div className="flex justify-center">
                <img
                  src={`${IMAGE_BASE_URL}${movieData?.poster_path}`}
                  alt={movieData?.title}
                  className="w-32 h-48 object-cover rounded-lg shadow-xl border-2 border-white/20"
                />
              </div>
            </div>

            {/* Synopsis Section */}
            <div className="p-4 sm:p-6 lg:p-8">
              <h2 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">
                Sinopsis
              </h2>
              <p className="text-muted-foreground leading-relaxed text-sm sm:text-base lg:text-lg">
                {movieData?.overview}
              </p>

              {/* Additional Info */}
              <div className="mt-6 sm:mt-8 pt-4 sm:pt-6 border-t border-border">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                  <div>
                    <p className="text-xs sm:text-sm font-medium text-muted-foreground mb-1">
                      Fecha de Estreno
                    </p>
                    <p className="text-base sm:text-lg font-semibold">
                      {formatDate(movieData?.release_date)}
                    </p>
                  </div>

                  <div>
                    <p className="text-xs sm:text-sm font-medium text-muted-foreground mb-1">
                      Duración
                    </p>
                    <p className="text-base sm:text-lg font-semibold">
                      {formatRuntime(movieData?.runtime)}
                    </p>
                  </div>

                  <div className="sm:col-span-2 lg:col-span-1">
                    <p className="text-xs sm:text-sm font-medium text-muted-foreground mb-1">
                      Valoración
                    </p>
                    <div className="flex items-center gap-2">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span className="text-base sm:text-lg font-semibold">
                        {movieData?.vote_average?.toFixed(1)}/10
                      </span>
                      <span className="text-xs sm:text-sm text-muted-foreground">
                        ({movieData?.vote_count?.toLocaleString()})
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
