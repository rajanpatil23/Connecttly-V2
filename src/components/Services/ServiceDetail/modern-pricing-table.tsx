import React, { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Check, Star } from "lucide-react"

export interface Plan {
  title: string
  price: {
    monthly: number
    yearly: number
  }
  description: string
  features: string[]
  ctaText: string
  ctaHref: string
  isFeatured?: boolean
}

interface PricingTableProps {
  plans: Plan[]
  heading?: string
  description?: string
  accentColor?: string
}

// Individual Digit Animation Component
const AnimatedDigit: React.FC<{ digit: string; index: number }> = ({ digit, index }) => {
  return (
    <div className="relative overflow-hidden inline-block min-w-[1ch] text-center">
      <AnimatePresence mode="wait">
        <motion.span
          key={digit}
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -20, opacity: 0 }}
          transition={{ 
            duration: 0.3,
            delay: index * 0.05,
            ease: [0.4, 0, 0.2, 1]
          }}
          className="block"
        >
          {digit}
        </motion.span>
      </AnimatePresence>
    </div>
  )
}

// Enhanced Scrolling Number Component with individual digit animations
const ScrollingNumber: React.FC<{ value: number }> = ({ value }) => {
  const numberString = value.toString()
  
  return (
    <div className="flex items-center">
      {numberString.split('').map((digit, index) => (
        <AnimatedDigit 
          key={`${value}-${index}`}
          digit={digit}
          index={index}
        />
      ))}
    </div>
  )
}

const PricingTable: React.FC<PricingTableProps> = ({ 
  plans,
  heading = "Choose Your Plan",
  description = "Select the perfect plan for your needs. All plans include our core features with different limits and capabilities.",
  accentColor = "from-[#0074ED] to-[#5B9BF8]"
}) => {
  const [isYearly, setIsYearly] = useState(false)

  // Simple check icon for all features
  const getFeatureIcon = () => {
    return <Check className="size-3 text-foreground" />
  }





  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  }

  const cardVariants = {
    hidden: { 
      opacity: 0, 
      y: 20,
      scale: 0.95
    },
    visible: { 
      opacity: 1, 
      y: 0,
      scale: 1
    }
  }

  return (
    <div className="w-full max-w-7xl mx-auto space-y-12">
      {/* Header with Toggle */}
      <motion.div 
        className="text-center space-y-6"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="space-y-4">
          <motion.h1 
            className="text-4xl md:text-5xl font-bold text-foreground"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1, duration: 0.6 }}
          >
            {heading}
          </motion.h1>
          <motion.p 
            className="text-lg text-muted-foreground max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            {description}
          </motion.p>
        </div>

        {/* Billing Toggle */}
        <motion.div 
          className="flex items-center justify-center"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          <Tabs 
            value={isYearly ? "yearly" : "monthly"} 
            onValueChange={(value) => setIsYearly(value === "yearly")}
          >
            <TabsList className="flex w-full h-12 cursor-pointer">
              <TabsTrigger value="monthly" className="text-base font-medium cursor-pointer flex-1 px-3">Monthly</TabsTrigger>
              <TabsTrigger value="yearly" className="text-base font-medium flex items-center gap-2 cursor-pointer flex-1 px-3">
                Yearly
                <span className="text-xs bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 px-2 py-1 rounded-full font-medium">
                  Save 20%
                </span>
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </motion.div>
      </motion.div>

      {/* Pricing Cards */}
      <motion.div 
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.6, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
      >
        {plans.map((plan, index) => (
          <div
            key={plan.title}
            className="relative"
          >
            {/* Featured Badge */}
            {plan.isFeatured && (
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-10">
                <div className={`bg-gradient-to-r ${accentColor} text-white px-4 py-2 rounded-full text-sm font-medium flex items-center gap-2 shadow-lg`}>
                  <Star className="size-3 fill-current" />
                  Most Popular
                </div>
              </div>
            )}

            <div className={`
              relative h-full p-8 rounded-xl border-2 transition-all duration-300
              ${plan.isFeatured 
                ? `border-[#0074ED] bg-gradient-to-br from-[#E6F0FF] to-[#D6E8FF] dark:from-blue-950/20 dark:to-blue-900/20 dark:border-[#5B9BF8] shadow-lg` 
                : 'border-gray-200 dark:border-neutral-800 bg-white dark:bg-neutral-900'
              }
            `}>
              {/* Plan Header */}
              <div className="text-center space-y-4 mb-8">
                <h3 className="text-2xl font-bold text-foreground">{plan.title}</h3>
                <p className="text-muted-foreground">{plan.description}</p>
                
                {/* Animated Price with Scrolling Numbers */}
                <div className="space-y-2">
                  <div className="text-4xl font-bold text-foreground flex items-center justify-center">
                    $<ScrollingNumber value={isYearly ? Math.round(plan.price.yearly / 12) : plan.price.monthly} />
                    <span className="text-lg text-muted-foreground font-normal ml-1">
                      /month
                    </span>
                  </div>
                  <div className="text-sm text-muted-foreground flex items-center justify-center gap-2">
                    <span>{isYearly ? `billed yearly` : `billed monthly`}</span>
                    {isYearly && (
                      <span className="text-xs bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 px-2 py-0.5 rounded-full font-medium">
                        Save ${(plan.price.monthly * 12) - plan.price.yearly}
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* Features List */}
              <div className="space-y-4 mb-8">
                {plan.features.map((feature, featureIndex) => (
                  <div
                    key={feature}
                    className="flex items-center gap-3"
                  >
                    <div className="flex-shrink-0 w-5 h-5 flex items-center justify-center">
                      {getFeatureIcon()}
                    </div>
                    <span className="text-sm text-foreground">{feature}</span>
                  </div>
                ))}
              </div>

              {/* CTA Button */}
              <div>
                <Button
                  asChild
                  variant={plan.isFeatured ? "default" : "outline"}
                  size="lg"
                  className="w-full"
                >
                  <a href={plan.ctaHref}>
                    {plan.ctaText}
                  </a>
                </Button>
              </div>
            </div>
          </div>
        ))}
      </motion.div>


    </div>
  )
}

export default PricingTable
