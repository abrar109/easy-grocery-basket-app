
import React from 'react';
import Header from '@/components/Header';
import EditModeToggle from '@/components/EditModeToggle';
import { useStore } from '@/context/StoreContext';

interface HeaderWrapperProps {
  toggleCart: () => void;
}

const HeaderWrapper = ({ toggleCart }: HeaderWrapperProps) => {
  const { isEditMode } = useStore();
  
  return (
    <div className="relative">
      <Header toggleCart={toggleCart} />
      <div className="absolute top-4 right-20 sm:right-24">
        <EditModeToggle />
      </div>
    </div>
  );
};

export default HeaderWrapper;
