
import React from 'react';
import { useStore } from '@/context/StoreContext';
import ProductCard from './ProductCard';

const ProductGrid = () => {
  const { filteredProducts, searchQuery, selectedCategory } = useStore();

  if (filteredProducts.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-8">
        <img src="/placeholder.svg" alt="No results" className="w-32 h-32 opacity-30 mb-4" />
        <h3 className="text-xl font-medium">No products found</h3>
        <p className="text-muted-foreground">
          {searchQuery 
            ? `No results for "${searchQuery}" in ${selectedCategory === "All" ? "all categories" : selectedCategory}`
            : `No products in ${selectedCategory}`}
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6 p-4">
      {filteredProducts.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};

export default ProductGrid;
