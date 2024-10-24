import { atom } from "recoil";

export const selectedItemsAtom = atom<string[]>({
    key: 'selectedItemsAtom', // unique ID (with respect to other atoms/selectors)
    default: [], // default value (aka initial value)
  });

  export const showLowStockAtom = atom<boolean>({
    key: 'showLowStockAtom', // unique ID (with respect to other atoms/selectors)
    default: false, // default value (aka initial value)
  });

  export const selectedCategoryAtom = atom<string>({
    key: 'selectedCategoryAtom', // unique ID (with respect to other atoms/selectors)
    default: "all", // default value (aka initial value)
  });

  interface Item {
    itemName: string;
    itemCode: string;
    category: string;
    quantityUnit: string;
    quantity: string;
    lowStockIndicator: string;
    price: string;
    gstTax: number;
    asOfDate: string; // ISO date format
  }
  
  export const itemAtom = atom<Item>({
    key: 'itemAtom',
    default: {
      itemName: '',
      itemCode: '',
      category: '',
      quantityUnit: '',
      quantity: "",
      lowStockIndicator: '',
      price: '',
      gstTax: 0,
      asOfDate: '',
    },
  });