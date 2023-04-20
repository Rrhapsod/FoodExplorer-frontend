import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Spin as Hamburger } from "hamburger-react";
import { AiOutlineSearch } from "react-icons/ai";
import { ImExit } from "react-icons/im";
import { BsHexagonFill } from "react-icons/bs";

import { Container } from "./styles";
import { useAuth } from "../../hooks/auth.jsx";
import { api } from "../../services/api";

import { ButtonTransparent } from "../ButtonTransparent";

export function Header({ setPlates }) {
  const navigate = useNavigate();

  const { signOut } = useAuth();

  const [search, setSearch] = useState("");
  const [isOpen, setOpen] = useState(false);

  const handleHome = () => {
    navigate("/");
  };

  const handleSignOut = async () => {
    navigate("/");
    signOut();
  };

  useEffect(() => {
    if (search.length > 0 && window.location.pathname == "/") {
      const fetchPlates = async () => {
        const response = await api.get(`/dishes?name=${search}`);

        setPlates(response.data);
      };
      fetchPlates();
    } else if (search.length == 0 && setPlates) {
      const fetchPlates = async () => {
        const response = await api.get(`/dishes`);

        setPlates(response.data);
      };
      fetchPlates();
    }
  }, [search]);

  return (
    <Container>
      <nav className="navbar">
        <div className="logo">
          <ButtonTransparent
            Icon={BsHexagonFill}
            iconSize={30}
            title="food explorer"
            className="logo"
            onClick={handleHome}
          />
        </div>

        <ul className={isOpen ? "nav-menu active" : "nav-menu "}>
          <li className="nav-item">
            <div className="search">
              <AiOutlineSearch size={20} color="#C4C4C4" />
              <input
                type="text"
                placeholder="Busque pelas opções de pratos"
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
          </li>
          <li className="nav-item">
            <ButtonTransparent
              Icon={ImExit}
              iconSize={30}
              className="exit"
              onClick={handleSignOut}
            />
          </li>
        </ul>
        <button className="menu" type="button">
          <Hamburger toggled={isOpen} toggle={setOpen} />
        </button>
      </nav>
    </Container>
  );
}
