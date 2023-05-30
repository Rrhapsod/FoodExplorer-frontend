import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
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

export function Edit() {
  const navigate = useNavigate();

  const params = useParams();

  const [data, setData] = useState(null);

  const [id, setId] = useState(null);

  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");

  const [ingredients, setIngredients] = useState([]);
  const [newIngredient, setNewIngredient] = useState("");

  const [image, setImage] = useState(null);
  const [oldImage, setOldImage] = useState(null);

  const options = ["principal", "sobremesa", "bebida"];
  const [category, setCategory] = useState(options[0]);

  const handleGoBack = () => {
    navigate(-1);
  };

  const handleAddIngredient = () => {
    setIngredients((prevState) => [...prevState, newIngredient]);
    setNewIngredient("");
  };

  const handleRemoveIngredient = (deleted) => {
    setIngredients((prevState) =>
      prevState.filter((ingredient) => ingredient !== deleted)
    );
  };

  const handleImg = (event) => {
    const file = event.target.files[0];
    setImage(file);
  };

  const handleDelete = async () => {
    try {
      await api.delete(`/dishes/${id}`);
      alert("Prato excluído");
      navigate(-1);
      return;
    } catch {
      return alert("ERROR, favor tentar novamente");
    }
  };

  const handleEdit = async () => {
    if (newIngredient.length > 0) {
      return alert("Existem ingredientes que não foram adicionados.");
    }

    if (!name || !price || !description || !ingredients) {
      return alert("Preencha todos os campos para editar o prato.");
    }

    if (!image) {
      return alert("É necessário adicionar uma imagem ao prato.");
    }
    await api.put(`/dishes/${id}`, {
      name,
      price: price * 100,
      description,
      category,
      ingredients,
    });

    if (image) {
      const fileUploadForm = new FormData();
      fileUploadForm.append("image", image);

      await api.patch(`/dishes/${id}/image`, fileUploadForm);
    }

    alert("Edição realizada com sucesso");
    navigate("/");
  };

  useEffect(() => {
    const fetchDish = async () => {
      const response = await api.get(`/dishes/${params.id}`);
      setData(response.data);
      setId(response.data.id);
      setName(response.data.name);
      setCategory(response.data.category);
      setDescription(response.data.description);
      setPrice(response.data.price);
      setIngredients(response.data.ingredients);
      setOldImage(response.data.image);
    };

    fetchDish();
  }, []);

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
          <h2>Editar prato</h2>
          {data && (
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
                    placeholder={name}
                    name="teste da hora"
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
                        value={item.name}
                        click={() => handleRemoveIngredient(item)}
                      />
                    ))}

                    <Tag
                      isNew
                      placeholder="Adicionar"
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
                    name="price"
                    placeholder={price / 100}
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
                    placeholder={description}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                </div>
              </div>

              <div className="buttons">
                <button className="excluir" onClick={handleDelete}>
                  Excluir Prato
                </button>
                <Button title="Salvar prato" onClick={handleEdit} />
              </div>
            </form>
          )}
        </div>
      </Content>

      <Footer />
    </Container>
  );
}
