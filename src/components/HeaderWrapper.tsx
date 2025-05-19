
import React, { useState } from 'react';
import Header from '@/components/Header';
import EditModeToggle from '@/components/EditModeToggle';
import Login from '@/components/Login';
import { useStore } from '@/context/StoreContext';
import { Button } from '@/components/ui/button';
import { LogIn } from 'lucide-react';

interface HeaderWrapperProps {
  toggleCart: () => void;
}

const HeaderWrapper = ({ toggleCart }: HeaderWrapperProps) => {
  const { isEditMode } = useStore();
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  
  return (
    <div className="relative">
      <Header toggleCart={toggleCart} />
      <div className="absolute top-4 right-20 sm:right-24 flex items-center gap-2">
        <Button
          variant="outline"
          size="sm"
          className="flex items-center gap-1"
          onClick={() => setIsLoginOpen(true)}
        >
          <LogIn className="h-4 w-4" />
          <span className="hidden sm:inline">Login</span>
        </Button>
        <EditModeToggle />
      </div>
      
      <Login 
        open={isLoginOpen} 
        onClose={() => setIsLoginOpen(false)} 
      />
    </div>
  );
};

export default HeaderWrapper;
