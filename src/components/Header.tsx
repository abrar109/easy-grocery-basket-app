
import React, { useState } from 'react';
import { ShoppingCart, Search } from 'lucide-react';
import { useStore } from '@/context/StoreContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface HeaderProps {
  toggleCart: () => void;
}

const Header = ({ toggleCart }: HeaderProps) => {
  const { searchQuery, setSearchQuery, cartCount } = useStore();
  const [localSearch, setLocalSearch] = useState(searchQuery);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSearchQuery(localSearch);
  };

  return (
    <header className="sticky top-0 z-30 w-full bg-white border-b shadow-sm">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <h1 className="text-xl md:text-2xl font-bold text-grocery-green">
              <span className="text-grocery-darkGreen">Fresh</span>Mart
            </h1>
          </div>
          
          <form onSubmit={handleSearchSubmit} className="flex-1 max-w-md mx-4">
            <div className="relative flex items-center">
              <Input 
                type="text"
                placeholder="Search for products..."
                className="pl-10"
                value={localSearch}
                onChange={(e) => setLocalSearch(e.target.value)}
              />
              <Search className="absolute left-3 h-4 w-4 text-muted-foreground" />
              <Button 
                type="submit" 
                size="sm" 
                className="absolute right-1 ml-2 bg-grocery-green hover:bg-grocery-darkGreen"
              >
                Search
              </Button>
            </div>
          </form>
          
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={toggleCart} 
            className="relative"
          >
            <ShoppingCart className="h-6 w-6" />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-grocery-accent text-white rounded-full w-5 h-5 flex items-center justify-center text-xs animate-cart-bounce">
                {cartCount}
              </span>
            )}
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
