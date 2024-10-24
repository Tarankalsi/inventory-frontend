import { faAngleDown } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { ChangeEventHandler } from 'react';
import { selectedCategoryAtom } from '../../store/atoms/itemAtom';
import { useRecoilState } from 'recoil';

interface DropdownInputProps {
    label: string;
    options: { categoryId: string; categoryName: string }[]; // Expect options as an array of objects
    onChange: ChangeEventHandler<HTMLSelectElement>;
}

export default function DropdownInput({ label, options, onChange }: DropdownInputProps) {
    const [selectedCategory, setSelectedCategory] = useRecoilState(selectedCategoryAtom); // State to track the selected value
    
    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const value = e.target.value;
        setSelectedCategory(value); // Update selected value
        onChange(e); // Call the onChange prop function
    };

    return (
        <div className="max-w-sm mx-auto relative">
            <label
                className="absolute -top-2 bg-white px-2 left-1 block ml-1 text-xs font-medium text-gray-500 dark:text-white transition-colors duration-200"
            >
                {label}
            </label>
            <select
                id="categories"
                value={selectedCategory}
                onChange={handleChange}
                className="bg-white w-32 rounded-md border border-gray-300 text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            >
                <option value="all">All</option>
                {options.map((option) => (
                    <option key={option.categoryId} value={option.categoryName}>
                        {option.categoryName}
                    </option>
                ))}
                
            </select>
        </div>
    );
}
