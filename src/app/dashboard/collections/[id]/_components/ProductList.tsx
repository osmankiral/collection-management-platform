"use client";

import React from "react";
import SortableItem from "./SortableItem";

interface Product {
  productCode: string;
  colorCode: string;
  name: string | null;
  outOfStock: boolean;
  isSaleB2B: boolean;
  imageUrl: string;
}

interface ProductListProps {
  products: Product[];
  onClick?: (product: Product) => void;
  onRemove?: (productCode: string) => void;
}

const ProductList = ({ products, onClick, onRemove }: ProductListProps) => {
  return (
    <ul className="grid grid-cols-3 gap-4">
      {products.map((product) => (
        <SortableItem
          key={product.productCode}
          id={product.productCode}
          product={product}
          onClick={() => onClick && onClick(product)}
          onRemove={onRemove}
        />
      ))}
    </ul>
  );
};

export default ProductList;
