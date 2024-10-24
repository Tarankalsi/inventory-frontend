import React, { useEffect, useState } from 'react';
import Header from '../components/Inventory/Header';
import OperationBar from '../components/Inventory/OperationBar';
import ItemTable from '../components/Inventory/Table';
import axios from 'axios';
import { selectedCategoryAtom, showLowStockAtom } from '../store/atoms/itemAtom';
import { useRecoilState } from 'recoil';
import ItemModal from '../components/Inventory/ItemModal';

const Inventory: React.FC = () => {
  const [items, setItems] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState<number | null>(null);
  const [showlowStock] = useRecoilState(showLowStockAtom);
  const [selectedCategory] = useRecoilState(selectedCategoryAtom);
  const [showItemModal, setShowOpenModal] = useState(false);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        let response;

        if (showlowStock) {
          response = await axios.get('http://localhost:3000/api/item/filter/low-stock', { params: { page } });
        } else if (selectedCategory !== "all") {
          response = await axios.get('http://localhost:3000/api/item/filter/category', {
            params: { page, category: selectedCategory },
          });
        } else {
          response = await axios.get('http://localhost:3000/api/item/fetch', { params: { page } });
        }

        setItems(response.data.items);
        setTotalPages(response.data.totalPages);
      } catch (error) {
        console.error("Error fetching items: ", error);
      }
    };

    fetchItems();
  }, [page, showlowStock, selectedCategory]);

  return (
    <div className="py-6">
      <Header />
      <OperationBar setShowOpenModal={setShowOpenModal} />
      <ItemTable items={items} />
      <ItemModal isOpen={showItemModal} onClose={() => setShowOpenModal(false)} />
    </div>
  );
};

export default Inventory;
