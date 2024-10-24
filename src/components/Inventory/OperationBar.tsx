import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import DropdownInput from "../general/DropdownInput";
import { faXmark, faTrash, faPlus } from "@fortawesome/free-solid-svg-icons";
import { selectedCategoryAtom, selectedItemsAtom, showLowStockAtom } from "../../store/atoms/itemAtom";
import { useRecoilState, useSetRecoilState } from "recoil";
import axios from "axios";

export default function OperationBar({ setShowOpenModal }: { setShowOpenModal: (value: boolean) => void }) {
  const [showlowStock, setShowlowStock] = useRecoilState(showLowStockAtom);
  const [selectedItems] = useRecoilState(selectedItemsAtom);
  const [categories, setCategories] = useState([]);
  const setSelectedCategory = useSetRecoilState(selectedCategoryAtom);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/category/fetch');
        setCategories(response.data.data);
      } catch (error) {
        console.log("Error fetching categories", error);
      }
    };
    fetchCategories();
  }, []);

  const handleShowLowStock = () => {
    setShowlowStock(!showlowStock);
  };

  const handleSelectedCategory = (e: any) => {
    setSelectedCategory(e.target.value);
  };

  const handleAddToInventory = () => {
    setShowOpenModal(true); 
  }; 

  return (
    <div className="flex justify-end items-center gap-8 mr-12 py-6">
      <div>
        <button
          className={`text-sm font-semibold text-blue-800 px-2 py-1 ${showlowStock ? "border hover:border-gray-600 bg-blue-50 rounded-md" : ""}`}
          onClick={handleShowLowStock}
        >
          SHOW LOW STOCK
          {showlowStock && <FontAwesomeIcon className="mx-2" icon={faXmark} />}
        </button>
      </div>
      <div>
        <DropdownInput options={categories} label="Category" onChange={handleSelectedCategory} />
      </div>
      <div>
        <button
          className={`flex items-center border text-sm px-3 py-1.5 rounded-md font-semibold ${
            selectedItems.length === 0 ? "border-gray-300 text-gray-400" : "bg-red-400 hover:bg-red-500 text-white"
          }`}
          disabled={selectedItems.length === 0} 
        >
          <FontAwesomeIcon className="mr-2" icon={faTrash} />
          DELETE SELECTED
        </button>
      </div>
      <div>
        <button
          type="button"
          className="gap-2 text-white font-semibold bg-blue-800/90 hover:bg-blue-900 focus:ring-4 focus:outline-none focus:ring-[#3b5998]/50 rounded-md text-sm px-5 py-[7.5px] text-center inline-flex items-center"
          onClick={handleAddToInventory} 
        >
          <FontAwesomeIcon icon={faPlus} />
          ADD TO INVENTORY
        </button>
      </div>
    </div>
  );
}
