
import React from 'react';
import { useStore } from '@/context/StoreContext';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';

const Categories = () => {
  const { categories, selectedCategory, setSelectedCategory } = useStore();

  return (
    <div className="py-4">
      <h2 className="text-xl font-semibold mb-3 px-4">Categories</h2>
      <ScrollArea className="whitespace-nowrap pb-3">
        <div className="flex gap-2 px-4">
          {categories.map((category) => (
            <Button
              key={category}
              variant={selectedCategory === category ? "default" : "outline"}
              className={`px-4 py-2 rounded-full ${
                selectedCategory === category 
                  ? "bg-grocery-green hover:bg-grocery-darkGreen" 
                  : "border-grocery-green text-grocery-darkGreen hover:bg-grocery-light"
              }`}
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </Button>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
};

export default Categories;
