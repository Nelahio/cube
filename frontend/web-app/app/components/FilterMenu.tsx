import React, { useState, useEffect } from "react";
import { useParamsStore } from "@/hooks/useParamsStore";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";

const brands = [
  "Guerlain",
  "Dior",
  "Nina Ricci",
  "Paco Rabanne",
  "Dolce & Gabbana",
  "Lolita Lempicka",
];
const colors = [
  "rose",
  "rouge",
  "orange",
  "vert",
  "noir",
  "blanc",
  "violet",
  "jaune",
  "marron",
  "bleu",
  "gris",
];
const categories = ["parfum", "accessoire", "bijou"];
const states = ["neuf", "comme neuf", "bon état", "usé"];

const FilterMenu = () => {
  const { setParams, reset } = useParamsStore();

  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedStates, setSelectedStates] = useState<string[]>([]);

  const [expandedSection, setExpandedSection] = useState<string | null>(null);

  const handleFilterChange = (
    setter: React.Dispatch<React.SetStateAction<string[]>>,
    value: string
  ) => {
    setter((prev) =>
      prev.includes(value)
        ? prev.filter((item) => item !== value)
        : [...prev, value]
    );
  };

  useEffect(() => {
    setParams({
      make: selectedBrands,
      color: selectedColors,
      category: selectedCategories,
      state: selectedStates,
    });
  }, [
    selectedBrands,
    selectedColors,
    selectedCategories,
    selectedStates,
    setParams,
  ]);

  const clearFilters = () => {
    setSelectedBrands([]);
    setSelectedColors([]);
    setSelectedCategories([]);
    setSelectedStates([]);
    reset();
  };

  const toggleSection = (section: string) => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  return (
    <div className="p-4 bg-white shadow rounded w-full max-w-xs">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Filtres</h2>
        <button
          onClick={clearFilters}
          className="text-blue-600 hover:underline"
        >
          Tout effacer
        </button>
      </div>

      <div className="mb-4">
        <div
          className="flex justify-between items-center cursor-pointer"
          onClick={() => toggleSection("brands")}
        >
          <h3 className="font-semibold mb-2">Marques</h3>
          {expandedSection === "brands" ? <FaChevronUp /> : <FaChevronDown />}
        </div>
        {expandedSection === "brands" && (
          <div>
            {brands.map((brand) => (
              <div key={brand} className="flex items-center mb-2">
                <input
                  type="checkbox"
                  name={brand}
                  id={brand}
                  checked={selectedBrands.includes(brand)}
                  onChange={() => handleFilterChange(setSelectedBrands, brand)}
                  className="form-checkbox h-4 w-4 text-blue-600"
                />
                <label htmlFor={brand} className="ml-2 text-gray-700">
                  {brand}
                </label>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="mb-4">
        <div
          className="flex justify-between items-center cursor-pointer"
          onClick={() => toggleSection("colors")}
        >
          <h3 className="font-semibold mb-2">Couleurs</h3>
          {expandedSection === "colors" ? <FaChevronUp /> : <FaChevronDown />}
        </div>
        {expandedSection === "colors" && (
          <div>
            {colors.map((color) => (
              <div key={color} className="flex items-center mb-2">
                <input
                  type="checkbox"
                  name={color}
                  id={color}
                  checked={selectedColors.includes(color)}
                  onChange={() => handleFilterChange(setSelectedColors, color)}
                  className="form-checkbox h-4 w-4 text-blue-600"
                />
                <label
                  htmlFor={color}
                  className="ml-2 text-gray-700 capitalize"
                >
                  {color}
                </label>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="mb-4">
        <div
          className="flex justify-between items-center cursor-pointer"
          onClick={() => toggleSection("categories")}
        >
          <h3 className="font-semibold mb-2">Catégories</h3>
          {expandedSection === "categories" ? (
            <FaChevronUp />
          ) : (
            <FaChevronDown />
          )}
        </div>
        {expandedSection === "categories" && (
          <div>
            {categories.map((category) => (
              <div key={category} className="flex items-center mb-2">
                <input
                  type="checkbox"
                  name={category}
                  id={category}
                  checked={selectedCategories.includes(category)}
                  onChange={() =>
                    handleFilterChange(setSelectedCategories, category)
                  }
                  className="form-checkbox h-4 w-4 text-blue-600"
                />
                <label
                  htmlFor={category}
                  className="ml-2 text-gray-700 capitalize"
                >
                  {category}
                </label>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="mb-4">
        <div
          className="flex justify-between items-center cursor-pointer"
          onClick={() => toggleSection("states")}
        >
          <h3 className="font-semibold mb-2">Etats</h3>
          {expandedSection === "states" ? <FaChevronUp /> : <FaChevronDown />}
        </div>
        {expandedSection === "states" && (
          <div>
            {states.map((state) => (
              <div key={state} className="flex items-center mb-2">
                <input
                  type="checkbox"
                  name={state}
                  id={state}
                  checked={selectedStates.includes(state)}
                  onChange={() => handleFilterChange(setSelectedStates, state)}
                  className="form-checkbox h-4 w-4 text-blue-600"
                />
                <label
                  htmlFor={state}
                  className="ml-2 text-gray-700 capitalize"
                >
                  {state}
                </label>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default FilterMenu;
