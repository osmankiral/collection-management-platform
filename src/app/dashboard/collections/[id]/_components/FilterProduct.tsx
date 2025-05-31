"use client";

import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Funnel, X } from "lucide-react";
import { useState } from "react";

export default function FilterModal() {
  const [filters, setFilters] = useState<string[]>([]);

  const updateFilter = (key: string, value: string) => {
    const existing = filters.filter((f) => !f.startsWith(`${key}:`));
    if (value === "") {
      setFilters(existing);
    } else {
      setFilters([...existing, `${key}: ${value}`]);
    }
  };

  const removeFilter = (filter: string) => {
    setFilters(filters.filter((f) => f !== filter));
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className="bg-black text-white flex items-center py-3 px-5 rounded-lg cursor-pointer hover:bg-gray-900 transition">
          Filtreler <Funnel className="ml-4" />
        </div>
      </DialogTrigger>

      <DialogContent className="max-w-7xl mx-auto w-full p-10">
        <DialogTitle className="text-2xl font-semibold mb-6">
          Filtreleme Paneli
        </DialogTitle>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          
          <div className="space-y-4">
            <h3 className="text-lg font-bold">Filtreler</h3>

            <div className="space-y-2">
              <Select onValueChange={(val) => updateFilter("Yıl", val)}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Yıl seçiniz" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="2023">2023</SelectItem>
                  <SelectItem value="2024">2024</SelectItem>
                </SelectContent>
              </Select>

              <Select
                onValueChange={(val) =>
                  updateFilter("Filtre", val === "" ? "" : val)
                }
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Lütfen filtre seçiniz." />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="renk">Renk</SelectItem>
                  <SelectItem value="kategori">Kategori</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          
          <div className="space-y-4">
            <h3 className="text-lg font-bold">Stok</h3>

            <div className="space-y-2">
              <Select onValueChange={(val) => updateFilter("Depo", val)}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Lütfen depo seçiniz." />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Depo 1">Depo 1</SelectItem>
                  <SelectItem value="Depo 2">Depo 2</SelectItem>
                </SelectContent>
              </Select>

              <Input
                className="w-full"
                placeholder="Min."
                onBlur={(e) => updateFilter("Min Stok", e.target.value)}
              />

              <Input
                className="w-full"
                placeholder="Maks."
                onBlur={(e) => updateFilter("Max Stok", e.target.value)}
              />
            </div>
          </div>

          
          <div className="space-y-4">
            <h3 className="text-lg font-bold">Ürün Kodu</h3>

            <div className="space-y-2">
              <Input
                className="w-full"
                placeholder="Seçiniz."
                onBlur={(e) => updateFilter("Ürün", e.target.value)}
              />

              <div className="flex items-center space-x-2 mt-2">
                <Checkbox
                  id="stockAllSizes"
                  onCheckedChange={(val) =>
                    updateFilter("Tüm Bedenlerde", val ? "Evet" : "")
                  }
                />
                <label htmlFor="stockAllSizes" className="text-sm">
                  Tüm Bedenlerinde Stok Olanlar
                </label>
              </div>
            </div>
          </div>

         
          <div className="space-y-4">
            <h3 className="text-lg font-bold">Sıralamalar</h3>

            <div className="space-y-2">
              <Select onValueChange={(val) => updateFilter("Sıralama", val)}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Seçiniz" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Artan">Artan</SelectItem>
                  <SelectItem value="Azalan">Azalan</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        
        <div className="mt-10 border pb-8 pt-3 px-5 rounded-lg">
          <h4 className="text-md font-semibold mb-4">Uygulanan Kriterler</h4>
          <div className="flex flex-wrap gap-3">
            {filters.length === 0 ? (
              <span className="text-sm text-gray-500 italic">
                Henüz filtre seçilmedi.
              </span>
            ) : (
              filters.map((filter, index) => (
                <div
                  key={index}
                  className="flex items-center bg-gray-200 text-sm px-3 py-1 rounded-full"
                >
                  {filter}
                  <X
                    className="ml-2 h-4 w-4 cursor-pointer text-gray-500"
                    onClick={() => removeFilter(filter)}
                  />
                </div>
              ))
            )}
          </div>
        </div>

       
        <div className="flex justify-center gap-4 mt-8">
          <Button variant="outline" onClick={() => setFilters([])}>
            Seçimi Temizle
          </Button>
          <Button onClick={() => alert(JSON.stringify(filters))}>Ara</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
