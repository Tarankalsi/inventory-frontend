import { faPencil, faSquareXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import  {  useState } from 'react';
import { useRecoilState } from 'recoil';
import { selectedItemsAtom } from '../../store/atoms/itemAtom';

const ItemTable = ({ items }: { items: any }) => {
    const [selectAll, setSelectAll] = useState(false);
    const [selectedItems, setSelectedItems] = useRecoilState(selectedItemsAtom);
   

    const handleSelectAll = () => {
        setSelectAll(!selectAll);

        if (!selectAll) {
   
            const allItemIds = items.map((item: any) => item.id);
            setSelectedItems(allItemIds);
        } else {
  
            setSelectedItems([]);
        }
    };


    const handleCheckboxChange = (itemId: string) => {
        if (selectedItems.includes(itemId)) {
      
            setSelectedItems(selectedItems.filter(id => id !== itemId));
        } else {
        
            setSelectedItems([...selectedItems, itemId]);
        }
    };

    return (
        <table className="min-w-full mx-2 border-collapse border border-gray-200">
            <thead>
                <tr className="text-gray-700">
                    <th className="border border-gray-300 px-4 py-2">
                        <input
                            type="checkbox"
                            checked={selectAll} 
                            onChange={handleSelectAll} 
                        />
                    </th>
                    <th className="border border-gray-300 px-4 py-2">Item Name</th>
                    <th className="border border-gray-300 px-4 py-2">Item Code</th>
                    <th className="border border-gray-300 px-4 py-2">Category</th>
                    <th className="border border-gray-300 px-4 py-2">Stock Quantity</th>
                    <th className="border border-gray-300 px-4 py-2">Stock On Hold</th>
                    <th className="border border-gray-300 px-4 py-2">Stock Value</th>
                    <th className="border border-gray-300 px-4 py-2">Purchase Price</th>
                    <th className="border border-gray-300 px-4 py-2"></th>
                </tr>
            </thead>
            <tbody>
                {items.map((item: any) => (
                    <tr key={item.itemId} className="hover:bg-gray-50">
                        <td className="border border-gray-300 px-4 py-2">
                            <input
                                type="checkbox"
                                checked={selectedItems.includes(item.itemId)} 
                                onChange={() => handleCheckboxChange(item.itemId)} 
                            />
                        </td>
                        <td className="border-b border-gray-300 px-4 py-2 w-56">{item.itemName}</td>
                        <td className="border-b border-gray-300 px-4 py-2 text-center">{item.itemCode}</td>
                        <td className="border-b border-gray-300 px-4 py-2 text-center">{item.category?.categoryName}</td>
                        <td className="border-b border-gray-300 px-4 py-2 text-center">
                            {item.quantity} PCS{' '}
                        </td>
                        <td className="border-b border-gray-300 px-4 py-2 text-center">{item.holdStock} PCS</td>
                        <td className="border-b border-gray-300 px-4 py-2 text-center">₹ {item.price * item.quantity}</td>
                        <td className="border-b border-gray-300 px-4 py-2 text-center">₹ {item.price}</td>
                        <td className="border-b border-gray-300 px-4 py-2 w-56 text-right pr-6">
                            {item.quantity < item.lowStockIndicator && (
                                <FontAwesomeIcon
                                    icon={faSquareXmark}
                                    className="text-red-500 mx-3 size-4 ml-2 cursor-pointer"
                                    title="Low Stock Warning"
                                />
                            )}
                            <button>
                                <FontAwesomeIcon className="text-gray-500 mx-2 size-4 hover:text-gray-700" icon={faPencil} />
                            </button>
                            <button className="text-blue-500 mr-2 hover:border-gray-400 hover:bg-blue-50 rounded-sm border text-xs px-2 py-1 font-semibold">
                                ADJUST STOCK
                            </button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default ItemTable;
