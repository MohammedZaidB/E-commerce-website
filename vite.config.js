import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import fs from 'fs';

// Automatically ensure public directory has images and pdf for standalone serving
try {
  const sourceFolder = path.resolve(__dirname, 'images and pdf');
  const targetFolder = path.resolve(__dirname, 'public', 'images-and-pdf');
  if (fs.existsSync(sourceFolder) && !fs.existsSync(targetFolder)) {
    fs.cpSync(sourceFolder, targetFolder, { recursive: true });
    console.log('[Classic Edge] Successfully copied images and abaya.pdf to public/images-and-pdf');
  }
} catch (err) {
  // Ignored if folder does not exist
}

// Automatically extract 27 abaya products from abaya.pdf if not already extracted
try {
  const abayaPdfPath = path.resolve(__dirname, 'images and pdf', 'abaya.pdf');
  const abayaOutDir = path.resolve(__dirname, 'public', 'abaya-images');
  if (fs.existsSync(abayaPdfPath)) {
    if (!fs.existsSync(abayaOutDir)) {
      fs.mkdirSync(abayaOutDir, { recursive: true });
    }
    const existingImgs = fs.readdirSync(abayaOutDir).filter(f => f.endsWith('.jpg') || f.endsWith('.jpeg'));
    if (existingImgs.length < 27) {
      const buf = fs.readFileSync(abayaPdfPath);
      console.log(`[Classic Edge] Scanning abaya.pdf (${buf.length} bytes) for embedded images...`);
      let count = 0;
      let pos = 0;
      while (pos < buf.length - 4) {
        if (buf[pos] === 0xFF && buf[pos + 1] === 0xD8 && buf[pos + 2] === 0xFF) {
          let endPos = pos + 3;
          while (endPos < buf.length - 1) {
            if (buf[endPos] === 0xFF && buf[endPos + 1] === 0xD9) {
              endPos += 2;
              break;
            }
            endPos++;
          }
          const len = endPos - pos;
          if (len > 30000) { // Valid high-res product photos (> 30KB)
            count++;
            const outPath = path.join(abayaOutDir, `abaya-${count}.jpg`);
            fs.writeFileSync(outPath, buf.subarray(pos, endPos));
            pos = endPos;
            continue;
          }
        }
        pos++;
      }
      console.log(`[Classic Edge] Successfully extracted ${count} images from abaya.pdf to public/abaya-images!`);
    }
  }
} catch (err) {
  console.warn('[Classic Edge] Abaya PDF extraction note:', err.message);
}


// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    {
      name: 'serve-local-images-and-pdf',
      configureServer(server) {
        server.middlewares.use((req, res, next) => {
          const rawUrl = req.url || '';
          const decoded = decodeURIComponent(rawUrl);

          if (decoded === '/api/extract-abaya') {
            const abayaPdfPath = path.resolve(__dirname, 'images and pdf', 'abaya.pdf');
            const abayaOutDir = path.resolve(__dirname, 'public', 'abaya-images');
            if (fs.existsSync(abayaPdfPath)) {
              if (!fs.existsSync(abayaOutDir)) fs.mkdirSync(abayaOutDir, { recursive: true });
              const buf = fs.readFileSync(abayaPdfPath);
              let count = 0;
              let pos = 0;
              while (pos < buf.length - 4) {
                if (buf[pos] === 0xFF && buf[pos + 1] === 0xD8 && buf[pos + 2] === 0xFF) {
                  let endPos = pos + 3;
                  while (endPos < buf.length - 1) {
                    if (buf[endPos] === 0xFF && buf[endPos + 1] === 0xD9) {
                      endPos += 2;
                      break;
                    }
                    endPos++;
                  }
                  const len = endPos - pos;
                  if (len > 25000) {
                    count++;
                    fs.writeFileSync(path.join(abayaOutDir, `abaya-${count}.jpg`), buf.subarray(pos, endPos));
                    pos = endPos;
                    continue;
                  }
                }
                pos++;
              }
              res.setHeader('Content-Type', 'application/json');
              return res.end(JSON.stringify({ success: true, count }));
            }
          }

          // Handle requests to /images and pdf/... or /images-and-pdf/...
          if (
            decoded.startsWith('/images and pdf/') || 
            decoded.startsWith('/images-and-pdf/') ||
            decoded.startsWith('/images%20and%20pdf/')
          ) {
            const cleanSubPath = decoded
              .replace(/^\/(images and pdf|images-and-pdf|images%20and%20pdf)\//, '');
            const targetPath = path.resolve(__dirname, 'images and pdf', cleanSubPath);

            if (fs.existsSync(targetPath) && fs.statSync(targetPath).isFile()) {
              if (targetPath.endsWith('.pdf')) {
                res.setHeader('Content-Type', 'application/pdf');
              } else if (targetPath.endsWith('.jpeg') || targetPath.endsWith('.jpg')) {
                res.setHeader('Content-Type', 'image/jpeg');
              }
              return fs.createReadStream(targetPath).pipe(res);
            }
          }
          next();
        });
      }
    }
  ],
  server: {
    port: 3000,
    open: true,
    fs: {
      allow: ['.', '..']
    }
  }
});
