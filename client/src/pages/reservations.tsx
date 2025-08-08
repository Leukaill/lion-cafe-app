import { useState } from "react";
import { Calendar, Clock, Users, MessageSquare, CheckCircle } from "lucide-react";
import { GlassCard } from "@/components/ui/glass-card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useAuth } from "@/lib/auth";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export default function Reservations() {
  const [formData, setFormData] = useState({
    date: "",
    time: "",
    partySize: "",
    specialRequests: "",
    contactPhone: "",
  });

  const { user } = useAuth();
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const createReservationMutation = useMutation({
    mutationFn: async (data: any) => {
      const response = await apiRequest("POST", "/api/reservations", data);
      return response.json();
    },
    onSuccess: () => {
      toast({
        title: "Reservation Confirmed",
        description: "We've reserved your table and will send a confirmation email shortly.",
      });
      // Reset form
      setFormData({
        date: "",
        time: "",
        partySize: "",
        specialRequests: "",
        contactPhone: "",
      });
      // Invalidate user's reservations
      if (user) {
        queryClient.invalidateQueries({ queryKey: ['/api/reservations/user', user.id] });
      }
    },
    onError: (error: any) => {
      toast({
        title: "Reservation Failed",
        description: error.message || "Unable to create reservation. Please try again.",
        variant: "destructive",
      });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user) {
      toast({
        title: "Sign in required",
        description: "Please sign in to make a reservation.",
        variant: "destructive",
      });
      return;
    }

    if (!formData.date || !formData.time || !formData.partySize) {
      toast({
        title: "Missing information",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    // Combine date and time
    const dateTime = new Date(`${formData.date}T${formData.time}`);
    
    const reservationData = {
      userId: user.id,
      date: dateTime.toISOString(),
      partySize: parseInt(formData.partySize),
      specialRequests: formData.specialRequests || null,
      contactPhone: formData.contactPhone || null,
    };

    createReservationMutation.mutate(reservationData);
  };

  const timeSlots = [
    "08:00", "08:30", "09:00", "09:30", "10:00", "10:30", "11:00", "11:30",
    "12:00", "12:30", "13:00", "13:30", "14:00", "14:30", "15:00", "15:30",
    "16:00", "16:30", "17:00", "17:30", "18:00", "18:30", "19:00", "19:30",
  ];

  // Get minimum date (today)
  const today = new Date().toISOString().split('T')[0];

  return (
    <div className="pt-20 pb-16 px-4 min-h-screen">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-white">Reserve Your Table</h1>
          <p className="text-xl text-gray-300">Experience our warm hospitality in person</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Dining Experience */}
          <div>
            <GlassCard className="p-6 mb-6">
              <img
                src="https://images.unsplash.com/photo-1554118811-1e0d58224f24?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400"
                alt="Warm and inviting cafe interior with comfortable seating"
                className="w-full h-64 object-cover rounded-xl mb-6"
              />
              <h3 className="text-2xl font-semibold mb-4 text-white">Dining Experience</h3>
              <ul className="space-y-3 text-gray-300">
                <li className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-brand-orange mr-3 flex-shrink-0" />
                  Cozy indoor seating
                </li>
                <li className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-brand-orange mr-3 flex-shrink-0" />
                  Outdoor patio available
                </li>
                <li className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-brand-orange mr-3 flex-shrink-0" />
                  Free WiFi & charging stations
                </li>
                <li className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-brand-orange mr-3 flex-shrink-0" />
                  Family-friendly environment
                </li>
              </ul>
            </GlassCard>
          </div>

          {/* Reservation Form */}
          <div>
            <GlassCard variant="dark" className="p-8">
              <form onSubmit={handleSubmit} className="space-y-6">
                {!user && (
                  <div className="bg-yellow-900/20 border border-yellow-500/30 rounded-lg p-4 mb-6">
                    <p className="text-yellow-300 text-sm">
                      Please sign in to make a reservation. You'll be able to manage your bookings and receive updates.
                    </p>
                  </div>
                )}

                <div>
                  <Label htmlFor="partySize" className="text-white flex items-center mb-2">
                    <Users className="w-4 h-4 mr-2" />
                    Party Size *
                  </Label>
                  <Select 
                    value={formData.partySize} 
                    onValueChange={(value) => setFormData(prev => ({ ...prev, partySize: value }))}
                  >
                    <SelectTrigger className="glass-morphism border-white/20 text-white bg-transparent">
                      <SelectValue placeholder="Select party size" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">1 person</SelectItem>
                      <SelectItem value="2">2 people</SelectItem>
                      <SelectItem value="3">3 people</SelectItem>
                      <SelectItem value="4">4 people</SelectItem>
                      <SelectItem value="5">5 people</SelectItem>
                      <SelectItem value="6">6 people</SelectItem>
                      <SelectItem value="7">7 people</SelectItem>
                      <SelectItem value="8">8+ people</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="date" className="text-white flex items-center mb-2">
                      <Calendar className="w-4 h-4 mr-2" />
                      Date *
                    </Label>
                    <Input
                      id="date"
                      type="date"
                      min={today}
                      value={formData.date}
                      onChange={(e) => setFormData(prev => ({ ...prev, date: e.target.value }))}
                      className="glass-morphism border-white/20 text-white bg-transparent"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="time" className="text-white flex items-center mb-2">
                      <Clock className="w-4 h-4 mr-2" />
                      Time *
                    </Label>
                    <Select 
                      value={formData.time}
                      onValueChange={(value) => setFormData(prev => ({ ...prev, time: value }))}
                    >
                      <SelectTrigger className="glass-morphism border-white/20 text-white bg-transparent">
                        <SelectValue placeholder="Select time" />
                      </SelectTrigger>
                      <SelectContent>
                        {timeSlots.map((time) => (
                          <SelectItem key={time} value={time}>
                            {time}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div>
                  <Label htmlFor="phone" className="text-white mb-2 block">
                    Contact Phone
                  </Label>
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="(555) 123-4567"
                    value={formData.contactPhone}
                    onChange={(e) => setFormData(prev => ({ ...prev, contactPhone: e.target.value }))}
                    className="glass-morphism border-white/20 text-white bg-transparent placeholder-gray-400"
                  />
                </div>

                <div>
                  <Label htmlFor="requests" className="text-white flex items-center mb-2">
                    <MessageSquare className="w-4 h-4 mr-2" />
                    Special Requests
                  </Label>
                  <Textarea
                    id="requests"
                    placeholder="Birthday celebration, dietary restrictions, etc."
                    value={formData.specialRequests}
                    onChange={(e) => setFormData(prev => ({ ...prev, specialRequests: e.target.value }))}
                    className="glass-morphism border-white/20 text-white bg-transparent placeholder-gray-400 resize-none"
                    rows={3}
                  />
                </div>

                <Button
                  type="submit"
                  disabled={!user || createReservationMutation.isPending}
                  className="w-full bg-brand-orange hover:bg-orange-600 text-white py-4 transform hover:scale-105 transition-all"
                >
                  {createReservationMutation.isPending ? (
                    "Creating Reservation..."
                  ) : (
                    <>
                      <Calendar className="w-5 h-5 mr-2" />
                      Reserve Table
                    </>
                  )}
                </Button>
              </form>
            </GlassCard>
          </div>
        </div>
      </div>
    </div>
  );
}
