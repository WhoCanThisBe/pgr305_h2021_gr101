import {ChangeEvent, FC, SetStateAction, useEffect, useState} from "react";
import { SizeDropdown } from "../Shared/SizeDropdown"
import { CategoryDropdown } from "../Shared/CategoryDropdown";
import { GenderDropdown} from "../Shared/GenderDropdown";
import {IProduct} from "../../Interfaces/IProduct";
import {Button, Form} from "react-bootstrap";
import {ClothesService} from "../../Services/ClothesService";

// Form that lets you create clothing and push it to the database
const CreateClothingForm : FC = () => {

    const [newClothing, setNewClothing] = useState<IProduct>({
        brandName: "",
        category: "Sko",
        clothingName: "",
        color: "",
        gender: "Male",
        id: undefined,
        image: "",
        size: "Small",
        stock: 0
    });
    const [newImage, setNewImage] = useState<File>();

    // One usestate for each dropdown-menu. useEffect puts the new dropdown choice into the Clothing useState
    const [newCategory, setCategory] = useState( newClothing.category );
    useEffect(() => {
        setNewClothing( {...newClothing, category: newCategory});
    }, [newCategory]);

    const [newSize, setSize] = useState( newClothing.size );
    useEffect(() => {
        setNewClothing( {...newClothing, size: newSize});
    }, [newSize]);

    const [newGender, setGender] = useState( newClothing.gender );
    useEffect(() => {
        setNewClothing( {...newClothing, gender: newGender});
    }, [newGender]);

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        let { name } = event.target;

        // Updates the clothing and/or image useState, every time an input changes
        switch ( name ){
            case "brand":
                setNewClothing( {...newClothing, brandName: event.target.value });
                break;
            case "name":
                setNewClothing( {...newClothing, clothingName: event.target.value });
                break;
            case "stock":
                setNewClothing( {...newClothing, stock: parseInt(event.target.value) });
                break;
            case "color":
                setNewClothing( {...newClothing, color: event.target.value });
                break;
            case "image":
                let { files } = event.target;
                if ( files ){
                        // TODO Fix bug where program crashes when you exit the file pop up, after an image is already selected
                        setNewClothing({...newClothing, image: files[0].name});
                        setNewImage(files[0]);
                }
                break;
        }
    };

    const postNewClothing = () => {
        ClothesService.postClothing(newClothing, newImage as File)
    };

    return (
        <Form>
            <Form.Group>
                <Form.Label>Brand name</Form.Label>
                <Form.Control onChange={handleChange} name="brand" type="text"/>
            </Form.Group>
            <Form.Group>
                <Form.Label>Clothing name</Form.Label>
                <Form.Control onChange={handleChange} name="name" type="text"/>
            </Form.Group>
            <Form.Group>
                <Form.Label>Stock</Form.Label>
                <Form.Control onChange={handleChange} name="stock" type="number"/>
            </Form.Group>
            <Form.Group>
                <Form.Label>Color</Form.Label>
                <Form.Control onChange={handleChange} name="color" type="text"/>
            </Form.Group>
            <Form.Group>
                <CategoryDropdown onCategoryChange={(eventKey, _) => setCategory(eventKey as SetStateAction<"Sko" | "Jakke" | "Genser" | "Bukse" | "Accesories">)} category={newCategory}/>
                <SizeDropdown onSizeChange={(eventKey, _) => setSize(eventKey as SetStateAction<"Small" | "Medium" | "Large">)} size={newSize}/>
                <GenderDropdown onGenderChange={(eventKey, _) => setGender(eventKey as SetStateAction<"Female" | "Unisex" | "Male">)} gender={newGender}/>
            </Form.Group>
            <Form.Group>
                <Form.Control onChange={handleChange} name="image" type="file"/>
            </Form.Group>
            <Form.Group>
                <Button className="mt-2" onClick={postNewClothing} variant="primary">
                    Save new clothing
                </Button>
            </Form.Group>
        </Form>
    )
};

export default CreateClothingForm;