import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import FloatingWhatsApp from './components/FloatingWhatsApp';
import QuickEnquiryModal from './components/QuickEnquiryModal';
import CartToast from './components/CartToast';
import { CartProvider } from './context/CartContext';

import Home from './pages/Home';
import About from './pages/About';
import Products from './pages/Products';
import PrivateLabel from './pages/PrivateLabel';
import WholesaleExport from './pages/WholesaleExport';
import Contact from './pages/Contact';
import Cart from './pages/Cart';

export default function App() {
  const [modalOpen, setModalOpen] = useState(false);
  const [modalData, setModalData] = useState({});

  const handleOpenQuoteModal = (initialData = {}) => {
    setModalData(initialData);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  return (
    <CartProvider>
      <div className="site-wrapper">
        <Navbar onOpenQuoteModal={() => handleOpenQuoteModal({ enquiryType: 'Wholesale' })} />

        <main id="main-content">
          <Routes>
            <Route 
              path="/" 
              element={<Home onOpenQuoteModal={handleOpenQuoteModal} />} 
            />
            <Route 
              path="/about" 
              element={<About />} 
            />
            <Route 
              path="/products" 
              element={<Products onOpenQuoteModal={handleOpenQuoteModal} />} 
            />
            <Route 
              path="/private-label" 
              element={<PrivateLabel />} 
            />
            <Route 
              path="/wholesale-export" 
              element={<WholesaleExport onOpenQuoteModal={handleOpenQuoteModal} />} 
            />
            <Route 
              path="/contact" 
              element={<Contact />} 
            />
            <Route 
              path="/cart" 
              element={<Cart />} 
            />
            <Route 
              path="*" 
              element={<Home onOpenQuoteModal={handleOpenQuoteModal} />} 
            />
          </Routes>
        </main>

        <Footer onOpenQuoteModal={() => handleOpenQuoteModal({ enquiryType: 'Wholesale' })} />

        {/* Global Cart Toast notification */}
        <CartToast />

        {/* Persistent conversion elements */}
        <FloatingWhatsApp />

        {/* Global Quick Quotation / Enquiry Modal */}
        <QuickEnquiryModal
          isOpen={modalOpen}
          onClose={handleCloseModal}
          initialData={modalData}
        />
      </div>
    </CartProvider>
  );
}
