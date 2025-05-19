
import React from 'react';
import { Plus } from 'lucide-react';
import { useStore } from '@/context/StoreContext';
import { Product } from '@/types/store';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const { addToCart } = useStore();
  const { toast } = useToast();

  const handleAddToCart = () => {
    addToCart(product);
    toast({
      title: "Added to cart",
      description: `${product.name} has been added to your cart`,
    });
  };

  const defaultImageUrl = "/placeholder.svg";

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
