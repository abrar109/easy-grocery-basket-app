
import React from 'react';
import { useStore } from '@/context/StoreContext';
import { Edit, Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

const EditModeToggle = () => {
  const { isEditMode, toggleEditMode } = useStore();
  const { toast } = useToast();

  const handleToggle = () => {
    toggleEditMode();
    toast({
      title: isEditMode ? "View Mode Enabled" : "Edit Mode Enabled",
      description: isEditMode 
        ? "Products are now in view-only mode"
        : "You can now edit product details",
    });
  };

  return (
    <Button
      variant={isEditMode ? "default" : "outline"}
      size="sm"
      className={`flex items-center gap-1 ${isEditMode ? "bg-grocery-green hover:bg-grocery-darkGreen" : ""}`}
      onClick={handleToggle}
    >
      {isEditMode ? <Eye className="h-4 w-4" /> : <Edit className="h-4 w-4" />}
      <span className="hidden sm:inline">
        {isEditMode ? "View Mode" : "Edit Mode"}
      </span>
    </Button>
  );
};

export default EditModeToggle;
