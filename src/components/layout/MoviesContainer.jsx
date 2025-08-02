import { MovieCard } from "../utils/MovieCard";
import { useMovies } from "@/context/MoviesContext";
import { PaginationComponent } from "./Pagination";
const MoviesContainer = ({ paginacion, paginaActual, search = false }) => {
  const { movies } = useMovies();
  return (
    <section className="mb-10 flex flex-col gap-10">
      <div className="grid  justify-items-center sm:grid-cols-3 grid-cols-1 xl:grid-cols-6 gap-6">
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
