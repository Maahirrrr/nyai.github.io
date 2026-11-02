#!/usr/bin/env node
/**
 * NyAI Playwright Automated Audit Script
 * =====================================
 * Uses Playwright to verify rendering, 3D Canvas, navigation, chat interactions,
 * the redesigned chat sidebar, and the Hermes Agent configuration modal.
 */

const { chromium } = require('playwright');
const path = require('path');
const fs = require('fs');

// Use both http://localhost:8000 and file:// to test
const HTTP_URL = 'http://127.0.0.1:8000/#chat';
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

  // 1. Visit Chat Page via HTTP server on port 8000
  console.log('1. Loading Chat page at', HTTP_URL);
  await page.goto(HTTP_URL, { waitUntil: 'load' });
  await page.waitForTimeout(1000);

  // Capture sidebar and full chat screen
  await page.screenshot({ path: path.join(OUT_DIR, '04_desktop_chat.png') });
  console.log('   Captured chat screen');

  // Capture dedicated sidebar close-up
  const sidebarEl = await page.$('.chat-sidebar');
  if (sidebarEl) {
    await sidebarEl.screenshot({ path: path.join(OUT_DIR, '06_sidebar_redesign.png') });
    console.log('   Captured redesigned sidebar close-up');
  }

  // 2. Test Category Filtering
  console.log('2. Testing Category Filtering: Clicking "Criminal"');
  await page.click('button[data-cat="criminal"]');
  await page.waitForTimeout(300);
  const criminalItems = await page.$$('.chi');
  console.log('   Criminal filter items count:', criminalItems.length);

  // Reset to All
  await page.click('button[data-cat="all"]');
  await page.waitForTimeout(300);

  // 3. Test Statutory Quick Desk pill insertion
  console.log('3. Testing Statutory Quick Desk click (§ 103 Homicide)');
  await page.click('.chat-stat-chip');
  await page.waitForTimeout(300);
  const inputValue = await page.$eval('#chat-input', el => el.value);
  console.log('   Input value after pill click:', inputValue.slice(0, 50) + '...');

  // 4. Test Hermes Modal
  console.log('4. Testing Hermes Backend Configuration Modal');
  await page.click('#hermes-status-btn');
  await page.waitForTimeout(400);
  await page.screenshot({ path: path.join(OUT_DIR, '07_hermes_modal.png') });
  console.log('   Captured Hermes configuration modal');

  // Test Connection button
  await page.click('button:has-text("Test Connection")');
  await page.waitForTimeout(800);
  const feedback = await page.$eval('#hermes-test-feedback', el => el.textContent);
  console.log('   Hermes Test Connection result:', feedback);

  // Close modal
  await page.click('#hermes-modal-close');
  await page.waitForTimeout(300);

  // 5. Test Chat Submission
  console.log('5. Testing murder case intake triage');
  await page.fill('#chat-input', 'i killed a person of my age 20 year old and im living in ahmedabad');
  await page.click('#chat-send');
  await page.waitForTimeout(2000);
  await page.screenshot({ path: path.join(OUT_DIR, '08_case_triage_response.png') });
  console.log('   Captured case triage response');

  // 6. Test Home Page 3D Canvas
  console.log('6. Testing Home Page at http://127.0.0.1:8000/#home');
  await page.goto('http://127.0.0.1:8000/#home', { waitUntil: 'load' });
  await page.waitForTimeout(1000);
  await page.screenshot({ path: path.join(OUT_DIR, '01_desktop_home.png') });

  // 7. Mobile Viewport
  console.log('7. Testing Mobile Viewport (390x844)');
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('http://127.0.0.1:8000/#chat', { waitUntil: 'load' });
  await page.waitForTimeout(800);
  await page.screenshot({ path: path.join(OUT_DIR, '05_mobile_chat.png') });

  console.log('--- AUDIT COMPLETED ---');
  console.log('Console errors encountered:', consoleErrors.length);
  if (consoleErrors.length > 0) {
    console.warn('Errors:', consoleErrors);
  }

  await browser.close();
  console.log('All audit screenshots saved to:', OUT_DIR);
})();
