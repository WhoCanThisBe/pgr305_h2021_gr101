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
        size: "Small",
        stock: 0,
        priceNok: 0,
        amount: 0
    });

    // Set clothing by id on render
    useEffect(() => {
            const _clothing = fetchProductById(id);
            setClothing(() => _clothing);
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

    const putNewClothing = () => {
        ClothesService.putClothing(clothing);
        history.go(0);
    };

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
                <Form.Label>Stock: {clothing?.stock}</Form.Label>
                <Form.Control onChange={handleChange} name="stock" type="number"/>
            </Form.Group>
            <Form.Group>
                <Form.Label>Price NOK: {clothing?.priceNok}</Form.Label>
                <Form.Control onChange={handleChange} name="priceNok" type="number"/>
            </Form.Group>
            <Form.Group>
                <Form.Label>Color: {clothing?.color}</Form.Label>
                <Form.Control onChange={handleChange} name="color" type="text"/>
            </Form.Group>
            <Form.Group>
                <CategoryDropdown onCategoryChange={(eventKey, _) => setCategory(eventKey as SetStateAction<"Sko" | "Overdel" | "Bukse" | "Accesories">)} category={newCategory}/>
                <SizeDropdown onSizeChange={(eventKey, _) => setSize(eventKey as SetStateAction<"Small" | "Medium" | "Large">)} size={newSize}/>
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