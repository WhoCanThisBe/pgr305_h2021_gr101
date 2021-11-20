import React, {ChangeEvent, FC, SetStateAction, useEffect, useState} from "react";
import { SizeDropdown } from "../Shared/SizeDropdown"
import { CategoryDropdown } from "../Shared/CategoryDropdown";
import { GenderDropdown} from "../Shared/GenderDropdown";
import {IProduct} from "../../Interfaces/IProduct";
import {Button, Form} from "react-bootstrap";
import {ClothesService} from "../../Services/ClothesService";
import createHistory from 'history/createBrowserHistory'

// Form that lets you create clothing and push it to the database
const CreateClothingForm : FC = () => {

    const history = createHistory();

    const [newClothing, setNewClothing] = useState<IProduct>({
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
            case "priceNok":
                setNewClothing({...newClothing, priceNok: parseInt(event.target.value)});
                break;
            case "color":
                setNewClothing( {...newClothing, color: event.target.value });
                break;
            case "image":
                let { files } = event.target;
                if ( files ){
                    if( files[0] != undefined )
                        setNewClothing({...newClothing, images: [{
                                name: files[0].name
                            }]});
                        setNewImage(files[0]);
                }
                break;
        }
    };

    // TODO Find way to reload list in AClothingList when calling this method to replace history.go()
    // TODO have a checker that the file you put in passes only if its a jpeg
    const postNewClothing = (e:React.FormEvent) => {
        e.preventDefault();
        ClothesService.postClothing(newClothing, newImage as File);
        history.go(0);
    };

    return (
        <article>
            <Form onSubmit={postNewClothing}>
                <Form.Group>
                    <Form.Label>Brand name</Form.Label>
                    <Form.Control onChange={handleChange} name="brand" type="text" required/>
                </Form.Group>
                <Form.Group>
                    <Form.Label>Clothing name</Form.Label>
                    <Form.Control onChange={handleChange} name="name" type="text" required/>
                </Form.Group>
                <Form.Group>
                    <Form.Label>Stock</Form.Label>
                    <Form.Control onChange={handleChange} name="stock" type="number" required/>
                </Form.Group>
                <Form.Group>
                    <Form.Label>Price NOK</Form.Label>
                    <Form.Control onChange={handleChange} name="priceNok" type="number" required/>
                </Form.Group>
                <Form.Group>
                    <Form.Label>Color</Form.Label>
                    <Form.Control onChange={handleChange} name="color" type="text" required/>
                </Form.Group>
                <Form.Group>
                    <CategoryDropdown onCategoryChange={(eventKey, _) => setCategory(eventKey as SetStateAction<"Sko" | "Overdel" | "Underdel" | "Accesories">)} category={newCategory}/>
                    <SizeDropdown onSizeChange={(eventKey, _) => setSize(eventKey as SetStateAction<"Small" | "Medium" | "Large">)} size={newSize}/>
                    <GenderDropdown onGenderChange={(eventKey, _) => setGender(eventKey as SetStateAction<"Female" | "Unisex" | "Male">)} gender={newGender}/>
                </Form.Group>
                <Form.Group>
                    <Form.Control onChange={handleChange} name="image" type="file" required/>
                </Form.Group>
                <Form.Group>
                    <Button type="submit" className="mt-2" variant="primary">
                        Save new clothing
                    </Button>
                </Form.Group>
            </Form>
        </article>
    )
};

export default CreateClothingForm;