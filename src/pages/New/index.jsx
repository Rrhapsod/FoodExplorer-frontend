import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { MdOutlineArrowBackIos } from "react-icons/md";
import { FiUpload } from "react-icons/fi";

import { Container, Content } from "./styles";
import { api } from "../../services/api";

import { Tag } from "../../components/Tag";
import { Button } from "../../components/Button";
import { Input } from "../../components/Input";
import { HeaderAdmin } from "../../components/HeaderAdmin";
import { ButtonTransparent } from "../../components/ButtonTransparent";
import { Footer } from "../../components/Footer";

export function New() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");

  const [ingredients, setIngredients] = useState([]);
  const [newIngredient, setNewIngredient] = useState("");

  const [image, setImage] = useState(null);

  const options = ["principal", "sobremesa", "bebida"];
  const [category, setCategory] = useState(options[0]);

  const handleGoBack = () => {
    navigate(-1);
  };

  const handleAddIngredient = () => {
    setIngredients((prevState) => [...prevState, newIngredient]);
    setNewIngredient("");
  };

  const handleRemoveIngredient = (item) => {
    const newIngredients = ingredients.filter(
      (ingredient) => ingredient != item
    );

    setIngredients(newIngredients);
  };

  const handleImg = (event) => {
    const file = event.target.files[0];
    setImage(file);
  };

  const handleCreate = async () => {
    if (newIngredient.length > 0) {
      return alert("Existem ingredientes que não foram adicionados.");
    }

    if (!name || !price || !description || !category || !image) {
      return alert("Preencha todos os campos");
    }

    const response = await api.post("/dishes", {
      name,
      price: price * 100,
      description,
      category,
      ingredients,
    });

    const id = String(response.data.dish_id);

    const fileUploadForm = new FormData();
    fileUploadForm.append("image", image);

    await api.patch(`/dishes/${id}/image`, fileUploadForm);

    alert("Cadastro realizado com sucesso");
    navigate(-1);
  };

  return (
    <Container>
      <HeaderAdmin />

      <Content>
        <ButtonTransparent
          Icon={MdOutlineArrowBackIos}
          iconSize={20}
          title="voltar"
          onClick={handleGoBack}
        />

        <div>
          <h2>Criar prato</h2>

          <form>
            <div className="wrapper">
              <div className="files">
                <p>Imagem do Prato</p>
                <label htmlFor="plate-name">
                  <FiUpload size={24} /> Selecione imagem
                </label>
                <input
                  type="file"
                  id="plate-name"
                  name="plate-name"
                  onChange={handleImg}
                />
              </div>

              <div className="inputs-box">
                <Input
                  title="Nome"
                  type="text"
                  placeholder="Ex.: Salada Caesar"
                  name="name"
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
              <div className=" select">
                <label htmlFor="food_type">Categoria</label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                >
                  {options.map((option, index) => (
                    <option value={option} key={String(index)}>
                      {option}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="wrapper">
              <div className="inputs-box ingredients">
                <h3>Ingredientes</h3>
                <div className="tags">
                  {ingredients.map((item, index) => (
                    <Tag
                      key={String(index)}
                      value={item}
                      click={() => handleRemoveIngredient(item)}
                    />
                  ))}

                  <Tag
                    isNew
                    placeholder="Ingredientes"
                    onChange={(e) => setNewIngredient(e.target.value)}
                    value={newIngredient}
                    click={handleAddIngredient}
                  />
                </div>
              </div>

              <div className="inputs-box price">
                <Input
                  title="Preço"
                  type="text"
                  placeholder="R$ 00,00"
                  name="price"
                  onChange={(e) => setPrice(Number(e.target.value))}
                  required
                />
              </div>
            </div>

            <div className="wrapper">
              <div className="inputs-box textarea">
                <h3>Descrição</h3>
                <textarea
                  name="description"
                  id="description"
                  placeholder="Fale brevemente sobre o prato, seus ingredientes e composição"
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>
            </div>

            <Button title="Salvar prato" onClick={handleCreate} />
          </form>
        </div>
      </Content>

      <Footer />
    </Container>
  );
}
