import React from "react";
import VendorHero from "../../components/VendorComponents/VendorHero";
import VendorHomeProductSection from "../../components/VendorComponents/VendorHomeProductSection";
import VendorHomeSupplierSection from "../../components/VendorComponents/VendorHomeSupplierSection";

const VendorHome = () => {
  return (
    <div>
      <VendorHero />
      <VendorHomeSupplierSection />

      <VendorHomeProductSection />
    </div>
  );
};

export default VendorHome;
