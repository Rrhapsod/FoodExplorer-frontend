import { Container, Content } from "./styles";
import { HeaderAdmin } from "../../components/HeaderAdmin";
import { Footer } from "../../components/Footer";
import { ButtonTransparent } from "../../components/ButtonTransparent";
import { Button } from "../../components/Button";

import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { FiChevronLeft } from "react-icons/fi";
import { FiMinus, FiPlus } from "react-icons/fi";

import { api } from "../../services/api";
import { Ingredients } from "../../components/Ingredients";

export function DishView({ ...rest }) {
  const params = useParams();
  const navigate = useNavigate();
  const [data, setData] = useState(null);
  const [image, setImage] = useState(null);

  const [amount, setAmount] = useState(1);

  function handleNavigate() {
    navigate(-1);
  }

  function handleIncrease() {
    setAmount((prevState) => prevState + 1);
  }

  function handleDecrease() {
    setAmount((prevState) => prevState - 1);
  }

  useEffect(() => {
    const fetchDishes = async () => {
      const response = await api.get(`/dishes/${params.id}`);
      setData(response.data);
    };

    fetchDishes();
  }, []);

  useEffect(() => {
    const fetchImage = async () => {
      if (data) {
        setImage(`${api.defaults.baseURL}/files/${data.image}`);
      }
    };

    fetchImage();
  }, [data]);

  return (
    <Container {...rest}>
      <HeaderAdmin />

      <Content>
        <ButtonTransparent
          icon={FiChevronLeft}
          title="Voltar"
          onClick={handleNavigate}
        />

        {data && (
          <form>
            <img src={image} alt="Imagem da refeição" />

            <div>
              <h1>{data.name}</h1>

              <p>{data.description}</p>

              {data.ingredients && (
                <span>
                  {data.ingredients.map((ingredient) => (
                    <Ingredients
                      key={String(ingredient.id)}
                      title={ingredient.name}
                    />
                  ))}
                </span>
              )}
              <footer>
                <button type="button" onClick={handleDecrease}>
                  <FiMinus />
                </button>
                <span>{amount}</span>

                <button type="button" onClick={handleIncrease}>
                  <FiPlus />
                </button>
                <Button title={`incluir - R$ ${data.price / 100}`} />
              </footer>
            </div>
          </form>
        )}
      </Content>

      <Footer />
    </Container>
  );
}
