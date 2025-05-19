
import React, { useState } from 'react';
import { Plus, Edit2, Save, X } from 'lucide-react';
import { useStore } from '@/context/StoreContext';
import { Product } from '@/types/store';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const { addToCart, isEditMode, updateProduct } = useStore();
  const { toast } = useToast();
  const [isEditing, setIsEditing] = useState(false);
  const [editedProduct, setEditedProduct] = useState<Product>({ ...product });

  const handleAddToCart = () => {
    addToCart(product);
    toast({
      title: "Added to cart",
      description: `${product.name} has been added to your cart`,
    });
  };

  const handleEditClick = () => {
    setIsEditing(true);
    setEditedProduct({ ...product });
  };

  const handleSaveClick = () => {
    updateProduct(editedProduct);
    setIsEditing(false);
    toast({
      title: "Product updated",
      description: `${editedProduct.name} has been updated successfully`,
    });
  };

  const handleCancelClick = () => {
    setIsEditing(false);
    setEditedProduct({ ...product });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    
    // Handle price separately to ensure it's a number
    if (name === 'price') {
      const price = parseFloat(value);
      if (!isNaN(price)) {
        setEditedProduct(prev => ({ ...prev, [name]: price }));
      }
      return;
    }
    
    setEditedProduct(prev => ({ ...prev, [name]: value }));
  };

  const defaultImageUrl = "/placeholder.svg";

  if (isEditing) {
    return (
      <Card className="overflow-hidden h-full flex flex-col hover:shadow-lg transition-shadow duration-300">
        <div className="relative pt-[100%] bg-grocery-light">
          <img 
            src={product.image || defaultImageUrl} 
            alt={product.name}
            className="absolute inset-0 w-full h-full object-cover object-center"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.src = defaultImageUrl;
            }}
          />
          <Input
            className="absolute bottom-2 left-2 right-2 bg-white/90 text-xs"
            name="image"
            value={editedProduct.image}
            placeholder="Image URL"
            onChange={handleInputChange}
          />
        </div>
        <CardContent className="flex-grow p-4 space-y-2">
          <Input 
            name="name"
            value={editedProduct.name}
            onChange={handleInputChange}
            placeholder="Product name"
            className="font-medium"
          />
          <Input
            name="category"
            value={editedProduct.category}
            onChange={handleInputChange}
            placeholder="Category"
            className="text-sm"
          />
          <Textarea
            name="description"
            value={editedProduct.description}
            onChange={handleInputChange}
            placeholder="Description"
            className="text-sm resize-none"
            rows={2}
          />
        </CardContent>
        <CardFooter className="p-4 pt-0 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Input 
              name="price" 
              type="number"
              value={editedProduct.price} 
              onChange={handleInputChange}
              className="w-20"
              step="0.01"
            />
            <Input 
              name="unit"
              value={editedProduct.unit}
              onChange={handleInputChange}
              className="w-16 text-xs"
            />
          </div>
          <div className="flex gap-1">
            <Button 
              size="sm"
              onClick={handleSaveClick}
              className="bg-grocery-green hover:bg-grocery-darkGreen rounded-full h-9 w-9 p-0"
            >
              <Save className="h-4 w-4" />
            </Button>
            <Button 
              size="sm" 
              variant="outline"
              onClick={handleCancelClick}
              className="rounded-full h-9 w-9 p-0"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </CardFooter>
      </Card>
    );
  }

  return (
    <Card className="overflow-hidden h-full flex flex-col hover:shadow-lg transition-shadow duration-300">
      <div className="relative pt-[100%] bg-grocery-light">
        <img 
          src={product.image || defaultImageUrl} 
          alt={product.name}
          className="absolute inset-0 w-full h-full object-cover object-center"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.src = defaultImageUrl;
          }}
        />
        <div className="absolute top-2 left-2 bg-white rounded-full px-2 py-1 text-xs font-medium text-grocery-darkGreen">
          {product.category}
        </div>
        {isEditMode && (
          <Button
            size="sm"
            variant="ghost"
            onClick={handleEditClick}
            className="absolute top-2 right-2 bg-white/90 rounded-full h-8 w-8 p-0"
          >
            <Edit2 className="h-4 w-4" />
          </Button>
        )}
      </div>
      <CardContent className="flex-grow p-4">
        <h3 className="font-medium text-base mb-1 line-clamp-2">{product.name}</h3>
        <p className="text-sm text-muted-foreground line-clamp-2">{product.description}</p>
      </CardContent>
      <CardFooter className="p-4 pt-0 flex justify-between items-center">
        <div className="text-lg font-semibold">${product.price.toFixed(2)} <span className="text-xs text-muted-foreground">/{product.unit}</span></div>
        <Button 
          size="sm" 
          onClick={handleAddToCart}
          className="bg-grocery-green hover:bg-grocery-darkGreen rounded-full h-9 w-9 p-0"
        >
          <Plus className="h-4 w-4" />
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ProductCard;
