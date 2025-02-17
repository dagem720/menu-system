// import type { Metadata } from "next";
// import { EcommerceMetrics } from "@/components/ecommerce/EcommerceMetrics";
import React from "react";


export default function Ecommerce() {
  return (
    <div className="grid place-items-center gap-4 md:gap-6">
        <div className="p-6 bg-gray-100 rounded-lg shadow-md">
      <h1 className="text-2xl font-bold text-gray-800 mb-4">
        Welcome!
      </h1>
      <p className="text-lg text-gray-600">
        You can access the <span className="font-semibold text-blue-600">Menu</span> page in the{' '}
        <span className="font-semibold text-blue-600">System</span> tab and{' '}
        <span className="font-semibold text-blue-600">Menus</span> sub-tab.
      </p>
    </div>
    </div>
  );
}
