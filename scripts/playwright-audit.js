#!/usr/bin/env node
/**
 * NyAI Playwright Automated Audit Script
 * =====================================
 * Uses Playwright to verify rendering, 3D Canvas, navigation, and chat interactions.
 */

const { chromium } = require('playwright');
const path = require('path');
const fs = require('fs');

const FILE_URL = 'file://' + path.resolve(__dirname, '../index.html');
const OUT_DIR = path.resolve(__dirname, '../artifacts/audit');

if (!fs.existsSync(OUT_DIR)) {
  fs.mkdirSync(OUT_DIR, { recursive: true });
}

(async () => {
  console.log('--- STARTING PLAYWRIGHT AUDIT ---');
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    viewport: { width: 1440, height: 900 }
  });

  const page = await context.newPage();
  const consoleErrors = [];
  page.on('console', msg => {
    if (msg.type() === 'error') {
      consoleErrors.push(msg.text());
    }
  });

  // 1. Visit Home Page
  console.log('1. Loading Home page at', FILE_URL);
  await page.goto(FILE_URL, { waitUntil: 'load' });
  const title = await page.title();
  console.log('   Title:', title);

  // Allow 3D canvas and animations to render
  await page.waitForTimeout(1000);
  await page.screenshot({ path: path.join(OUT_DIR, '01_desktop_home.png') });
  console.log('   Captured desktop home screenshot');

  // Verify 3D canvas exists
  const hasCanvas = await page.$('#hero-three-canvas');
  console.log('   3D Three.js canvas present:', !!hasCanvas);

  // 2. Navigate to Platform
  console.log('2. Navigating to #platform');
  await page.click('#nav-platform');
  await page.waitForTimeout(400);
  await page.screenshot({ path: path.join(OUT_DIR, '02_desktop_platform.png') });

  // 3. Navigate to Pricing
  console.log('3. Navigating to #pricing');
  await page.click('#nav-pricing');
  await page.waitForTimeout(400);
  await page.screenshot({ path: path.join(OUT_DIR, '03_desktop_pricing.png') });

  // 4. Navigate to Chat Assistant
  console.log('4. Navigating to #chat');
  await page.click('.nav-cta');
  await page.waitForTimeout(600);

  // Click on a recent conversation in sidebar
  const firstConv = await page.$('.chi');
  if (firstConv) {
    await firstConv.click();
    await page.waitForTimeout(400);
    console.log('   Clicked sidebar conversation item');
  }

  // Type a test prompt and verify response
  console.log('5. Testing chat interaction');
  await page.fill('#chat-input', 'What are the consequences of underage driving under MVA 1988 in Ahmedabad?');
  await page.click('#chat-send');
  await page.waitForTimeout(1200);

  await page.screenshot({ path: path.join(OUT_DIR, '04_desktop_chat.png') });
  console.log('   Captured chat assistant screenshot');

  // 6. Test Mobile Viewport (390x844)
  console.log('6. Testing Mobile Viewport (390x844)');
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto(FILE_URL + '#home', { waitUntil: 'load' });
  await page.waitForTimeout(800);
  await page.screenshot({ path: path.join(OUT_DIR, '05_mobile_home.png') });

  console.log('--- AUDIT COMPLETED ---');
  console.log('Console errors encountered:', consoleErrors.length);
  if (consoleErrors.length > 0) {
    console.warn('Errors:', consoleErrors);
  }

  await browser.close();
  console.log('All audit screenshots saved to:', OUT_DIR);
})();
