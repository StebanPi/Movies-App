import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ChevronDown, Search } from "lucide-react";
import { ModeToggle } from "../utils/mode-toggle";
import { Link } from "react-router-dom";
import { useState } from "react";

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="flex justify-center fixed top-0 left-0 right-0 z-50 mt-4">
      <Card className="w-[90%] p-5 px-0">
        <CardContent className="relative md:flex gap-4 justify-between items-center grid grid-cols-1">
          <NavigationMenu>
            <NavigationMenuList className="flex gap-2">
              <NavigationMenuItem>
                <NavigationMenuLink
                  asChild
                  className={navigationMenuTriggerStyle()}
                >
                  <Link to="/" className="">
                    Inicio
                  </Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuLink
                  asChild
                  className={navigationMenuTriggerStyle()}
                >
                  <Link to="/rated">Mejor Valoradas</Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <DropdownMenu onOpenChange={setIsOpen}>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="ghost"
                      className={`${navigationMenuTriggerStyle()} flex items-center gap-1 hover:cursor-pointer`}
                    >
                      Filtrar por
                      <ChevronDown
                        className={`h-4 w-4 transition-transform duration-200 ${
                          isOpen ? "rotate-180" : ""
                        }`}
                      />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="start" className="w-[200px]">
                    <DropdownMenuItem asChild>
                      <Link
                        to="/search?genre=action"
                        className="hover:cursor-pointer"
                      >
                        Acción
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link
                        to="/search?genre=comedy"
                        className="hover:cursor-pointer"
                      >
                        Comedia
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link
                        to="/search?genre=drama"
                        className="hover:cursor-pointer"
                      >
                        Drama
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link
                        to="/search?genre=horror"
                        className="hover:cursor-pointer"
                      >
                        Terror
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link
                        to="/search?genre=sci-fi"
                        className="hover:cursor-pointer"
                      >
                        Ciencia Ficción
                      </Link>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
          <div className="flex gap-2 items-center justify-center">
            <Link to="/search">
              <Button
                variant="outline"
                className="hover:cursor-pointer"
                size="sm"
              >
                <Search className="h-4 w-4 mr-1" />
                Buscar
              </Button>
            </Link>

            <ModeToggle />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
