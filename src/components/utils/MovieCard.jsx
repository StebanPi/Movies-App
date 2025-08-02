import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Star, Calendar, Clock, Play, Info } from "lucide-react";
import { Link } from "react-router";
import { useState } from "react";

export const MovieCard = ({ movie }) => {
  const [imageError, setImageError] = useState(false);

  const imageBaseUrl = "https://image.tmdb.org/t/p/w300";
  const posterUrl = movie.poster_path
    ? `${imageBaseUrl}${movie.poster_path}`
    : null;

  const formatDate = (dateString) => {
    return new Date(dateString).getFullYear();
  };

  const formatRuntime = (minutes) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}h ${mins}m`;
  };

  return (
    <Card className="w-64 overflow-hidden group hover:shadow-lg transition-all duration-300 hover:-translate-y-1 bg-gradient-to-br from-background to-muted/20">
      <div className="relative overflow-hidden">
        {/* Poster Image */}
        <div className="aspect-[2/3] relative">
          {posterUrl && !imageError ? (
            <img
              src={posterUrl}
              alt={movie.title}
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
              onError={() => setImageError(true)}
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-muted to-muted/50 flex items-center justify-center">
              <div className="text-center text-muted-foreground">
                <div className="w-12 h-12 mx-auto mb-2 rounded-full bg-muted-foreground/10 flex items-center justify-center">
                  <Play className="w-6 h-6" />
                </div>
                <p className="text-xs font-medium px-2">{movie.title}</p>
              </div>
            </div>
          )}

          {/* Overlay with actions */}
          <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
            <div className="flex gap-2">
              <Link to={`/movie/${movie.id}`}>
                <Button
                  size="sm"
                  variant="outline"
                  className="bg-white/20 hover:bg-white/30 text-white border-white/20 hover:cursor-pointer"
                >
                  <Info className="w-3 h-3" />
                  Leer mas
                </Button>
              </Link>
            </div>
          </div>

          {/* Rating badge */}
          <div className="absolute top-2 left-2">
            <Badge className="bg-black/70 text-white border-none text-xs">
              <Star className="w-3 h-3 mr-1 fill-yellow-400 text-yellow-400" />
              {movie.vote_average?.toFixed(1)}
            </Badge>
          </div>
        </div>
      </div>

      <CardContent className="p-3 space-y-2">
        {/* Title */}
        <div>
          <h3 className="font-bold text-sm leading-tight line-clamp-2 group-hover:text-primary transition-colors">
            {movie.title}
          </h3>
        </div>

        {/* Genres */}
        {movie.genres && movie.genres.length > 0 && (
          <div className="flex flex-wrap gap-1">
            {movie.genres.slice(0, 2).map((genre) => (
              <Badge
                key={genre.id}
                variant="secondary"
                className="text-xs py-0 px-2"
              >
                {genre.name}
              </Badge>
            ))}
          </div>
        )}

        {/* Movie Info */}
        <div className="flex items-center gap-3 text-xs text-muted-foreground">
          {movie.release_date && (
            <div className="flex items-center gap-1">
              <Calendar className="w-3 h-3" />
              <span>{formatDate(movie.release_date)}</span>
            </div>
          )}
          {movie.runtime && (
            <div className="flex items-center gap-1">
              <Clock className="w-3 h-3" />
              <span>{formatRuntime(movie.runtime)}</span>
            </div>
          )}
        </div>

        {/* Overview */}
        {movie.overview && (
          <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed">
            {movie.overview}
          </p>
        )}
      </CardContent>
    </Card>
  );
};
