/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { AppDataState, ProductPriceItem } from './types';
import { loadAppData, saveAppData, resetAppData } from './utils/storage';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { ServicesOverview } from './components/ServicesOverview';
import { PriceCatalog } from './components/PriceCatalog';
import { PriceCalculator } from './components/PriceCalculator';
import { NationwideShippingSection } from './components/NationwideShippingSection';
import { PortfolioGallery } from './components/PortfolioGallery';
import { WhyChooseUs } from './components/WhyChooseUs';
import { ProcessSection } from './components/ProcessSection';
import { Testimonials } from './components/Testimonials';
import { FaqSection } from './components/FaqSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { WhatsAppFloatingWidget } from './components/WhatsAppFloatingWidget';
import { MobileQuickBar } from './components/MobileQuickBar';
import { CmsModal } from './components/CmsModal';

export default function App() {
  const [appData, setAppData] = useState<AppDataState>(() => loadAppData());
  const [isCmsOpen, setIsCmsOpen] = useState<boolean>(false);
  const [selectedProductCategory, setSelectedProductCategory] = useState<string>('all');
  const [calcInitialProductId, setCalcInitialProductId] = useState<string | undefined>(undefined);

  // Sync to storage on modification
  const handleSaveData = (newData: AppDataState) => {
    saveAppData(newData);
    setAppData(newData);
  };

  const handleResetData = () => {
    const defaultData = resetAppData();
    setAppData(defaultData);
  };

  const scrollToCalculator = (product?: ProductPriceItem) => {
    if (product) {
      setCalcInitialProductId(product.id);
    }
    const elem = document.getElementById('kalkulator');
    if (elem) {
      elem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSelectServiceCategory = (category: string) => {
    setSelectedProductCategory(category);
    const elem = document.getElementById('produk');
    if (elem) {
      elem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 flex flex-col font-sans">
      {/* Navigation Bar */}
      <Navbar
        company={appData.company}
        onOpenCms={() => setIsCmsOpen(true)}
        onOpenCalculator={() => scrollToCalculator()}
      />

      {/* Main Content Area */}
      <main className="flex-1">
        {/* Hero Section */}
        <Hero
          company={appData.company}
          onOpenCalculator={() => scrollToCalculator()}
        />

        {/* 4 Pillars Services Overview */}
        <ServicesOverview
          whatsappNumber={appData.company.whatsapp}
          onSelectCategory={handleSelectServiceCategory}
        />

        {/* Transparent Price Catalog */}
        <PriceCatalog
          pricing={appData.pricing}
          whatsappNumber={appData.company.whatsapp}
          selectedCategory={selectedProductCategory}
          onCategoryChange={setSelectedProductCategory}
          onOpenCalculatorWithProduct={scrollToCalculator}
        />

        {/* Interactive Cost Estimator Calculator */}
        <PriceCalculator
          pricing={appData.pricing}
          whatsappNumber={appData.company.whatsapp}
          initialProductId={calcInitialProductId}
        />

        {/* Nationwide Shipping & Cross-Island Services Section */}
        <NationwideShippingSection
          whatsappNumber={appData.company.whatsapp}
        />

        {/* Portfolio Showcase Gallery */}
        <PortfolioGallery
          projects={appData.projects}
          whatsappNumber={appData.company.whatsapp}
        />

        {/* Workshop Advantages & Guarantees */}
        <WhyChooseUs />

        {/* 4-Step Order & Fabrication Flow */}
        <ProcessSection
          whatsappNumber={appData.company.whatsapp}
        />

        {/* Client Testimonials */}
        <Testimonials
          testimonials={appData.testimonials}
        />

        {/* High SEO Value FAQ Section */}
        <FaqSection
          whatsappNumber={appData.company.whatsapp}
        />

        {/* Contact, Location & Lead Form */}
        <ContactSection
          company={appData.company}
        />
      </main>

      {/* Footer */}
      <Footer
        company={appData.company}
        onOpenCms={() => setIsCmsOpen(true)}
      />

      {/* WhatsApp Floating Interactive Widget */}
      <WhatsAppFloatingWidget
        whatsappNumber={appData.company.whatsapp}
        phoneNumber={appData.company.phone}
      />

      {/* Mobile Sticky Action Bar */}
      <MobileQuickBar
        phone={appData.company.phone}
        whatsapp={appData.company.whatsapp}
        onOpenCalculator={() => scrollToCalculator()}
      />

      {/* CMS Management Modal */}
      <CmsModal
        isOpen={isCmsOpen}
        onClose={() => setIsCmsOpen(false)}
        appData={appData}
        onSaveData={handleSaveData}
        onResetData={handleResetData}
      />
    </div>
  );
}
