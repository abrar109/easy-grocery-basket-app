
import React from 'react';
import { CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface OrderSuccessProps {
  onClose: () => void;
}

const OrderSuccess = ({ onClose }: OrderSuccessProps) => {
  return (
    <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-lg p-6 max-w-md w-full text-center">
        <CheckCircle className="mx-auto h-16 w-16 text-grocery-green mb-4" />
        <h2 className="text-2xl font-bold mb-2">Order Successful!</h2>
        <p className="text-muted-foreground mb-6">
          Thank you for your purchase. Your order has been placed successfully and will be delivered soon.
        </p>
        <div className="mt-4 bg-muted rounded-md p-4 mb-6">
          <div className="text-sm mb-1">Order Reference</div>
          <div className="font-mono font-medium">{generateOrderNumber()}</div>
        </div>
        <Button 
          onClick={onClose} 
          className="w-full bg-grocery-green hover:bg-grocery-darkGreen"
        >
          Continue Shopping
        </Button>
      </div>
    </div>
  );
};

// Helper function to generate a random order number
function generateOrderNumber() {
  return `ORD-${Math.floor(100000 + Math.random() * 900000)}`;
}

export default OrderSuccess;
