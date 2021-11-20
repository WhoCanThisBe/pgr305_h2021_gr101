import { useParams } from "react-router";
import React, {ChangeEvent, FC, SetStateAction, useContext, useEffect, useState} from "react";
import {ClothesContext} from "../../Contexts/ClothesContext";
import { IProduct } from "../../Interfaces/IProduct";
import {ClothesContextType} from "../../Types/ClothesContextType";
import {Button, Form} from "react-bootstrap";
import {CategoryDropdown} from "../Shared/CategoryDropdown";
import {SizeDropdown} from "../Shared/SizeDropdown";
import {GenderDropdown} from "../Shared/GenderDropdown";
import {ClothesService} from "../../Services/ClothesService";
import createHistory from "history/createBrowserHistory";
import {ISize} from "../../Interfaces/ISize";

const UpdateClothingForm: FC = () => {

    const history = createHistory();

    const { id }: any = useParams();

    const { fetchProductById } = useContext( ClothesContext ) as ClothesContextType;
    const [clothing, setClothing] = useState<IProduct>({
        brandName: "",
        category: "Sko",
        clothingName: "",
        color: "",
        gender: "Male",
        id: undefined,
        images: [],
        size: [],
        stock: 0,
        priceNok: 0,
        amount: 0
    });

    const [sizes, setSizes] = useState<ISize[]>([]);

    // Set clothing by id on render
    useEffect(() => {
            const _clothing = fetchProductById(id);
            if (_clothing) {
                setClothing(() => _clothing);
                setSizes(() => _clothing.size);
            }
    },[id, fetchProductById]);

    // One usestate for each dropdown-menu. useEffect puts the new dropdown choice into the Clothing useState
    const [newCategory, setCategory] = useState(clothing?.category);
    useEffect(() => {
            if(clothing)
                setClothing({...clothing, category: newCategory});
        }, [newCategory]);

    const [newSize, setSize] = useState(clothing?.size);
    useEffect(() => {
        if(clothing)
            setClothing({...clothing, size: newSize});
        }, [newSize]);

    const [newGender, setGender] = useState(clothing?.gender);
    useEffect(() => {
        if(clothing)
            setClothing({...clothing, gender: newGender});
        }, [newGender]);

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        let { name } = event.target;

        // Updates the clothing every time an input changes
        switch ( name ){
            case "brand":
                setClothing( {...clothing, brandName: event.target.value });
                break;
            case "name":
                setClothing( {...clothing, clothingName: event.target.value });
                break;
            case "stock":
                setClothing( {...clothing, stock: parseInt(event.target.value) });
                break;
            case "priceNok":
                setClothing({...clothing, priceNok: parseInt(event.target.value) });
                break;
            case "color":
                setClothing( {...clothing, color: event.target.value });
                break;
        }
    };

    const handleSizeChange = (index: number, event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        let {name, value} = event.target;

        if (name === "size") {
            const editSizes = sizes;
            editSizes[index].name = value;
            setSizes(editSizes);
        } else if (name === "stock") {
            const editSizes = sizes;
            editSizes[index].stock = Number(value);
            setSizes(editSizes);
        }

        setClothing({...clothing, size: sizes});
    }

    const putNewClothing = () => {
        ClothesService.putClothing(clothing);
        history.go(0);
    };

    const addNewSize = () => {
        setSizes([...sizes, {
            name: "",
            stock: 0
        }]);
    }

    const removeSize = (index: number) => {
        const _sizes = sizes.filter((_, i) => i !== index);
        setSizes(_sizes);
    }

    return (
        <Form>
            <Form.Group>
                <Form.Label>Brand: {clothing?.brandName}</Form.Label>
                <Form.Control onChange={handleChange} name="brand" type="text"/>
            </Form.Group>
            <Form.Group>
                <Form.Label>Name: {clothing?.clothingName}</Form.Label>
                <Form.Control onChange={handleChange} name="name" type="text"/>
            </Form.Group>
            <Form.Group>
                <Form.Label>Price NOK: {clothing?.priceNok}</Form.Label>
                <Form.Control onChange={handleChange} name="priceNok" type="number"/>
            </Form.Group>
            <Form.Group>
                <Form.Label>Color: {clothing?.color}</Form.Label>
                <Form.Control onChange={handleChange} name="color" type="text"/>
            </Form.Group>

            <h2>Sizes</h2>
            {sizes.map((size, index) => {
              return <Form.Group>
                  <Form.Label>Size Name: {size.name}</Form.Label>
                  <Form.Control onChange={event => handleSizeChange(index, event)} name="size" type="text"/>
                  <Form.Label>Size Stock: {size.stock}</Form.Label>
                  <Form.Control onChange={event => handleSizeChange(index, event)} name="stock" type="number"/>
                  <Button className={"mt-2"} variant={"danger"} onClick={() => removeSize(index)}>
                      Remove size
                  </Button>
              </Form.Group>
            })}

            <Form.Group>
                <Button className="mt-2" onClick={addNewSize} variant={"primary"}>
                    Add new size
                </Button>
            </Form.Group>
            <Form.Group>
                <CategoryDropdown onCategoryChange={(eventKey, _) => setCategory(eventKey as SetStateAction<"Sko" | "Overdel" | "Underdel" | "Accesories">)} category={newCategory}/>
                <GenderDropdown onGenderChange={(eventKey, _) => setGender(eventKey as SetStateAction<"Female" | "Unisex" | "Male">)} gender={newGender}/>
            </Form.Group>
            <Form.Group>
                <Button className="mt-2" onClick={putNewClothing} variant="primary">
                    Change Clothing
                </Button>
            </Form.Group>
        </Form>
    )
};

export default UpdateClothingForm;