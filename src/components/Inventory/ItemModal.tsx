import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes, faUpload } from '@fortawesome/free-solid-svg-icons'; // Added faUpload import
import { useRecoilState } from 'recoil';
import { itemAtom } from '../../store/atoms/itemAtom';
import axios from 'axios';
import InputBox from './InputBox';

interface ItemModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const apiUrl = import.meta.env.VITE_URL;

const ItemModal: React.FC<ItemModalProps> = ({ isOpen, onClose }) => {
    const [itemData, setItemData] = useRecoilState(itemAtom);
    const [categories, setCategories] = useState([]);
    const [images, setImages] = useState<File[]>([]);
    const [selecetedCategory, setSelecetedCategory] = useState("") 

 
    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await axios.get(`${apiUrl}/category/fetch`);
                setCategories(response.data.data);
            } catch (error) {
                console.error('Error fetching categories', error);
            }
        };
        fetchCategories();
    }, []);


    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            const selectedFiles = Array.from(e.target.files);
            setImages((prevImages) => [...prevImages, ...selectedFiles]); 
        }
    };

    const onCategorySelected = (e :any)=>{
        setSelecetedCategory(e.target.value)
    }


    const handleInputChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
    ) => {
        const { name, value, type } = e.target;
        setItemData((prev) => ({
            ...prev,
            [name]: type === 'number' ? Number(value) : value,
        }));
    };

    const handleSave = async () => {
        try {
 
            await axios.post(`${apiUrl}/item/create/${selecetedCategory}`, itemData, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            console.log('Item created successfully');
            onClose(); 
        } catch (error) {
            console.error('Error creating item:', error);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white rounded-lg p-6 w-[70%] max-h-[80%] overflow-y-auto">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-bold">Create New Item</h2>
                    <button onClick={onClose} className="text-gray-500">
                        <FontAwesomeIcon icon={faTimes} size="lg" />
                    </button>
                </div>

                <div className="grid grid-cols-12 gap-4">
                    <div className="col-span-6">
                     
                        <div className="mb-4">
                            <label className="block mb-2">Upload Images</label>
                            <div className="flex items-center justify-center w-full">
                                <label
                                    htmlFor="image-upload"
                                    className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50"
                                >
                                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                        <FontAwesomeIcon icon={faUpload} className="mb-4 text-gray-500" />
                                        <p className="mb-2 text-sm text-gray-500">
                                            <span className="font-semibold">Click to upload</span> or drag and drop
                                        </p>
                                        <p className="text-xs text-gray-500">SVG, PNG, JPG, or GIF (MAX. 800x400px)</p>
                                    </div>
                                    <input
                                        id="image-upload"
                                        type="file"
                                        multiple
                                        className="hidden"
                                        onChange={handleFileChange}
                                    />
                                </label>
                            </div>

                       
                            <div className="mt-4 grid grid-cols-3 gap-4">
                                {images.map((image, index) => (
                                    <div key={index} className="relative w-full h-32">
                                        <img
                                            src={URL.createObjectURL(image)}
                                            alt={`preview-${index}`}
                                            className="object-cover w-full h-full rounded-lg"
                                        />
                                        <button
                                            onClick={() =>
                                                setImages((prev) => prev.filter((_, i) => i !== index))
                                            }
                                            className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1"
                                        >
                                            <FontAwesomeIcon icon={faTimes} size="sm" />
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>

                   
                        <InputBox
                            type="text"
                            label="Item Name"
                            name="itemName"
                            value={itemData.itemName}
                            onChange={handleInputChange}
                        />

                        <InputBox
                            type="number"
                            label="Item Code"
                            name="itemCode"
                            value={itemData.itemCode}
                            onChange={handleInputChange}
                        />

         
                        <div className="mb-4">
                            <label className="block mb-2">Category</label>
                            <select
                                name="category"
                                value={itemData.category}
                                onChange={onCategorySelected}
                                className="w-full p-2 border rounded"
                            >
                                <option value="">Select Category</option>
                                {categories.map((category: any) => (
                                    <option key={category.categoryId} value={category.categoryId}>
                                        {category.categoryName}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>

                    <div className="col-span-6">
                        <InputBox
                            type="text"
                            label="Quantity Unit"
                            name="quantityUnit"
                            value={itemData.quantityUnit}
                            onChange={handleInputChange}
                        />

                        <InputBox
                            type="number"
                            label="Quantity"
                            name="quantity"
                            value={itemData.quantity}
                            onChange={handleInputChange}
                        />

                        <InputBox
                            type="number"
                            label="Low Stock Indicator"
                            name="lowStockIndicator"
                            value={itemData.lowStockIndicator}
                            onChange={handleInputChange}
                        />

                        <InputBox
                            type="number"
                            label="Purchase Price"
                            name="price"
                            value={itemData.price}
                            onChange={handleInputChange}
                        />

          
                        <div className="mb-4">
                            <label className="block mb-2">GST Tax Percentage</label>
                            <select
                                name="gstTax"
                                value={itemData.gstTax}
                                onChange={(e)=>{
                                     setItemData({...itemData, gstTax: Number(e.target.value) })
                                     console.log(itemData.gstTax)
   
                                }}
                                className="w-full p-2 border rounded"
                            >
                                <option value={5}>5%</option>
                                <option value={12}>12%</option>
                                <option value={18}>18%</option>
                                <option value={28}>28%</option>
                            </select>
                        </div>

                        <InputBox
                            type="date"
                            label="As of Date"
                            name="asOfDate"
                            value={itemData.asOfDate}
                            onChange={handleInputChange}
                        />

                      
                        <div className="mt-4">
                            <button
                                onClick={handleSave}
                                className="bg-blue-500 text-white px-4 py-2 rounded"
                            >
                                Save Item
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ItemModal;
