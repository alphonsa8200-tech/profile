import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ItemDetailModal from './components/ItemDetailModal';
import Toast from './components/Toast';

import HomeView from './views/HomeView';
import ReportLostView from './views/ReportLostView';
import ReportFoundView from './views/ReportFoundView';
import FoundGalleryView from './views/FoundGalleryView';
import ClaimSplitView from './views/ClaimSplitView';
import AdminVerificationView from './views/AdminVerificationView';
import ContactView from './views/ContactView';

import { INITIAL_ITEMS, INITIAL_CLAIMS } from './data/mockItems';

export default function App() {
  const [items, setItems] = useState(INITIAL_ITEMS);
  const [claims, setClaims] = useState(INITIAL_CLAIMS);
  const [activeTab, setActiveTab] = useState('home');
  const [selectedClaimItem, setSelectedClaimItem] = useState(null);
  const [selectedDetailItem, setSelectedDetailItem] = useState(null);
  const [toast, setToast] = useState(null);

  const showToast = (message, type = 'success') => {
    setToast({ message, type });
  };

  // Add a newly reported lost item
  const handleAddLostItem = (newItem) => {
    setItems(prev => [newItem, ...prev]);
    showToast(`Lost item report "${newItem.name}" submitted successfully! Reference: ${newItem.id}`);
  };

  // Add a newly reported found item
  const handleAddFoundItem = (newItem) => {
    setItems(prev => [newItem, ...prev]);
    showToast(`Found item "${newItem.name}" added to community gallery!`);
  };

  // Trigger Claim View for a specific item
  const handleStartClaim = (item) => {
    setSelectedClaimItem(item);
    setActiveTab('claim-split');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Submit Claim
  const handleSubmitClaim = (newClaim) => {
    setClaims(prev => [newClaim, ...prev]);
    showToast(`Claim for "${newClaim.itemName}" submitted! Our team will verify ownership.`);
  };

  // Admin approves claim
  const handleApproveClaim = (claimId) => {
    setClaims(prev => prev.map(c => {
      if (c.id === claimId) {
        return { ...c, status: 'APPROVED' };
      }
      return c;
    }));
    showToast(`Claim ${claimId} has been approved! Safe return contacts unlocked.`, 'success');
  };

  // Admin rejects claim
  const handleRejectClaim = (claimId, reason) => {
    setClaims(prev => prev.map(c => {
      if (c.id === claimId) {
        return { ...c, status: 'REJECTED', adminNotes: reason };
      }
      return c;
    }));
    showToast(`Claim ${claimId} was marked as rejected.`, 'error');
  };

  // Share item card helper
  const handleShareItem = (item) => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(`[FindLost] Check item: ${item.name} at ${item.location} (Ref: ${item.id})`);
      showToast(`Link for "${item.name}" copied to clipboard!`, 'info');
    } else {
      showToast(`Item Reference: ${item.id} copied!`, 'info');
    }
  };

  const pendingClaimsCount = claims.filter(c => c.status === 'PENDING').length;

  return (
    <div className="min-h-screen bg-surface-canvas text-[#1C1939] font-sans flex flex-col selection:bg-brand selection:text-white">
      
      {/* Sticky Navigation Bar */}
      <Navbar 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        pendingClaimsCount={pendingClaimsCount}
      />

      {/* Main Multi-Layout Viewport */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        
        {/* View 1: Home Page (Layout 0 / Dashboard) */}
        {activeTab === 'home' && (
          <HomeView 
            items={items}
            setActiveTab={setActiveTab}
            onSelectClaimItem={handleStartClaim}
            onSelectDetailItem={(item) => setSelectedDetailItem(item)}
            onShareItem={handleShareItem}
          />
        )}

        {/* View 2: Layout 1 – Report a Lost Item (Simple Reporting Form) */}
        {activeTab === 'report-lost' && (
          <ReportLostView 
            onSubmitLostItem={handleAddLostItem}
            setActiveTab={setActiveTab}
          />
        )}

        {/* View 3: Layout 2 – Report a Found Item (Good Samaritan Form) */}
        {activeTab === 'report-found' && (
          <ReportFoundView 
            onSubmitFoundItem={handleAddFoundItem}
            setActiveTab={setActiveTab}
          />
        )}

        {/* View 4: Layout 3 – Find & Claim Your Item (Picture Gallery with Cards) */}
        {activeTab === 'gallery' && (
          <FoundGalleryView 
            items={items}
            setActiveTab={setActiveTab}
            onSelectClaimItem={handleStartClaim}
            onSelectDetailItem={(item) => setSelectedDetailItem(item)}
            onShareItem={handleShareItem}
          />
        )}

        {/* View 5: Layout 4 – Claim Items (Split-Screen Ownership Verification) */}
        {activeTab === 'claim-split' && (
          <ClaimSplitView 
            item={selectedClaimItem || items.find(i => i.type === 'found')}
            onBack={() => setActiveTab('gallery')}
            onSubmitClaim={handleSubmitClaim}
            setActiveTab={setActiveTab}
          />
        )}

        {/* View 6: Layout 5 – Claim Verification (Admin Portal) */}
        {activeTab === 'admin' && (
          <AdminVerificationView 
            claims={claims}
            onApproveClaim={handleApproveClaim}
            onRejectClaim={handleRejectClaim}
            setActiveTab={setActiveTab}
          />
        )}

        {/* View 7: Layout 6 – Contact Details & Privacy Guarantee */}
        {activeTab === 'contact' && (
          <ContactView 
            setActiveTab={setActiveTab}
          />
        )}

      </main>

      {/* Item Detail Lightbox Modal */}
      {selectedDetailItem && (
        <ItemDetailModal 
          item={selectedDetailItem}
          onClose={() => setSelectedDetailItem(null)}
          onClaim={handleStartClaim}
          onShare={handleShareItem}
        />
      )}

      {/* Global Toast Alert */}
      {toast && (
        <Toast 
          message={toast.message} 
          type={toast.type} 
          onClose={() => setToast(null)} 
        />
      )}

      {/* Footer */}
      <Footer setActiveTab={setActiveTab} />

    </div>
  );
}
