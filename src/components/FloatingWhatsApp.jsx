import React, { useState } from 'react';
import { CONTACT_INFO } from '../data/marketsData';

export default function FloatingWhatsApp() {
  const [hovered, setHovered] = useState(false);

  return (
    <div 
      className="floating-whatsapp-container"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {hovered && (
        <div className="floating-whatsapp-tooltip" role="tooltip">
          Chat with Export Desk (+91 9443750820)
        </div>
      )}
      <a 
        href={CONTACT_INFO.whatsappLink} 
        target="_blank" 
        rel="noopener noreferrer" 
        className="floating-whatsapp-btn"
        aria-label="Direct WhatsApp chat with Classic Edge wholesale export desk"
      >
        <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.771-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.312.045-.698.074-2.027-.474-1.636-.676-2.69-2.348-2.771-2.457-.082-.109-.659-.877-.659-1.674 0-.796.417-1.189.565-1.353.149-.164.324-.205.433-.205.109 0 .218.001.313.006.1.005.234-.038.366.279.136.328.465 1.135.506 1.218.041.083.069.179.014.288-.055.109-.082.177-.164.273-.082.096-.172.214-.246.288-.082.083-.167.172-.072.336.095.164.423.698.908 1.129.624.555 1.15.727 1.314.809.164.082.261.069.358-.041.096-.11.41-4.78.52-6.42.109-.164.218-.137.368-.082.15.055.952.449 1.116.531.164.082.273.123.313.191.041.068.041.396-.103.801zM12 2C6.477 2 2 6.477 2 12c0 1.891.528 3.659 1.445 5.176L2 22l4.981-1.385A9.957 9.957 0 0012 22c5.523 0 10-4.477 10-10S17.523 2 12 2zm0 18.25c-1.611 0-3.11-.479-4.368-1.303l-.313-.206-2.887.803.803-2.822-.206-.328A8.204 8.204 0 013.75 12c0-4.549 3.701-8.25 8.25-8.25s8.25 3.701 8.25 8.25-3.701 8.25-8.25 8.25z"/>
        </svg>
      </a>
    </div>
  );
}
