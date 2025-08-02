import { useMovies } from "@/context/MoviesContext";
import MoviesContainer from "@/components/layout/MoviesContainer";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const IndexPage = () => {
  const { fetchPeliculasPopulares } = useMovies();
  const { pageNumber } = useParams();
  const navigate = useNavigate();

  const [paginacion, setPaginacion] = useState(Number(pageNumber) || 1);

  useEffect(() => {
    const getPeliculas = async () => {
      await fetchPeliculasPopulares(paginacion);
    };
    getPeliculas();
  }, [paginacion]);

  const cambiarPagina = (nuevaPagina) => {
    setPaginacion(nuevaPagina);
    if (nuevaPagina === 1) {
      navigate("/");
    } else {
      navigate(`/page/${nuevaPagina}`);
    }
  };

  return (
    <div>
      <h2 className="text-3xl font-bold mb-5 ml-2.5">Inicio</h2>
      <MoviesContainer paginacion={cambiarPagina} paginaActual={paginacion} />
    </div>
  );
};

export default IndexPage;
