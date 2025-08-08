import { MapPin, Award, Users, Star } from "lucide-react";
import { GlassCard } from "@/components/ui/glass-card";
import { Button } from "@/components/ui/button";

export default function Story() {
  const stats = [
    { icon: Award, label: "Years of Excellence", value: "13+" },
    { icon: Users, label: "Daily Fresh Items", value: "50+" },
    { icon: Users, label: "Happy Customers", value: "1000+" },
    { icon: Star, label: "Customer Rating", value: "4.9★" },
  ];

  return (
    <div className="pt-20 pb-16 px-4 min-h-screen">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-white">Our Story</h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            A journey of passion, craftsmanship, and community that began with a simple dream to bring authentic artisan baking to our neighborhood.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
          {/* Story Content */}
          <div className="space-y-6">
            <GlassCard className="p-8">
              <h2 className="text-3xl font-bold mb-6 text-white">From Dream to Reality</h2>
              <div className="space-y-4 text-gray-300 leading-relaxed">
                <p>
                  Founded in 2010, Lion's Café & Bakery began as a passion project to bring authentic artisan baking to our community. Our master bakers combine traditional European techniques with locally sourced ingredients to create exceptional baked goods and coffee experiences.
                </p>
                <p>
                  Every morning, we start before dawn to ensure our breads, pastries, and coffee are prepared with the care and attention they deserve. Our commitment to quality and community has made us a beloved gathering place for food lovers and coffee enthusiasts.
                </p>
                <p>
                  What started as a small neighborhood bakery has grown into a destination for those who appreciate the finer things in life - from our signature sourdough to our carefully curated coffee selection.
                </p>
              </div>
            </GlassCard>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 gap-4">
              {stats.map((stat, index) => (
                <GlassCard key={index} className="p-6 text-center">
                  <stat.icon className="w-8 h-8 text-brand-orange mx-auto mb-3" />
                  <div className="text-2xl font-bold text-brand-orange mb-2">
                    {stat.value}
                  </div>
                  <div className="text-gray-300 text-sm">{stat.label}</div>
                </GlassCard>
              ))}
            </div>

            <Button className="bg-brand-orange hover:bg-orange-600 text-white px-8 py-3 transform hover:scale-105 transition-all">
              <MapPin className="w-5 h-5 mr-2" />
              Visit Our Location
            </Button>
          </div>

          {/* Images */}
          <div className="space-y-4">
            <GlassCard className="overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400"
                alt="Master baker kneading fresh dough in traditional bakery"
                className="w-full h-80 object-cover"
              />
            </GlassCard>
            <div className="grid grid-cols-2 gap-4">
              <GlassCard className="overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1517433670267-08bbd4be890f?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=200"
                  alt="Display case filled with fresh pastries and baked goods"
                  className="w-full h-32 object-cover"
                />
              </GlassCard>
              <GlassCard className="overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=200"
                  alt="Barista preparing premium coffee with precision"
                  className="w-full h-32 object-cover"
                />
              </GlassCard>
            </div>
          </div>
        </div>

        {/* Values Section */}
        <div className="grid md:grid-cols-3 gap-8">
          <GlassCard className="p-8 text-center">
            <div className="w-16 h-16 bg-brand-orange rounded-full flex items-center justify-center mx-auto mb-4">
              <Award className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl font-semibold mb-4 text-white">Quality First</h3>
            <p className="text-gray-300">
              We use only the finest ingredients and traditional techniques to create exceptional baked goods that exceed expectations.
            </p>
          </GlassCard>

          <GlassCard className="p-8 text-center">
            <div className="w-16 h-16 bg-brand-orange rounded-full flex items-center justify-center mx-auto mb-4">
              <Users className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl font-semibold mb-4 text-white">Community Focus</h3>
            <p className="text-gray-300">
              We're more than a bakery - we're a gathering place where neighbors become friends over great food and coffee.
            </p>
          </GlassCard>

          <GlassCard className="p-8 text-center">
            <div className="w-16 h-16 bg-brand-orange rounded-full flex items-center justify-center mx-auto mb-4">
              <Star className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl font-semibold mb-4 text-white">Artisan Craft</h3>
            <p className="text-gray-300">
              Every item is handcrafted with passion and precision, honoring time-tested methods while embracing innovation.
            </p>
          </GlassCard>
        </div>
      </div>
    </div>
  );
}
