import React, {ChangeEvent, FC, SetStateAction, useEffect, useState} from "react";
import {CategoryDropdown} from "../Shared/CategoryDropdown";
import {GenderDropdown} from "../Shared/GenderDropdown";
import {IProduct} from "../../Interfaces/IProduct";
import {Button, Form} from "react-bootstrap";
import {ClothesService} from "../../Services/ClothesService";
import createHistory from 'history/createBrowserHistory'
import {ISize} from "../../Interfaces/ISize";

// Form that lets you create clothing and push it to the database
const CreateClothingForm: FC = () => {

    const history = createHistory();

    const [newClothing, setNewClothing] = useState<IProduct>({
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
        amount: 0,
        reviews: []
    });
    const [newImage, setNewImage] = useState<File>();

    const [sizes, setSizes] = useState<ISize[]>([]);

    // One usestate for each dropdown-menu. useEffect puts the new dropdown choice into the Clothing useState
    const [newCategory, setCategory] = useState(newClothing.category);
    useEffect(() => {
        setNewClothing({...newClothing, category: newCategory});
    }, [newCategory]);

    // const [newSize, setSize] = useState( newClothing.size[0] );
    // useEffect(() => {
    //     setNewClothing( {...newClothing, size: newSize});
    // }, [newSize]);

    const [newGender, setGender] = useState(newClothing.gender);
    useEffect(() => {
        setNewClothing({...newClothing, gender: newGender});
    }, [newGender]);

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        let {name} = event.target;


        // Updates the clothing and/or image useState, every time an input changes
        switch (name) {
            case "brand":
                setNewClothing({...newClothing, brandName: event.target.value});
                break;
            case "name":
                setNewClothing({...newClothing, clothingName: event.target.value});
                break;
            case "priceNok":
                setNewClothing({...newClothing, priceNok: parseInt(event.target.value)});
                break;
            case "color":
                setNewClothing({...newClothing, color: event.target.value});
                break;
            case "image":
                let {files} = event.target;
                if (files) {
                    if (files[0] != undefined)
                        setNewClothing({
                            ...newClothing, images: [{
                                name: files[0].name
                            }]
                        });
                    setNewImage(files[0]);
                }
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

        setNewClothing({...newClothing, size: sizes});
    };

    const postNewClothing = (e: React.FormEvent) => {
        e.preventDefault();
        ClothesService.postClothing(newClothing, newImage as File);
        history.go(0);
    };

    const addNewSize = () => {
        setSizes([...sizes, {
            name: "",
            stock: 0
        }]);
    };

    const removeSize = (index: number) => {
        const _sizes = sizes.filter((_, i) => i !== index);
        setSizes(_sizes);
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
                    <Form.Label>Price NOK</Form.Label>
                    <Form.Control onChange={handleChange} name="priceNok" type="number" required/>
                </Form.Group>
                <Form.Group>
                    <Form.Label>Color</Form.Label>
                    <Form.Control onChange={handleChange} name="color" type="text" required/>
                </Form.Group>
                <Form.Group>
                    <h2>Sizes</h2>
                    {sizes.map((size, index) => {
                        return <Form.Group>
                            <Form.Label>Size Name: {size.name}</Form.Label>
                            <Form.Control onChange={event => handleSizeChange(index, event)} name="size" type="text"/>
                            <Form.Label>Size Stock: {size.stock}</Form.Label>
                            <Form.Control onChange={event => handleSizeChange(index, event)} name="stock"
                                          type="number"/>
                            <Button className={"mt-2"} variant={"danger"} onClick={() => removeSize(index)}>
                                Remove size
                            </Button>
                        </Form.Group>
                    })}
                </Form.Group>

                <Form.Group>
                    <Button className="mt-2" onClick={addNewSize} variant={"primary"}>
                        Add new size
                    </Button>
                </Form.Group>
                <Form.Group>
                    <CategoryDropdown
                        onCategoryChange={(eventKey, _) => setCategory(eventKey as SetStateAction<"Sko" | "Overdel" | "Underdel" | "Accesories">)}
                        category={newCategory}/>
                    <GenderDropdown
                        onGenderChange={(eventKey, _) => setGender(eventKey as SetStateAction<"Female" | "Unisex" | "Male">)}
                        gender={newGender}/>
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