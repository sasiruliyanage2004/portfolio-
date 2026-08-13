import fs from 'fs';
import path from 'path';

const profileBuffer = fs.readFileSync(path.join(process.cwd(), 'public', 'profile.png'));
const base64Data = profileBuffer.toString('base64');
const dataUri = `data:image/jpeg;base64,${base64Data}`;

const svgContent = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" width="64" height="64">
  <defs>
    <clipPath id="avatar-clip">
      <circle cx="32" cy="32" r="27" />
    </clipPath>
    <linearGradient id="cyan-glow" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#06b6d4" />
      <stop offset="100%" stop-color="#6366f1" />
    </linearGradient>
  </defs>
  <circle cx="32" cy="32" r="31" fill="url(#cyan-glow)" />
  <circle cx="32" cy="32" r="29" fill="#05080f" />
  <image href="${dataUri}" x="5" y="5" width="54" height="54" clip-path="url(#avatar-clip)" preserveAspectRatio="xMidYMin slice" />
</svg>`;

fs.writeFileSync(path.join(process.cwd(), 'public', 'favicon.svg'), svgContent, 'utf-8');
console.log('Successfully generated public/favicon.svg with embedded Base64 avatar!');
