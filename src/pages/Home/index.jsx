import { useState, useEffect } from "react";

import { Container, Content } from "./styles";
import { useAuth } from "../../hooks/auth";
import { api } from "../../services/api";
import imgBanner from "../../assets/image-banner.png";

import { Footer } from "../../components/Footer";
import { Header } from "../../components/Header";
import { HeaderAdmin } from "../../components/HeaderAdmin";
import { Section } from "../../components/Section";
import { Cards } from "../../components/Cards";
import { CardsAdmin } from "../../components/CardsAdmin";

export function Home() {
  const { user } = useAuth();

  const [plates, setPlates] = useState([]);
  const [mainPlates, setMainPlates] = useState([]);
  const [dessertPlates, setDessertPlates] = useState([]);
  const [drinks, setDrinks] = useState([]);

  useEffect(() => {
    const fetchPlates = async () => {
      const response = await api.get("/dishes");
      setPlates(response.data);
    };
    fetchPlates();
  }, []);

  useEffect(() => {
    const selectPlates = () => {
      const main = plates.filter((plate) => plate.category == "principal");
      setMainPlates(main);

      const dessert = plates.filter((plate) => plate.category == "sobremesa");
      setDessertPlates(dessert);

      const drink = plates.filter((plate) => plate.category == "bebida");
      setDrinks(drink);
    };
    selectPlates();
  }, [plates]);

  return (
    <Container>
      {user.id == 1 ? (
        <HeaderAdmin setPlates={setPlates} />
      ) : (
        <Header setPlates={setPlates} />
      )}

      <Content>
        <div className="banner">
          <img src={imgBanner} alt="image fruits and cookie" />
          <div className="text-banner">
            <h2>Sabores Inigualáveis</h2>
            <p>Sinta o cuidado do preparo com ingredientes selecionados</p>
          </div>
        </div>

        {mainPlates.length > 0 ? (
          <Section title="Pratos principais">
            {user.id == 1
              ? mainPlates.map((plate) => (
                  <CardsAdmin
                    key={plate.id}
                    id={plate.id}
                    className="card"
                    name={plate.name}
                    image={plate.image}
                    description={plate.description}
                    price={plate.price}
                  />
                ))
              : mainPlates.map((plate) => (
                  <Cards
                    key={plate.id}
                    id={plate.id}
                    className="card"
                    name={plate.name}
                    image={plate.image}
                    description={plate.description}
                    price={plate.price}
                  />
                ))}
          </Section>
        ) : (
          ""
        )}

        {dessertPlates.length > 0 ? (
          <Section title="Sobremesas">
            {user.id == 1
              ? dessertPlates.map((plate) => (
                  <CardsAdmin
                    key={plate.id}
                    id={plate.id}
                    className="card"
                    name={plate.name}
                    image={plate.image}
                    description={plate.description}
                    price={plate.price}
                  />
                ))
              : dessertPlates.map((plate) => (
                  <Cards
                    key={plate.id}
                    id={plate.id}
                    className="card"
                    name={plate.name}
                    image={plate.image}
                    description={plate.description}
                    price={plate.price}
                  />
                ))}
          </Section>
        ) : (
          ""
        )}

        {drinks.length > 0 ? (
          <Section title="Bebidas">
            {user.id == 1
              ? drinks.map((plate) => (
                  <CardsAdmin
                    key={plate.id}
                    id={plate.id}
                    className="card"
                    name={plate.name}
                    image={plate.image}
                    description={plate.description}
                    price={plate.price}
                  />
                ))
              : drinks.map((drink) => (
                  <Cards
                    key={drink.id}
                    id={drink.id}
                    className="card"
                    name={drink.name}
                    image={drink.image}
                    description={drink.description}
                    price={drink.price}
                  />
                ))}
          </Section>
        ) : (
          ""
        )}
      </Content>

      <Footer />
    </Container>
  );
}
