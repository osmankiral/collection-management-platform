"use client";

import React from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { FileImage } from "lucide-react";
import Image from "next/image";

interface Product {
  productCode: string;
  colorCode: string;
  name: string | null;
  outOfStock: boolean;
  isSaleB2B: boolean;
  imageUrl: string;
}

interface SortableItemProps {
  id: string;
  product: Product;
  onRemove?: (id: string) => void;
  onClick?: () => void;
}

const SortableItem = ({
  id,
  product,
  onRemove,
  onClick,
}: SortableItemProps) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id });

  const style: React.CSSProperties = {
    transform: CSS.Transform.toString(transform),
    transition,
    border: isDragging
      ? "2px solid #2563eb"
      : product.outOfStock
      ? "2px solid red"
      : "2px solid black",
    padding: "10px",
    borderRadius: "6px",
    backgroundColor: isDragging ? "#e0f2fe" : "white",
    cursor: "grab",
  };

  return (
    <li
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      onClick={onClick}
      className="w-full h-full"
    >
      <div className="flex flex-col items-center gap-2">
        {product.imageUrl ? (
          <Image
            src={product.imageUrl}
            alt={product.name || product.productCode}
            width={400}
            height={168}
            className="object-cover rounded"
            unoptimized={true} // <-- bu satırı ekle
          />
        ) : (
          <div className="w-full h-32 flex items-center justify-center rounded bg-gray-200">
            <FileImage className="text-gray-400" size={40} />
          </div>
        )}
        <div className="text-center flex flex-col h-24">
          <p className="font-semibold">{product.name || product.productCode}</p>
          <p className="text-sm text-gray-600 mt-auto">
            Kod: {product.productCode}
          </p>
        </div>
        {onRemove && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              onRemove(id);
            }}
            className="text-red-600 font-bold hover:text-red-800"
            title="Kaldır"
          >
            ×
          </button>
        )}
      </div>
    </li>
  );
};

export default SortableItem;
