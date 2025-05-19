
import React from 'react';
import { useStore } from '@/context/StoreContext';
import { X, Plus, Minus, ShoppingBag, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetClose } from '@/components/ui/sheet';

interface CartProps {
  open: boolean;
  onClose: () => void;
  onCheckout: () => void;
}

const Cart = ({ open, onClose, onCheckout }: CartProps) => {
  const { cartItems, removeFromCart, updateQuantity, cartTotal, clearCart } = useStore();

  return (
    <Sheet open={open} onOpenChange={onClose}>
      <SheetContent className="flex flex-col w-full sm:max-w-md p-0">
        <SheetHeader className="p-6 pb-2">
          <div className="flex justify-between items-center">
            <SheetTitle className="text-xl font-bold">Your Cart</SheetTitle>
            <SheetClose asChild>
              <Button variant="ghost" size="icon" className="rounded-full">
                <X className="h-5 w-5" />
              </Button>
            </SheetClose>
          </div>
        </SheetHeader>

        {cartItems.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center p-6">
            <ShoppingBag className="h-16 w-16 text-muted-foreground mb-4" />
            <h3 className="text-lg font-medium">Your cart is empty</h3>
            <p className="text-muted-foreground text-center mt-2">
              Looks like you haven't added any products to your cart yet.
            </p>
            <SheetClose asChild>
              <Button className="mt-6 bg-grocery-green hover:bg-grocery-darkGreen">
                Start Shopping
              </Button>
            </SheetClose>
          </div>
        ) : (
          <>
            <ScrollArea className="flex-1 p-6 pt-2">
              {cartItems.map((item) => (
                <div key={item.product.id} className="flex py-3">
                  <div className="h-20 w-20 flex-shrink-0 overflow-hidden rounded-md border bg-muted">
                    <img
                      src={item.product.image || "/placeholder.svg"}
                      alt={item.product.name}
                      className="h-full w-full object-cover object-center"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = "/placeholder.svg";
                      }}
                    />
                  </div>
                  <div className="ml-4 flex flex-1 flex-col">
                    <div className="flex justify-between text-base font-medium">
                      <h3 className="line-clamp-2">{item.product.name}</h3>
                      <p className="ml-4">₹{(item.product.price * item.quantity).toFixed(2)}</p>
                    </div>
                    <p className="mt-1 text-sm text-muted-foreground">{item.product.unit}</p>
                    <div className="flex items-center justify-between mt-2">
                      <div className="flex items-center border rounded">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 p-0 rounded-none"
                          onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                        >
                          <Minus className="h-3 w-3" />
                        </Button>
                        <span className="w-8 text-center text-sm">{item.quantity}</span>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 p-0 rounded-none"
                          onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                        >
                          <Plus className="h-3 w-3" />
                        </Button>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 p-0 text-red-500 hover:text-red-600"
                        onClick={() => removeFromCart(item.product.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </ScrollArea>

            <div className="border-t p-6 space-y-4">
              <div className="flex justify-between text-base font-medium">
                <p>Subtotal</p>
                <p>₹{cartTotal.toFixed(2)}</p>
              </div>
              <div className="flex justify-between text-base font-medium">
                <p>Shipping</p>
                <p>FREE</p>
              </div>
              <Separator />
              <div className="flex justify-between text-lg font-semibold">
                <p>Total</p>
                <p>₹{cartTotal.toFixed(2)}</p>
              </div>
              <div className="mt-6 space-y-3">
                <Button 
                  className="w-full bg-grocery-green hover:bg-grocery-darkGreen" 
                  onClick={onCheckout}
                >
                  Checkout
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full border-grocery-green text-grocery-darkGreen hover:bg-grocery-light"
                  onClick={clearCart}
                >
                  Clear cart
                </Button>
              </div>
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
};

export default Cart;
