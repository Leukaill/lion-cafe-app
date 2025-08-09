import { MobileHeader } from "@/components/layout/mobile-header";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { 
  Phone, 
  Mail, 
  MessageSquare, 
  MapPin, 
  Clock, 
  Facebook, 
  Instagram, 
  Twitter
} from "lucide-react";

export default function Contact() {
  const { toast } = useToast();

  const handleCall = () => {
    window.open('tel:+1234567890', '_self');
  };

  const handleEmail = () => {
    window.open('mailto:hello@lionscafe.com', '_self');
  };

  const handleSMS = () => {
    window.open('sms:+1234567890', '_self');
  };

  const handleMaps = () => {
    window.open('https://maps.google.com/?q=Lion\'s+Café+123+Main+Street', '_blank');
  };

  const contactMethods = [
    {
      icon: Phone,
      title: "Call Us",
      description: "Speak directly with our team",
      value: "(123) 456-7890",
      action: handleCall,
      color: "bg-green-100 text-green-600"
    },
    {
      icon: MessageSquare,
      title: "Text Us",
      description: "Send us a quick message",
      value: "(123) 456-7890",
      action: handleSMS,
      color: "bg-blue-100 text-blue-600"
    },
    {
      icon: Mail,
      title: "Email Us",
      description: "Send us a detailed message",
      value: "hello@lionscafe.com",
      action: handleEmail,
      color: "bg-purple-100 text-purple-600"
    }
  ];

  const locationInfo = {
    address: "123 Main Street",
    city: "Downtown",
    state: "CA 90210",
    hours: [
      { day: "Monday - Friday", time: "7:00 AM - 9:00 PM" },
      { day: "Saturday", time: "8:00 AM - 10:00 PM" },
      { day: "Sunday", time: "8:00 AM - 8:00 PM" }
    ]
  };

  const socialLinks = [
    {
      icon: Facebook,
      name: "Facebook",
      handle: "@lionscafe",
      action: () => toast({ title: "Facebook", description: "Opening Facebook page..." })
    },
    {
      icon: Instagram,
      name: "Instagram",
      handle: "@lionscafe",
      action: () => toast({ title: "Instagram", description: "Opening Instagram page..." })
    },
    {
      icon: Twitter,
      name: "Twitter",
      handle: "@lionscafe",
      action: () => toast({ title: "Twitter", description: "Opening Twitter page..." })
    }
  ];

  return (
    <div className="pb-24">
      <MobileHeader title="Contact" showBack />
      
      <div className="px-4 pb-8">
        {/* Header */}
        <div className="text-center py-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Get in Touch</h1>
          <p className="text-gray-600">We'd love to hear from you</p>
        </div>

        {/* Contact Methods */}
        <div className="space-y-4 mb-8">
          <h2 className="text-lg font-semibold text-gray-900 mb-4 px-2">Contact Methods</h2>
          {contactMethods.map((method, index) => {
            const IconComponent = method.icon;
            return (
              <div
                key={index}
                className="bg-white border border-gray-200 p-4 rounded-2xl shadow-sm touch-feedback hover:shadow-md transition-shadow cursor-pointer"
                onClick={method.action}
              >
                <div className="flex items-center space-x-4">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center ${method.color}`}>
                    <IconComponent className="w-6 h-6" />
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-gray-900 mb-1">{method.title}</h3>
                    <p className="text-sm text-gray-600 mb-1">{method.description}</p>
                    <p className="text-sm font-medium text-brand-orange">{method.value}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Location Info */}
        <div className="mb-8">
          <h2 className="text-lg font-semibold text-gray-900 mb-4 px-2">Visit Us</h2>
          <div className="bg-white border border-gray-200 p-4 rounded-2xl shadow-sm">
            <div className="flex items-start space-x-4 mb-4">
              <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
                <MapPin className="w-6 h-6 text-brand-orange" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-gray-900 mb-2">Location</h3>
                <p className="text-gray-700 mb-1">{locationInfo.address}</p>
                <p className="text-gray-700 mb-3">{locationInfo.city}, {locationInfo.state}</p>
                <Button
                  onClick={handleMaps}
                  className="bg-brand-orange hover:bg-orange-600 text-white px-4 py-2 text-sm"
                >
                  Open in Maps
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Hours */}
        <div className="mb-8">
          <h2 className="text-lg font-semibold text-gray-900 mb-4 px-2">Hours</h2>
          <div className="bg-white border border-gray-200 p-4 rounded-2xl shadow-sm">
            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                <Clock className="w-6 h-6 text-blue-600" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-gray-900 mb-3">Operating Hours</h3>
                <div className="space-y-2">
                  {locationInfo.hours.map((schedule, index) => (
                    <div key={index} className="flex justify-between items-center">
                      <span className="text-gray-700 font-medium">{schedule.day}</span>
                      <span className="text-gray-600">{schedule.time}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Social Media */}
        <div>
          <h2 className="text-lg font-semibold text-gray-900 mb-4 px-2">Follow Us</h2>
          <div className="space-y-3">
            {socialLinks.map((social, index) => {
              const IconComponent = social.icon;
              return (
                <div
                  key={index}
                  className="bg-white border border-gray-200 p-4 rounded-2xl shadow-sm touch-feedback hover:shadow-md transition-shadow cursor-pointer"
                  onClick={social.action}
                >
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center">
                      <IconComponent className="w-6 h-6 text-gray-600" />
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-gray-900 mb-1">{social.name}</h3>
                      <p className="text-sm text-gray-600">{social.handle}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}