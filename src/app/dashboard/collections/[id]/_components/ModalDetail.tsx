"use client";

import React from "react";
import { Button } from "@/components/ui/button";

interface Product {
  productCode: string;
  colorCode: string;
  name: string | null;
  outOfStock: boolean;
  isSaleB2B: boolean;
  imageUrl: string;
}

interface ModalDetailProps {
  products: Product[];
  onClose: () => void;
  onConfirm: () => void;
}

const ModalDetail = ({ products, onClose, onConfirm }: ModalDetailProps) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-60">
      <div className="bg-white rounded p-6 w-96">
        <h3 className="text-xl font-bold mb-4">İşlem Detayları</h3>
        <pre className="text-sm overflow-auto max-h-48">
          {JSON.stringify(products, null, 2)}
        </pre>
        <div className="flex justify-end gap-4 mt-6">
          <Button variant="outline" onClick={onClose} className="w-24">
            Kapat
          </Button>
          <Button onClick={onConfirm} className="w-24">
            Onayla
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ModalDetail;
