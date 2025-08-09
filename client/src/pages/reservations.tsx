import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { MobileHeader } from "@/components/layout/mobile-header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Calendar, Clock, Users, Phone, MessageSquare } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const reservationSchema = z.object({
  date: z.string().min(1, "Date is required"),
  time: z.string().min(1, "Time is required"),
  partySize: z.number().min(1, "Party size must be at least 1").max(12, "Maximum party size is 12"),
  contactPhone: z.string().min(10, "Valid phone number is required"),
  specialRequests: z.string().optional(),
});

type ReservationForm = z.infer<typeof reservationSchema>;

export default function Reservations() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const form = useForm<ReservationForm>({
    resolver: zodResolver(reservationSchema),
    defaultValues: {
      date: "",
      time: "",
      partySize: 2,
      contactPhone: "",
      specialRequests: "",
    },
  });

  const onSubmit = async (data: ReservationForm) => {
    setIsSubmitting(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast({
        title: "Reservation Confirmed!",
        description: `Table for ${data.partySize} reserved for ${data.date} at ${data.time}`,
      });
      
      form.reset();
    } catch (error) {
      toast({
        title: "Booking Failed",
        description: "Unable to process your reservation. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const timeSlots = [
    "8:00 AM", "8:30 AM", "9:00 AM", "9:30 AM", "10:00 AM",
    "11:00 AM", "11:30 AM", "12:00 PM", "12:30 PM", "1:00 PM",
    "1:30 PM", "2:00 PM", "2:30 PM", "3:00 PM", "3:30 PM",
    "4:00 PM", "4:30 PM", "5:00 PM", "5:30 PM", "6:00 PM",
    "6:30 PM", "7:00 PM", "7:30 PM", "8:00 PM"
  ];

  const partySizes = Array.from({ length: 12 }, (_, i) => i + 1);

  return (
    <div>
      <MobileHeader title="Reservations" showMenu showNotifications />
      
      <div className="px-4 pb-6">
        {/* Header Info */}
        <div className="glass-morphism-dark p-6 rounded-2xl mb-6">
          <h2 className="text-2xl font-bold text-white mb-2">Book Your Table</h2>
          <p className="text-gray-300 text-sm leading-relaxed">
            Reserve a table at Lion's Café & Bakery for an unforgettable dining experience. 
            We'll confirm your reservation within 15 minutes.
          </p>
        </div>

        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          {/* Date Selection */}
          <div className="glass-morphism-dark p-4 rounded-2xl">
            <div className="flex items-center mb-3">
              <Calendar className="w-5 h-5 text-brand-orange mr-2" />
              <label className="text-white font-medium">Select Date</label>
            </div>
            <input
              type="date"
              {...form.register("date")}
              min={new Date().toISOString().split('T')[0]}
              className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white focus:border-brand-orange focus:outline-none"
            />
            {form.formState.errors.date && (
              <p className="text-red-400 text-sm mt-2">{form.formState.errors.date.message}</p>
            )}
          </div>

          {/* Time Selection */}
          <div className="glass-morphism-dark p-4 rounded-2xl">
            <div className="flex items-center mb-3">
              <Clock className="w-5 h-5 text-brand-orange mr-2" />
              <label className="text-white font-medium">Select Time</label>
            </div>
            <div className="grid grid-cols-3 gap-2 max-h-40 overflow-y-auto">
              {timeSlots.map((time) => (
                <button
                  key={time}
                  type="button"
                  onClick={() => form.setValue("time", time)}
                  className={`p-2 text-sm rounded-lg transition-all touch-feedback ${
                    form.watch("time") === time
                      ? "bg-brand-orange text-white"
                      : "bg-gray-800 text-gray-300 hover:bg-gray-700"
                  }`}
                >
                  {time}
                </button>
              ))}
            </div>
            {form.formState.errors.time && (
              <p className="text-red-400 text-sm mt-2">{form.formState.errors.time.message}</p>
            )}
          </div>

          {/* Party Size */}
          <div className="glass-morphism-dark p-4 rounded-2xl">
            <div className="flex items-center mb-3">
              <Users className="w-5 h-5 text-brand-orange mr-2" />
              <label className="text-white font-medium">Party Size</label>
            </div>
            <div className="grid grid-cols-6 gap-2">
              {partySizes.map((size) => (
                <button
                  key={size}
                  type="button"
                  onClick={() => form.setValue("partySize", size)}
                  className={`aspect-square rounded-lg flex items-center justify-center font-semibold transition-all touch-feedback ${
                    form.watch("partySize") === size
                      ? "bg-brand-orange text-white"
                      : "bg-gray-800 text-gray-300 hover:bg-gray-700"
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
            {form.formState.errors.partySize && (
              <p className="text-red-400 text-sm mt-2">{form.formState.errors.partySize.message}</p>
            )}
          </div>

          {/* Contact Phone */}
          <div className="glass-morphism-dark p-4 rounded-2xl">
            <div className="flex items-center mb-3">
              <Phone className="w-5 h-5 text-brand-orange mr-2" />
              <label className="text-white font-medium">Contact Phone</label>
            </div>
            <input
              type="tel"
              placeholder="(555) 123-4567"
              {...form.register("contactPhone")}
              className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:border-brand-orange focus:outline-none"
            />
            {form.formState.errors.contactPhone && (
              <p className="text-red-400 text-sm mt-2">{form.formState.errors.contactPhone.message}</p>
            )}
          </div>

          {/* Special Requests */}
          <div className="glass-morphism-dark p-4 rounded-2xl">
            <div className="flex items-center mb-3">
              <MessageSquare className="w-5 h-5 text-brand-orange mr-2" />
              <label className="text-white font-medium">Special Requests (Optional)</label>
            </div>
            <textarea
              placeholder="Dietary restrictions, special occasion, accessibility needs..."
              rows={3}
              {...form.register("specialRequests")}
              className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:border-brand-orange focus:outline-none resize-none"
            />
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-brand-orange hover:bg-orange-600 text-white py-4 text-lg font-semibold rounded-xl"
          >
            {isSubmitting ? (
              <>
                <div className="animate-spin w-5 h-5 border-2 border-white border-t-transparent rounded-full mr-2" />
                Booking...
              </>
            ) : (
              "Confirm Reservation"
            )}
          </Button>
        </form>

        {/* Additional Info */}
        <div className="mt-8 glass-morphism-dark p-4 rounded-2xl">
          <h3 className="text-white font-semibold mb-2">Reservation Policy</h3>
          <ul className="text-gray-300 text-sm space-y-1">
            <li>• Reservations held for 15 minutes past scheduled time</li>
            <li>• Parties larger than 8 may require advance notice</li>
            <li>• Cancellations accepted up to 2 hours before reservation</li>
            <li>• Special dietary needs can be accommodated with notice</li>
          </ul>
        </div>
      </div>
    </div>
  );
}