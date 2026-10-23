import { useEffect } from 'react';

export default function SEO({ title, description }) {
  useEffect(() => {
    // Update document title
    const baseTitle = 'Classic Edge | India Leather & Textile Sourcing';
    document.title = title ? `${title} | Classic Edge` : baseTitle;

    // Update meta description
    let metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc && description) {
      metaDesc.setAttribute('content', description);
    }

    // Scroll to top on page change
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [title, description]);

  return null;
}
