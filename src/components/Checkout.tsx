
import React, { useState } from 'react';
import { useStore } from '@/context/StoreContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';

interface CheckoutProps {
  onClose: () => void;
  onSuccess: () => void;
}

const Checkout = ({ onClose, onSuccess }: CheckoutProps) => {
  const { cartItems, cartTotal, clearCart } = useStore();
  const { toast } = useToast();
  const [isProcessing, setIsProcessing] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    address: '',
    cardNumber: '',
    expiryDate: '',
    cvv: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simple validation
    if (Object.values(formData).some(value => !value)) {
      toast({
        title: "Form incomplete",
        description: "Please fill in all the fields",
        variant: "destructive",
      });
      return;
    }
    
    // Simulate payment processing
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      clearCart();
      onSuccess();
      
      toast({
        title: "Payment successful!",
        description: "Your order has been placed.",
      });
    }, 2000);
  };

  return (
    <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-xl font-bold">Checkout</CardTitle>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input 
                id="name" 
                name="name" 
                placeholder="John Doe" 
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input 
                id="email" 
                name="email" 
                type="email"
                placeholder="john.doe@example.com" 
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="address">Delivery Address</Label>
              <Input 
                id="address" 
                name="address" 
                placeholder="123 Main St, City" 
                value={formData.address}
                onChange={handleChange}
                required
              />
            </div>
            
            <div className="pt-2">
              <h3 className="font-semibold mb-3">Payment Details</h3>
              <div className="space-y-2">
                <Label htmlFor="cardNumber">Card Number</Label>
                <Input 
                  id="cardNumber" 
                  name="cardNumber" 
                  placeholder="1234 5678 9012 3456" 
                  value={formData.cardNumber}
                  onChange={handleChange}
                  required
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4 mt-4">
                <div className="space-y-2">
                  <Label htmlFor="expiryDate">Expiry Date</Label>
                  <Input 
                    id="expiryDate" 
                    name="expiryDate" 
                    placeholder="MM/YY" 
                    value={formData.expiryDate}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="cvv">CVV</Label>
                  <Input 
                    id="cvv" 
                    name="cvv" 
                    placeholder="123" 
                    value={formData.cvv}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
            </div>
            
            <div className="border-t pt-4 mt-4">
              <div className="flex justify-between mb-1">
                <span>Subtotal</span>
                <span>${cartTotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between mb-1">
                <span>Shipping</span>
                <span>FREE</span>
              </div>
              <div className="flex justify-between font-semibold">
                <span>Total</span>
                <span>${cartTotal.toFixed(2)}</span>
              </div>
            </div>
          </CardContent>
          
          <CardFooter className="flex gap-2">
            <Button
              type="button"
              variant="outline"
              className="flex-1"
              onClick={onClose}
              disabled={isProcessing}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="flex-1 bg-grocery-green hover:bg-grocery-darkGreen"
              disabled={isProcessing}
            >
              {isProcessing ? "Processing..." : `Pay $${cartTotal.toFixed(2)}`}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
};

export default Checkout;
