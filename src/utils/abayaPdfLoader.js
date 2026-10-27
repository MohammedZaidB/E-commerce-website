// Robust client-side extractor for all 27 individual Abaya images from abaya.pdf
// Uses Mozilla PDF.js with real-time page-by-page rendering and session caching

let memoryCache = {};

// Ensure PDF.js is loaded from CDN or DOM
async function ensurePdfJs() {
  if (typeof window === 'undefined') return null;
  if (window.pdfjsLib) return window.pdfjsLib;

  // Check if script tag is already loading
  for (let i = 0; i < 30; i++) {
    if (window.pdfjsLib) return window.pdfjsLib;
    await new Promise((resolve) => setTimeout(resolve, 150));
  }

  // If still not loaded, inject script tag dynamically
  return new Promise((resolve, reject) => {
    if (window.pdfjsLib) return resolve(window.pdfjsLib);
    const script = document.createElement('script');
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.min.js';
    script.async = true;
    script.onload = () => resolve(window.pdfjsLib);
    script.onerror = () => reject(new Error('Failed to load PDF.js script'));
    document.head.appendChild(script);
  });
}

/**
 * Extracts all 26 individual page images from abaya.pdf
 * Calls onPageProgress(pageNumber, dataUrl) as each page completes rendering
 */
export async function extractAllAbayaImages(pdfUrl = '/images-and-pdf/abaya.pdf', onPageProgress = null) {
  const safePdfUrl = encodeURI(pdfUrl);

  // 1. Check in-memory cache first
  const cachedKeys = Object.keys(memoryCache);
  if (cachedKeys.length >= 26) {
    if (onPageProgress) {
      for (let p = 1; p <= 26; p++) {
        if (memoryCache[p]) onPageProgress(p, memoryCache[p]);
      }
    }
    return memoryCache;
  }

  // 2. Check sessionStorage
  try {
    const stored = sessionStorage.getItem('classic_edge_abaya_pages');
    if (stored) {
      const parsed = JSON.parse(stored);
      if (parsed && Object.keys(parsed).length >= 26) {
        memoryCache = parsed;
        if (onPageProgress) {
          for (let p = 1; p <= 26; p++) {
            if (memoryCache[p]) onPageProgress(p, memoryCache[p]);
          }
        }
        return memoryCache;
      }
    }
  } catch (err) {
    // SessionStorage quota or private mode, proceed to render
  }

  try {
    const pdfjs = await ensurePdfJs();
    if (!pdfjs) throw new Error('PDF.js not available');

    pdfjs.GlobalWorkerOptions.workerSrc =
      'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js';

    const loadingTask = pdfjs.getDocument({
      url: safePdfUrl,
      cMapUrl: 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/cmaps/',
      cMapPacked: true
    });

    const pdf = await loadingTask.promise;
    const totalPages = Math.min(pdf.numPages, 26);

    for (let pageNum = 1; pageNum <= totalPages; pageNum++) {
      try {
        const page = await pdf.getPage(pageNum);
        // Scale 0.45 produces crisp ~450x650px thumbnail, fast rendering & low memory
        const viewport = page.getViewport({ scale: 0.45 });

        const canvas = document.createElement('canvas');
        canvas.width = viewport.width;
        canvas.height = viewport.height;
        const ctx = canvas.getContext('2d');

        await page.render({
          canvasContext: ctx,
          viewport: viewport
        }).promise;

        const dataUrl = canvas.toDataURL('image/jpeg', 0.8);
        memoryCache[pageNum] = dataUrl;

        if (onPageProgress) {
          onPageProgress(pageNum, dataUrl);
        }
      } catch (pageErr) {
        console.warn(`[Classic Edge] Error rendering Abaya page ${pageNum}:`, pageErr);
      }
    }

    // Save thumbnail cache to sessionStorage
    try {
      if (Object.keys(memoryCache).length >= 20) {
        sessionStorage.setItem('classic_edge_abaya_pages', JSON.stringify(memoryCache));
      }
    } catch (e) {
      // Ignore quota error
    }

    return memoryCache;
  } catch (error) {
    console.warn('[Classic Edge] Abaya PDF rendering exception:', error);
    return memoryCache;
  }
}

/**
 * Render a single high-resolution page from abaya.pdf on demand (for Zoom lightbox)
 */
export async function renderHighResAbayaPage(pageNum, pdfUrl = '/images and pdf/abaya.pdf') {
  const safePdfUrl = encodeURI(pdfUrl);
  try {
    const pdfjs = await ensurePdfJs();
    if (!pdfjs) return null;

    pdfjs.GlobalWorkerOptions.workerSrc =
      'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js';

    const loadingTask = pdfjs.getDocument(safePdfUrl);
    const pdf = await loadingTask.promise;
    const page = await pdf.getPage(pageNum);
    const viewport = page.getViewport({ scale: 1.5 }); // High-res for zoom

    const canvas = document.createElement('canvas');
    canvas.width = viewport.width;
    canvas.height = viewport.height;
    const ctx = canvas.getContext('2d');

    await page.render({
      canvasContext: ctx,
      viewport: viewport
    }).promise;

    return canvas.toDataURL('image/jpeg', 0.92);
  } catch (e) {
    console.warn(`[Classic Edge] High-res render error for page ${pageNum}:`, e);
    return null;
  }
}
