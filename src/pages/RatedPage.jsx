import { useMovies } from "@/context/MoviesContext";
import MoviesContainer from "@/components/layout/MoviesContainer";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const RatedPage = () => {
  const { fetchPeliculasMejorCalificadas } = useMovies();
  const { pageNumber } = useParams();
  const navigate = useNavigate();

  const [paginacion, setPaginacion] = useState(Number(pageNumber) || 1);

  useEffect(() => {
    const getRatedMovies = async () => {
      try {
        await fetchPeliculasMejorCalificadas(paginacion);
      } catch (error) {
        console.error("Error al cargar películas mejor calificadas:", error);
      }
    };
    getRatedMovies();
  }, [paginacion]);

  // Función que cambia la página y sincroniza la URL
  const cambiarPagina = (nuevaPagina) => {
    setPaginacion(nuevaPagina);
    if (nuevaPagina === 1) {
      navigate("/rated");
    } else {
      navigate(`/rated/page/${nuevaPagina}`);
    }
  };

  return (
    <div>
      <h2 className="text-3xl font-bold mb-5 ml-2.5">Mejor Valoradas</h2>
      <MoviesContainer paginacion={cambiarPagina} paginaActual={paginacion} />
    </div>
  );
};

export default RatedPage;
