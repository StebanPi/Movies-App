import { MovieCard } from "../utils/MovieCard";
import { useMovies } from "@/context/MoviesContext";
import { PaginationComponent } from "./Pagination";
const MoviesContainer = ({ paginacion, paginaActual, search = false }) => {
  const { movies } = useMovies();
  return (
    <section className="mb-10 flex flex-col gap-10 animate__animated animate__fadeIn">
      <div className="flex justify-center gap-6 shrink-0 basis-auto flex-wrap">
        {movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie}></MovieCard>
        ))}
      </div>
      {!search && (
        <PaginationComponent
          funcion={paginacion}
          paginaActual={paginaActual}
          className="my-20"
        ></PaginationComponent>
      )}
    </section>
  );
};
export default MoviesContainer;
