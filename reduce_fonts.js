const fs = require('fs');
const path = require('path');

function processFile(file) {
    if (!fs.existsSync(file)) return;
    let content = fs.readFileSync(file, 'utf8');
    
    // globals.css
    if (file.endsWith('globals.css')) {
        content = content.replace(/clamp\(([\d.]+)rem,\s*([\d.]+)vw,\s*([\d.]+)rem\)/g, (match, min, vw, max) => {
            const newMin = (parseFloat(min) * 0.8).toFixed(2).replace(/\.?0+$/, '');
            const newVw = (parseFloat(vw) * 0.8).toFixed(2).replace(/\.?0+$/, '');
            const newMax = (parseFloat(max) * 0.8).toFixed(2).replace(/\.?0+$/, '');
            return `clamp(${newMin}rem, ${newVw}vw, ${newMax}rem)`;
        });
    } else {
        // .tsx files
        content = content.replace(/fontSize:\s*'clamp\(([\d.]+)rem,\s*([\d.]+)vw,\s*([\d.]+)rem\)'/g, (match, min, vw, max) => {
            // we skip standard body sizes (like 1rem or 0.8rem) and target headings > 1.5rem
            if (parseFloat(max) <= 1.5) {
                return match; // don't scale body text
            }
            const newMin = (parseFloat(min) * 0.8).toFixed(2).replace(/\.?0+$/, '');
            const newVw = (parseFloat(vw) * 0.8).toFixed(2).replace(/\.?0+$/, '');
            const newMax = (parseFloat(max) * 0.8).toFixed(2).replace(/\.?0+$/, '');
            return `fontSize: 'clamp(${newMin}rem, ${newVw}vw, ${newMax}rem)'`;
        });
    }

    fs.writeFileSync(file, content, 'utf8');
}

const files = [
    'app/globals.css', 
    'components/About.tsx', 
    'components/ContactEditorial.tsx', 
    'components/Ecosystem.tsx', 
    'components/Hero.tsx', 
    'components/Navbar.tsx', 
    'components/ProjectModal.tsx', 
    'components/ProjectsByPlace.tsx', 
    'components/ProjectsShowcase.tsx', 
    'components/Team.tsx', 
    'components/Testimonials.tsx', 
    'components/WhatWeDo.tsx',
    'components/Footer.tsx'
];

files.forEach(f => {
    processFile(path.join(process.cwd(), f));
});
