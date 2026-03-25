"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Palette, 
  Code2, 
  Sparkles, 
  Check, 
  CreditCard, 
  LayoutDashboard, 
  Plug, 
  MessageSquare, 
  Smartphone,
  ArrowRight
} from "lucide-react";

interface ServicePackage {
  name: string;
  price: string;
  description: string;
  features: string[];
  popular?: boolean;
}

interface CustomFeature {
  name: string;
  price: string;
  description: string;
  icon: React.ElementType;
}

const designPackages: ServicePackage[] = [
  {
    name: "Identity Starter",
    price: "₹15,000 – ₹25,000",
    description: "Perfect for startups and small businesses looking to establish their brand identity.",
    features: [
      "Logo design (3 concepts)",
      "Basic Brand Guide",
      "Business Card design",
      "2 revision rounds",
      "Source files included",
    ],
  },
  {
    name: "Brand Pro",
    price: "₹40,000 – ₹65,000",
    description: "Comprehensive branding solution for growing businesses.",
    features: [
      "Full Stationery Kit",
      "Social Media Templates (10)",
      "Complete Brand Book",
      "Unlimited revisions",
      "Priority support",
    ],
    popular: true,
  },
  {
    name: "The Creative Suite",
    price: "₹80,000+",
    description: "Complete brand overhaul with marketing assets for established businesses.",
    features: [
      "Complete Brand Overhaul",
      "Marketing Assets (Decks, Flyers)",
      "Custom UI Kit",
      "Dedicated designer",
      "24/7 support",
    ],
  },
];

const devPackages: ServicePackage[] = [
  {
    name: "MVP / Portfolio",
    price: "₹45,000 – ₹75,000",
    description: "Get online quickly with a stunning, responsive website.",
    features: [
      "Single-page App (React/Next.js)",
      "Fully Responsive design",
      "Contact Form integration",
      "Basic SEO setup",
      "2 weeks delivery",
    ],
  },
  {
    name: "Business Hub",
    price: "₹1,20,000 – ₹2,50,000",
    description: "Full-featured business website with content management.",
    features: [
      "Multi-page Dynamic Site",
      "CMS (Sanity/Payload/Local)",
      "Blog functionality",
      "Advanced SEO setup",
      "Analytics integration",
    ],
    popular: true,
  },
  {
    name: "SaaS / E-commerce",
    price: "₹4,00,000+",
    description: "Enterprise-grade platform with full functionality.",
    features: [
      "Full-scale Platform",
      "User Authentication",
      "Inventory Management",
      "Database & Dashboards",
      "API integrations",
    ],
  },
];

const customFeatures: CustomFeature[] = [
  {
    name: "Payment Gateway Integration",
    price: "₹15,000+",
    description: "Stripe, Razorpay, Subscriptions",
    icon: CreditCard,
  },
  {
    name: "Custom User Dashboard",
    price: "₹45,000+",
    description: "Personalized data visualization",
    icon: LayoutDashboard,
  },
  {
    name: "Third-Party API Integration",
    price: "₹12,000 - ₹30,000",
    description: "CRM, Maps, WhatsApp API",
    icon: Plug,
  },
  {
    name: "Real-time Capabilities",
    price: "₹35,000+",
    description: "Chatbots, Live Notifications via WebSockets",
    icon: MessageSquare,
  },
  {
    name: "Advanced PWA Setup",
    price: "₹20,000+",
    description: "Offline access and mobile-installable",
    icon: Smartphone,
  },
];

