import { ThemeProvider } from "./components/utils/theme-provider";
import { Routes, Route } from "react-router-dom";
import IndexPage from "./pages/IndexPage";
import RatedPage from "./pages/RatedPage";
import { MoviesProvider } from "./context/MoviesContext";
import { Navbar } from "./components/layout/Navbar";
import MoviePage from "./pages/MoviePage";
import SearchPage from "./pages/BuscarPage";
import "animate.css";

function App() {
  return (
    <MoviesProvider>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <Navbar />
        <div className="mt-40 md:mt-30  mx-7 lg:mx-25">
          <Routes>
            <Route path="/" element={<IndexPage />}></Route>
            <Route path="/page/:pageNumber" element={<IndexPage />} />

            <Route path="/rated" element={<RatedPage />}></Route>
            <Route path="/rated/page/:pageNumber" element={<RatedPage />} />

            <Route path="/movie/:id" element={<MoviePage></MoviePage>} />

            <Route path="/search" element={<SearchPage></SearchPage>}></Route>
            <Route path="/*" element={<IndexPage />}></Route>
          </Routes>
        </div>
      </ThemeProvider>
    </MoviesProvider>
  );
}

export default App;
