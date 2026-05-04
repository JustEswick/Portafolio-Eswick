import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

const SVG_WIDTH = 1200;
const SVG_HEIGHT = 630;
const OUTPUT_PATH = path.resolve('public/og-image.png');
const GHOST_SVG_PATH = path.resolve('src/assets/brand/ghost.svg');

async function generateOgImage() {
  try {
    // Read existing ghost.svg
    let ghostSvgContent = fs.readFileSync(GHOST_SVG_PATH, 'utf-8');
    
    // Inject exact colors into CSS variables / currentColor
    ghostSvgContent = ghostSvgContent.replace(/var\(--color-bg\)/g, '#0A0A0F');
    ghostSvgContent = ghostSvgContent.replace(/currentColor/g, '#00FF66');
    
    // Extract everything between <svg ...> and </svg>
    const innerContentMatch = ghostSvgContent.match(/<svg[^>]*>([\s\S]*?)<\/svg>/i);
    const innerGhost = innerContentMatch ? innerContentMatch[1] : '';

    // The original ghost svg has viewBox="0 0 63.5 63.5". 
    // We scale it up by 6.5 -> 412px
    const svgTemplate = `
      <svg width="${SVG_WIDTH}" height="${SVG_HEIGHT}" viewBox="0 0 ${SVG_WIDTH} ${SVG_HEIGHT}" xmlns="http://www.w3.org/2000/svg">
        <!-- Background -->
        <rect width="100%" height="100%" fill="#0A0A0F" />
        
        <!-- Decorative Grid -->
        <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
          <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#ffffff" stroke-opacity="0.03" stroke-width="1"/>
        </pattern>
        <rect width="100%" height="100%" fill="url(#grid)" />

        <!-- Ghost Graphic -->
        <g transform="translate(680, 100) scale(6.5)">
          ${innerGhost}
        </g>

        <!-- Typography -->
        <g transform="translate(100, 315)">
          <!-- Top Tag -->
          <text x="0" y="-120" font-family="monospace, Courier New, Courier" font-size="28" font-weight="bold" fill="#00FF66" letter-spacing="4">
            CREATOR
          </text>
          
          <!-- Name -->
          <text x="0" y="-30" font-family="Inter, system-ui, sans-serif" font-size="72" font-weight="900" fill="#ffffff" letter-spacing="-2">
            Isaac Sánchez Camacho
          </text>
          
          <!-- Headline -->
          <text x="0" y="50" font-family="Inter, system-ui, sans-serif" font-size="40" font-weight="600" fill="#a1a1aa">
            AI Engineer &amp; Creator
          </text>

          <!-- Decorative Line -->
          <rect x="0" y="110" width="120" height="8" fill="#00FF66" />
        </g>
      </svg>
    `;

    // Render to PNG
    await sharp(Buffer.from(svgTemplate))
      .png()
      .toFile(OUTPUT_PATH);

    console.log(`[OG Image Generator] Success: ${OUTPUT_PATH}`);
  } catch (error) {
    console.error('[OG Image Generator] Failed:', error);
    process.exit(1);
  }
}

generateOgImage();
