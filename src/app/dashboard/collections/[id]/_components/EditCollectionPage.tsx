"use client";

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from "@dnd-kit/core";

import {
  arrayMove,
  SortableContext,
  rectSortingStrategy,
} from "@dnd-kit/sortable";

import { AppDispatch, RootState } from "@/store/store";
import { fetchProducts } from "@/features/collections/productsSlice";
import { Button } from "@/components/ui/button";
import { FileImage } from "lucide-react";

import SortableItem from "./SortableItem";
import FilterModal from "./FilterProduct";

interface Product {
  productCode: string;
  colorCode: string;
  name: string | null;
  outOfStock: boolean;
  isSaleB2B: boolean;
  imageUrl: string;
}

interface EditCollectionPageProps {
  collectionId: string;
}

const EditCollectionPage = ({ collectionId }: EditCollectionPageProps) => {
  const { data: session } = useSession();
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();

  const {
    items: products = [],
    loading,
    error,
  } = useSelector((state: RootState) => state.products);

  const [availableProducts, setAvailableProducts] = useState<Product[]>([]);
  const [selectedProducts, setSelectedProducts] = useState<Product[]>([]);
  const [modalOpen, setModalOpen] = useState(false);

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } })
  );

  useEffect(() => {
    if (collectionId && session?.accessToken) {
      dispatch(fetchProducts({ id: collectionId, token: session.accessToken }));
    }
  }, [collectionId, session, dispatch]);

  useEffect(() => {
    setAvailableProducts(products);
  }, [products]);

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over) return;

    const activeId = active.id as string;
    const overId = over.id as string;

    const activeInAvailable = availableProducts.find(
      (p) => p.productCode === activeId
    );
    const activeInSelected = selectedProducts.find(
      (p) => p.productCode === activeId
    );

    const overInAvailable = availableProducts.find(
      (p) => p.productCode === overId
    );
    const overInSelected = selectedProducts.find(
      (p) => p.productCode === overId
    );

    if (activeInAvailable && !activeInSelected) {
      if (
        !selectedProducts.find(
          (p) => p.productCode === activeInAvailable.productCode
        )
      ) {
        setAvailableProducts((prev) =>
          prev.filter((p) => p.productCode !== activeId)
        );
        setSelectedProducts((prev) => [...prev, activeInAvailable]);
      }
      return;
    }

    if (activeInSelected && !activeInAvailable) {
      setSelectedProducts((prev) =>
        prev.filter((p) => p.productCode !== activeId)
      );
      setAvailableProducts((prev) => [...prev, activeInSelected]);
      return;
    }

    if (activeInAvailable && overInAvailable) {
      const oldIndex = availableProducts.findIndex(
        (p) => p.productCode === activeId
      );
      const newIndex = availableProducts.findIndex(
        (p) => p.productCode === overId
      );
      setAvailableProducts(arrayMove(availableProducts, oldIndex, newIndex));
      return;
    }

    if (activeInSelected && overInSelected) {
      const oldIndex = selectedProducts.findIndex(
        (p) => p.productCode === activeId
      );
      const newIndex = selectedProducts.findIndex(
        (p) => p.productCode === overId
      );
      setSelectedProducts(arrayMove(selectedProducts, oldIndex, newIndex));
      return;
    }
  };

  const handleRemoveFromSelected = (productCode: string) => {
    const productToMove = selectedProducts.find(
      (p) => p.productCode === productCode
    );
    if (!productToMove) return;

    setSelectedProducts((prev) =>
      prev.filter((p) => p.productCode !== productCode)
    );
    setAvailableProducts((prev) => [...prev, productToMove]);
  };

  const handleClickToAdd = (product: Product) => {
    if (!selectedProducts.find((p) => p.productCode === product.productCode)) {
      setAvailableProducts((prev) =>
        prev.filter((p) => p.productCode !== product.productCode)
      );
      setSelectedProducts((prev) => [...prev, product]);
    }
  };

  const handleCancel = () => router.back();
  const handleSave = () => setModalOpen(true);

  const totalSlots = availableProducts.length;
  const emptySlots =
    totalSlots - selectedProducts.length > 0
      ? totalSlots - selectedProducts.length
      : 0;

  return (
    <div className="min-h-screen flex flex-col">
      <div className="w-full px-4  flex justify-end">
        <FilterModal/>
      </div>

      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <div
          className="flex flex-1 gap-6 p-6 overflow-auto"
          style={{ maxHeight: "calc(100vh - 180px)" }}
        >
          <SortableContext
            items={availableProducts.map((p) => p.productCode)}
            strategy={rectSortingStrategy}
          >
            <div className="w-1/2 border rounded p-4 bg-white max-h-[600px] overflow-auto">
              <h3 className="text-lg font-semibold mb-4">
                Koleksiyon Ürünleri
              </h3>
              {loading && <p>Yükleniyor...</p>}
              {error && <p className="text-red-500">Hata: {error}</p>}
              <ul className="grid grid-cols-3 gap-4">
                {availableProducts.map((product) => (
                  <SortableItem
                    key={product.productCode}
                    id={product.productCode}
                    product={product}
                    onClick={() => handleClickToAdd(product)}
                  />
                ))}
              </ul>
            </div>
          </SortableContext>

          <SortableContext
            items={selectedProducts.map((p) => p.productCode)}
            strategy={rectSortingStrategy}
          >
            <div className="w-1/2 border rounded p-4 bg-gray-50 max-h-[600px] overflow-auto">
              <div className="mb-4 flex space-x-5">
                <h3 className="text-lg font-semibold ">Sabitler</h3>
                <span className="text-md text-gray-700 my-auto">
                  {selectedProducts.length === 0 && (
                    <p>(Ürünleri sürükleyin veya seçin)</p>
                  )}
                </span>
              </div>

              <ul className="grid grid-cols-3 gap-4">
                {selectedProducts.map((product, index) => (
                  <SortableItem
                    key={`${product.productCode}-selected-${index}`}
                    id={product.productCode}
                    product={product}
                    onRemove={handleRemoveFromSelected}
                  />
                ))}

                {Array.from({ length: emptySlots }).map((_, idx) => (
                  <li
                    key={`empty-${idx}`}
                    className="flex items-center justify-center border border-dashed border-gray-400 rounded p-4 h-72"
                  >
                    <FileImage className="opacity-40" />
                  </li>
                ))}
              </ul>
            </div>
          </SortableContext>
        </div>
      </DndContext>

      <div className="p-6 border-t flex justify-end gap-4 bg-white sticky bottom-0 z-50">
        <Button onClick={handleCancel} variant="outline" className="w-24">
          Vazgeç
        </Button>
        <Button
          onClick={handleSave}
          className="w-24"
          disabled={selectedProducts.length === 0}
        >
          Kaydet
        </Button>
      </div>

      {modalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-60">
          <div className="bg-white rounded p-6 w-96">
            <h3 className="text-xl font-bold mb-4">İşlem Detayları</h3>
            <pre className="text-sm overflow-auto max-h-48">
              {JSON.stringify(selectedProducts, null, 2)}
            </pre>
            <div className="flex justify-end gap-4 mt-6">
              <Button
                variant="outline"
                onClick={() => setModalOpen(false)}
                className="w-24"
              >
                Kapat
              </Button>
              <Button
                onClick={() => {
                  setModalOpen(false);
                }}
                className="w-24"
              >
                Onayla
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EditCollectionPage;
