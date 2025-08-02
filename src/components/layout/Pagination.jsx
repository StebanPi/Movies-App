import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { useState, useEffect } from "react";

export function PaginationComponent({ funcion, paginaActual = 1 }) {
  const [currentPage, setCurrentPage] = useState(paginaActual);

  useEffect(() => {
    setCurrentPage(paginaActual);
  }, [paginaActual]);

  useEffect(() => {
    if (currentPage !== paginaActual) {
      funcion(currentPage);
    }
  }, [currentPage, funcion, paginaActual]);

  const totalPages = 20;

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const renderPageLinks = () => {
    const pages = [];

    if (totalPages <= 7) {
      // Si hay pocas páginas, mostrar todas
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // Mostrar primeras, últimas y vecinas con "..."
      if (currentPage <= 4) {
        pages.push(1, 2, 3, 4, 5, "...", totalPages);
      } else if (currentPage >= totalPages - 3) {
        pages.push(
          1,
          "...",
          totalPages - 4,
          totalPages - 3,
          totalPages - 2,
          totalPages - 1,
          totalPages
        );
      } else {
        pages.push(
          1,
          "...",
          currentPage - 1,
          currentPage,
          currentPage + 1,
          "...",
          totalPages
        );
      }
    }

    return pages.map((page, index) => {
      if (page === "...") {
        return (
          <PaginationItem key={`ellipsis-${index}`}>
            <PaginationEllipsis />
          </PaginationItem>
        );
      }

      return (
        <PaginationItem key={page}>
          <PaginationLink
            onClick={() => handlePageChange(page)}
            isActive={currentPage === page}
          >
            {page}
          </PaginationLink>
        </PaginationItem>
      );
    });
  };

  return (
    <Pagination>
      <PaginationContent className="hover:cursor-pointer">
        <PaginationItem className="hover:cursor-pointer">
          <PaginationPrevious
            onClick={() => handlePageChange(currentPage - 1)}
            className={
              currentPage === 1 ? "pointer-events-none opacity-50" : ""
            }
          />
        </PaginationItem>

        {renderPageLinks()}

        <PaginationItem className="hover:cursor-pointer">
          <PaginationNext
            onClick={() => handlePageChange(currentPage + 1)}
            className={
              currentPage === totalPages ? "pointer-events-none opacity-50" : ""
            }
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
