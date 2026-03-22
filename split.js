const fs = require('fs');
const path = require('path');

let html = fs.readFileSync('index.html', 'utf8');

// Extract style
const styleMatch = html.match(/<style>([\s\S]*?)<\/style>/);
if (styleMatch) {
  fs.writeFileSync('style.css', styleMatch[1].trim());
  html = html.replace(styleMatch[0], '<link rel="stylesheet" href="style.css">');
}

// Extract script
const scriptMatch = html.match(/<script>([\s\S]*?)<\/script>/);
if (scriptMatch) {
  let scriptCode = scriptMatch[1];
  
  // Modify scriptCode to handle highlighting logic and remove showPage logic
  // Wait, if we use real links, we don't need `showPage` or hiding pages.
  // The pages will just have `page active` hardcoded, and the script doesn't need to do it.
  scriptCode = scriptCode.replace(/window\.showPage = function\(n\) \{[\s\S]*?\};\n\nwindow\.toggleMobile/, "window.toggleMobile");
  scriptCode = scriptCode.replace(/showPage\('home'\);/, "");

  fs.writeFileSync('app.js', scriptCode.trim());
  html = html.replace(scriptMatch[0], '<script src="app.js"></script>');
}

// Modify global links
html = html.replace(/href="#" onclick="showPage\('home'\);?closeMob\(\)"/g, 'href="index.html" onclick="closeMob()"');
html = html.replace(/href="#" onclick="showPage\('([^']+)'\);?closeMob\(\)"/g, 'href="$1.html" onclick="closeMob()"');
html = html.replace(/href="#" onclick="showPage\('home'\)"/g, 'href="index.html"');
html = html.replace(/href="#" onclick="showPage\('([^']+)'\)"/g, 'href="$1.html"');

html = html.replace(/onclick="showPage\('home'\)"/g, 'onclick="window.location.href=\'index.html\'"');
html = html.replace(/onclick="showPage\('([^']+)'\)"/g, 'onclick="window.location.href=\'$1.html\'"');

// Also update `event.stopPropagation();showPage('platform')`
html = html.replace(/onclick="event\.stopPropagation\(\);showPage\('([^']+)'\)"/g, 'onclick="event.stopPropagation();window.location.href=\'$1.html\'"');

// Split into parts
const headPart = html.substring(0, html.indexOf('<!-- =================== HOME =================== -->'));
const footerPart = html.substring(html.indexOf('<!-- GLOBAL FOOTER -->'));

const pageRegex = /<!-- =================== ([A-Z ]+) =================== -->\r?\n<div id="page-([a-z]+)" class="page(?: active)?">([\s\S]*?)<\/div>(?=\r?\n\r?\n<!-- ===================|\r?\n\r?\n<!-- GLOBAL)/g;

let match;
while ((match = pageRegex.exec(html)) !== null) {
  const pageTitle = match[1];
  const pageId = match[2];
  const pageContent = match[3];

  let outHtml = headPart;
  
  // Update active nav link
  let pageNavId = pageId === 'home' ? 'nav-home' : 'nav-' + pageId; // Note: home doesn't have an ID, but others do
  if (pageId !== 'home') {
    outHtml = outHtml.replace(`id="nav-${pageId}"`, `id="nav-${pageId}" class="active"`);
  }

  // Hide footer on chat/signin
  let finalFooter = footerPart;
  if (pageId === 'chat' || pageId === 'signin') {
    finalFooter = footerPart.replace('<footer id="global-footer">', '<footer id="global-footer" style="display:none;">');
  }

  outHtml += `<!-- =================== ${pageTitle} =================== -->\n`;
  outHtml += `<div id="page-${pageId}" class="page active">\n`;
  outHtml += pageContent;
  outHtml += `\n</div>\n\n`;
  outHtml += finalFooter;

  const fileName = pageId === 'home' ? 'index.html' : `${pageId}.html`;
  fs.writeFileSync(fileName, outHtml);
  console.log('Created: ' + fileName);
}
