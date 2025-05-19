
import React, { useState } from 'react';
import { StoreProvider } from '@/context/StoreContext';
import Header from '@/components/Header';
import Categories from '@/components/Categories';
import ProductGrid from '@/components/ProductGrid';
import Cart from '@/components/Cart';
import Checkout from '@/components/Checkout';
import OrderSuccess from '@/components/OrderSuccess';

const Index = () => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isOrderSuccessOpen, setIsOrderSuccessOpen] = useState(false);

  const toggleCart = () => setIsCartOpen(!isCartOpen);
  
  const handleCheckout = () => {
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };
  
  const handleCheckoutCancel = () => {
    setIsCheckoutOpen(false);
  };
  
  const handleOrderSuccess = () => {
    setIsCheckoutOpen(false);
    setIsOrderSuccessOpen(true);
  };
  
  const handleContinueShopping = () => {
    setIsOrderSuccessOpen(false);
  };

  return (
    <StoreProvider>
      <div className="min-h-screen flex flex-col bg-background">
        <Header toggleCart={toggleCart} />
        
        <main className="flex-1">
          <Categories />
          <ProductGrid />
        </main>
        
        <Cart 
          open={isCartOpen} 
          onClose={() => setIsCartOpen(false)} 
          onCheckout={handleCheckout}
        />
        
        {isCheckoutOpen && (
          <Checkout 
            onClose={handleCheckoutCancel} 
            onSuccess={handleOrderSuccess}
          />
        )}
        
        {isOrderSuccessOpen && (
          <OrderSuccess onClose={handleContinueShopping} />
        )}
      </div>
    </StoreProvider>
  );
};

export default Index;