export function ServicesSection() {
  const [activeTab, setActiveTab] = useState("design");

  const scrollToContact = () => {
    const element = document.getElementById("contact");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <section id="services" className="py-24 px-4 relative">
      {/* Background decoration */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-1/2 left-0 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl -translate-y-1/2" />
        <div className="absolute top-1/2 right-0 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl -translate-y-1/2" />
      </div>

      <div className="container mx-auto max-w-6xl">
        {/* Section Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
            Services & <span className="gradient-text">Pricing</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Transparent pricing for quality work. Choose a package that fits your needs
            or let's discuss a custom solution.
          </p>
        </motion.div>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <TabsList className="w-full max-w-md mx-auto mb-12 grid grid-cols-3 glass p-1 rounded-full">
              <TabsTrigger value="design" className="rounded-full data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                <Palette className="w-4 h-4 mr-2 hidden sm:inline" />
                Design
              </TabsTrigger>
              <TabsTrigger value="development" className="rounded-full data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                <Code2 className="w-4 h-4 mr-2 hidden sm:inline" />
                Dev
              </TabsTrigger>
              <TabsTrigger value="custom" className="rounded-full data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                <Sparkles className="w-4 h-4 mr-2 hidden sm:inline" />
                Custom
              </TabsTrigger>
            </TabsList>
          </motion.div>

          {/* Design Packages */}
          <TabsContent value="design">
            <AnimatePresence mode="wait">
              <motion.div
                key="design"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                exit={{ opacity: 0 }}
                className="grid md:grid-cols-3 gap-6"
              >
                {designPackages.map((pkg, index) => (
                  <motion.div key={pkg.name} variants={itemVariants}>
                    <Card className={`h-full glass-card relative overflow-hidden ${pkg.popular ? 'border-primary/50' : ''}`}>
                      {pkg.popular && (
                        <div className="absolute top-0 right-0">
                          <Badge className="rounded-tl-none rounded-br-none rounded-tr-lg rounded-bl-lg bg-primary text-primary-foreground">
                            Most Popular
                          </Badge>
                        </div>
                      )}
                      <CardHeader>
                        <CardTitle className="text-xl">{pkg.name}</CardTitle>
                        <CardDescription className="text-2xl font-bold text-primary mt-2">
                          {pkg.price}
                        </CardDescription>
                        <p className="text-sm text-muted-foreground mt-2">
                          {pkg.description}
                        </p>
                      </CardHeader>
                      <CardContent>
                        <ul className="space-y-3">
                          {pkg.features.map((feature) => (
                            <li key={feature} className="flex items-start gap-2">
                              <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                              <span className="text-sm">{feature}</span>
                            </li>
                          ))}
                        </ul>
                        <Button 
                          className="w-full mt-6" 
                          variant={pkg.popular ? "default" : "outline"}
                          onClick={scrollToContact}
                        >
                          Get Started
                          <ArrowRight className="w-4 h-4 ml-2" />
                        </Button>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </motion.div>
            </AnimatePresence>
          </TabsContent>

          {/* Development Packages */}
          <TabsContent value="development">
            <AnimatePresence mode="wait">
              <motion.div
                key="development"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                exit={{ opacity: 0 }}
                className="grid md:grid-cols-3 gap-6"
              >
                {devPackages.map((pkg, index) => (
                  <motion.div key={pkg.name} variants={itemVariants}>
                    <Card className={`h-full glass-card relative overflow-hidden ${pkg.popular ? 'border-primary/50' : ''}`}>
                      {pkg.popular && (
                        <div className="absolute top-0 right-0">
                          <Badge className="rounded-tl-none rounded-br-none rounded-tr-lg rounded-bl-lg bg-primary text-primary-foreground">
                            Most Popular
                          </Badge>
                        </div>
                      )}
                      <CardHeader>
                        <CardTitle className="text-xl">{pkg.name}</CardTitle>
                        <CardDescription className="text-2xl font-bold text-primary mt-2">
                          {pkg.price}
                        </CardDescription>
                        <p className="text-sm text-muted-foreground mt-2">
                          {pkg.description}
                        </p>
                      </CardHeader>
                      <CardContent>
                        <ul className="space-y-3">
                          {pkg.features.map((feature) => (
                            <li key={feature} className="flex items-start gap-2">
                              <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                              <span className="text-sm">{feature}</span>
                            </li>
                          ))}
                        </ul>
                        <Button 
                          className="w-full mt-6" 
                          variant={pkg.popular ? "default" : "outline"}
                          onClick={scrollToContact}
                        >
                          Get Started
                          <ArrowRight className="w-4 h-4 ml-2" />
                        </Button>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </motion.div>
            </AnimatePresence>
          </TabsContent>

          {/* Custom Features */}
          <TabsContent value="custom">
            <AnimatePresence mode="wait">
              <motion.div
                key="custom"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                exit={{ opacity: 0 }}
                className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
              >
                {customFeatures.map((feature, index) => (
                  <motion.div key={feature.name} variants={itemVariants}>
                    <Card className="h-full glass-card hover:border-primary/50 transition-colors">
                      <CardHeader>
                        <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                          <feature.icon className="w-6 h-6 text-primary" />
                        </div>
                        <CardTitle className="text-lg">{feature.name}</CardTitle>
                        <CardDescription className="text-xl font-bold text-primary mt-2">
                          {feature.price}
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-muted-foreground">
                          {feature.description}
                        </p>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </motion.div>
            </AnimatePresence>
          </TabsContent>
        </Tabs>

        {/* CTA */}
        <motion.div
          className="text-center mt-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <p className="text-muted-foreground mb-4">
            Not sure which package is right for you?
          </p>
          <Button variant="outline" size="lg" className="rounded-full glass" onClick={scrollToContact}>
            Let&apos;s Discuss Your Project
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
