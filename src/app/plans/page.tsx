"use client";
import React from "react";
import { Check, X } from "lucide-react";
import { Header } from "../components/Header";
import Footer from "../components/Footer";

const PricingPlans = () => {
  const plans = [
    {
      name: "Free Plan",
      price: "$0",
      description: "Get started with basic features",
      features: ["Limited access", "Basic support", "Community resources"],
      buttonText: "Start Free",
      isMostPopular: false,
      isContactRequired: false,
    },
    {
      name: "Pro Plan",
      price: "$29",
      description: "Everything you need to grow",
      features: [
        "Full feature access",
        "Priority support",
        "Advanced analytics",
        "Unlimited projects",
      ],
      buttonText: "Choose Pro",
      isMostPopular: true,
      isContactRequired: false,
    },
    {
      name: "Enterprise",
      price: "Custom",
      description: "Tailored solutions for your business",
      features: [
        "Dedicated account manager",
        "Custom integrations",
        "Advanced security",
        "SLA guarantee",
      ],
      buttonText: "Contact Sales",
      isMostPopular: false,
      isContactRequired: true,
    },
  ];

  return (
    <>
      <Header />

      <div className="min-h-screen bg-white text-[#121212] py-12 px-4">
        <div className="container mx-auto">
          <h1 className="text-4xl font-bold text-center mb-12">
            Pricing Plans
          </h1>

          <div className="grid md:grid-cols-3 gap-8">
            {plans.map((plan) => (
              <div
                key={plan.name}
                className={`
                border rounded-xl p-6 transform transition-all 
                ${
                  plan.isMostPopular
                    ? "border-2 border-[#121212] scale-105 shadow-xl"
                    : "border-gray-400"
                }
              `}
              >
                {plan.isMostPopular && (
                  <div className="text-center text-sm font-semibold mb-2 text-[#121212]">
                    Most Popular
                  </div>
                )}

                <h2 className="text-2xl font-bold mb-4">{plan.name}</h2>
                <p className="text-gray-600 mb-4">{plan.description}</p>

                <div className="text-4xl font-bold mb-6">
                  {plan.price}
                  <span className="text-base font-normal ml-1">
                    {!plan.isContactRequired ? "/ month" : ""}
                  </span>
                </div>

                <ul className="mb-8 space-y-3">
                  {plans[0].features.map((feature, index) => (
                    <li key={feature} className="flex items-center">
                      {index < plan.features.length ? (
                        <Check className="w-5 h-5 mr-2 text-green-500" />
                      ) : (
                        <X className="w-5 h-5 mr-2 text-red-500" />
                      )}
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>

                <button
                  onClick={() => {
                    window.open("mailto:toolsdirectory.com", "_self");
                  }}
                  className={`
                  w-full py-3 rounded-lg font-semibold transition-all
                  ${
                    plan.isMostPopular
                      ? "bg-[#121212] text-white hover:bg-gray-800"
                      : "border border-[#121212] text-[#121212] hover:bg-gray-100"
                  }
                `}
                >
                  {plan.buttonText}
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default PricingPlans;
