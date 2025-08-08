import { useEffect, useState } from "react";
import { useStripe, Elements, PaymentElement, useElements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { GlassCard } from "@/components/ui/glass-card";
import { Button } from "@/components/ui/button";
import { useCart } from "@/hooks/use-cart";
import { useAuth } from "@/lib/auth";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { Link } from "wouter";
import { ArrowLeft, ShoppingBag, User } from "lucide-react";

const stripePromise = import.meta.env.VITE_STRIPE_PUBLIC_KEY ? 
  loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY) : 
  Promise.resolve(null);

function CheckoutForm() {
  const stripe = useStripe();
  const elements = useElements();
  const { items, total, clearCart } = useCart();
  const { user } = useAuth();
  const { toast } = useToast();
  const [processing, setProcessing] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!stripe || !elements || !user) {
      toast({
        title: "Payment not configured",
        description: "Payment processing is not set up yet. Please contact support.",
        variant: "destructive",
      });
      return;
    }

    setProcessing(true);

    try {
      const { error } = await stripe.confirmPayment({
        elements,
        confirmParams: {
          return_url: `${window.location.origin}/order-success`,
        },
      });

      if (error) {
        toast({
          title: "Payment Failed",
          description: error.message,
          variant: "destructive",
        });
      } else {
        toast({
          title: "Order Placed!",
          description: "Thank you for your order. You'll receive a confirmation email shortly.",
        });
        clearCart();
      }
    } catch (error: any) {
      toast({
        title: "Error",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive",
      });
    } finally {
      setProcessing(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <PaymentElement />
      <Button
        type="submit"
        disabled={!stripe || processing}
        className="w-full bg-brand-orange hover:bg-orange-600 text-white py-4"
      >
        {processing ? "Processing..." : `Pay $${total.toFixed(2)}`}
      </Button>
    </form>
  );
}

export default function Checkout() {
  const [clientSecret, setClientSecret] = useState("");
  const [orderId, setOrderId] = useState("");
  const { items, total } = useCart();
  const { user } = useAuth();
  const { toast } = useToast();

  useEffect(() => {
    if (!user || items.length === 0) {
      return;
    }

    // Create order and payment intent
    const createOrderAndPayment = async () => {
      try {
        // First create the order
        const orderData = {
          userId: user.id,
          items: items.map(item => ({
            itemId: item.id,
            quantity: item.quantity,
            price: item.price.toString(),
          })),
          total: total.toString(),
          orderType: "pickup", // Default to pickup
          status: "pending",
        };

        const orderResponse = await apiRequest("POST", "/api/orders", orderData);
        const order = await orderResponse.json();
        setOrderId(order.id);

        // Then create payment intent
        const paymentResponse = await apiRequest("POST", "/api/create-payment-intent", {
          amount: total,
          orderId: order.id,
        });
        const { clientSecret } = await paymentResponse.json();
        setClientSecret(clientSecret);
      } catch (error: any) {
        toast({
          title: "Error",
          description: "Failed to initialize checkout. Please try again.",
          variant: "destructive",
        });
      }
    };

    createOrderAndPayment();
  }, [user, items, total, toast]);

  if (!user) {
    return (
      <div className="pt-20 pb-16 px-4 min-h-screen">
        <div className="max-w-2xl mx-auto text-center">
          <GlassCard className="p-8">
            <User className="w-16 h-16 text-brand-orange mx-auto mb-4" />
            <h1 className="text-2xl font-bold mb-4 text-white">Sign In Required</h1>
            <p className="text-gray-300 mb-6">
              Please sign in to complete your order.
            </p>
            <Link href="/auth">
              <Button className="bg-brand-orange hover:bg-orange-600 text-white">
                Sign In
              </Button>
            </Link>
          </GlassCard>
        </div>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="pt-20 pb-16 px-4 min-h-screen">
        <div className="max-w-2xl mx-auto text-center">
          <GlassCard className="p-8">
            <ShoppingBag className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h1 className="text-2xl font-bold mb-4 text-white">Your Cart is Empty</h1>
            <p className="text-gray-300 mb-6">
              Add some delicious items to your cart before checking out.
            </p>
            <Link href="/menu">
              <Button className="bg-brand-orange hover:bg-orange-600 text-white">
                Browse Menu
              </Button>
            </Link>
          </GlassCard>
        </div>
      </div>
    );
  }

  if (!clientSecret) {
    return (
      <div className="pt-20 pb-16 px-4 min-h-screen">
        <div className="max-w-2xl mx-auto">
          <GlassCard className="p-8">
            <div className="animate-pulse space-y-4">
              <div className="bg-gray-700 h-8 rounded" />
              <div className="bg-gray-700 h-32 rounded" />
              <div className="bg-gray-700 h-12 rounded" />
            </div>
          </GlassCard>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-20 pb-16 px-4 min-h-screen">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center mb-8">
          <Link href="/menu">
            <Button variant="ghost" className="text-gray-300 hover:text-white mr-4">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Menu
            </Button>
          </Link>
          <h1 className="text-3xl font-bold text-white">Checkout</h1>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Order Summary */}
          <div>
            <GlassCard className="p-6">
              <h2 className="text-xl font-semibold mb-4 text-white">Order Summary</h2>
              <div className="space-y-3">
                {items.map((item) => (
                  <div key={item.id} className="flex justify-between items-center py-2 border-b border-white/10">
                    <div>
                      <h4 className="font-medium text-white">{item.name}</h4>
                      <p className="text-sm text-gray-400">Qty: {item.quantity}</p>
                    </div>
                    <span className="text-white">${(item.price * item.quantity).toFixed(2)}</span>
                  </div>
                ))}
              </div>
              <div className="border-t border-white/10 pt-4 mt-4">
                <div className="flex justify-between items-center text-lg font-semibold">
                  <span className="text-white">Total</span>
                  <span className="text-brand-orange">${total.toFixed(2)}</span>
                </div>
              </div>
            </GlassCard>
          </div>

          {/* Payment Form */}
          <div>
            <GlassCard variant="dark" className="p-6">
              <h2 className="text-xl font-semibold mb-6 text-white">Payment Details</h2>
              {import.meta.env.VITE_STRIPE_PUBLIC_KEY ? (
                <Elements stripe={stripePromise} options={{ clientSecret }}>
                  <CheckoutForm />
                </Elements>
              ) : (
                <div className="text-center py-8">
                  <p className="text-gray-300 mb-4">Payment processing is not configured yet.</p>
                  <p className="text-sm text-gray-400">Please contact us to complete your order.</p>
                </div>
              )}
            </GlassCard>
          </div>
        </div>
      </div>
    </div>
  );
}
