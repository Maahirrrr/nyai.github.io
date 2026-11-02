const { chromium } = require('playwright');
const path = require('path');
const fs = require('fs');

async function testVesper() {
  const outputDir = path.resolve(__dirname, '../artifacts/audit');
  fs.mkdirSync(outputDir, { recursive: true });

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

  const targetUrl = `file://${path.resolve(__dirname, '../index.html')}`;
  console.log(`Navigating to ${targetUrl}...`);
  await page.goto(targetUrl, { waitUntil: 'networkidle' });

  // 1. Verify title
  const title = await page.title();
  console.log(`Document title: "${title}"`);
  if (title !== 'Vesper.ai — Operational AI Infrastructure') {
    throw new Error(`Unexpected title: ${title}`);
  }

  // 2. Verify H1 em font
  const emFont = await page.locator('.hero-h1 em').evaluate(el => window.getComputedStyle(el).fontFamily);
  console.log(`H1 em font-family: ${emFont}`);

  // 3. Wait for entrance animation and is-in
  await page.waitForTimeout(2000);
  const isInCount = await page.locator('.is-in').count();
  console.log(`Elements with .is-in class: ${isInCount}`);

  // 4. Capture desktop screenshot (1440x900)
  await page.screenshot({ path: path.join(outputDir, 'vesper_desktop_1440.png') });
  console.log('Saved vesper_desktop_1440.png');

  // 5. Test 1920x1080
  await page.setViewportSize({ width: 1920, height: 1080 });
  await page.waitForTimeout(500);
  await page.screenshot({ path: path.join(outputDir, 'vesper_desktop_1920.png') });
  console.log('Saved vesper_desktop_1920.png');

  // 6. Test Mobile Viewport (390x844)
  const mobileContext = await browser.newContext({
    viewport: { width: 390, height: 844 },
    isMobile: true
  });
  const mobilePage = await mobileContext.newPage();
  await mobilePage.goto(targetUrl, { waitUntil: 'networkidle' });
  await mobilePage.waitForTimeout(2000);

  await mobilePage.screenshot({ path: path.join(outputDir, 'vesper_mobile_hero.png') });
  console.log('Saved vesper_mobile_hero.png');

  // Test Burger Menu
  const burger = mobilePage.locator('.burger');
  const isBurgerVisible = await burger.isVisible();
  console.log(`Mobile burger button visible: ${isBurgerVisible}`);

  await burger.click();
  await mobilePage.waitForTimeout(400);

  const isMenuOpen = await mobilePage.evaluate(() => document.body.classList.contains('menu-open'));
  console.log(`Body has menu-open after burger click: ${isMenuOpen}`);

  await mobilePage.screenshot({ path: path.join(outputDir, 'vesper_mobile_menu_open.png') });
  console.log('Saved vesper_mobile_menu_open.png');

  // Press Escape to close
  await mobilePage.keyboard.press('Escape');
  await mobilePage.waitForTimeout(400);
  const isMenuClosed = await mobilePage.evaluate(() => !document.body.classList.contains('menu-open'));
  console.log(`Body menu-open removed after Escape: ${isMenuClosed}`);

  // Test <= 560px viewport
  await mobilePage.setViewportSize({ width: 360, height: 740 });
  await mobilePage.waitForTimeout(400);
  await mobilePage.screenshot({ path: path.join(outputDir, 'vesper_mobile_360.png') });
  console.log('Saved vesper_mobile_360.png');

  await browser.close();

  console.log(`Console error count: ${consoleErrors.length}`);
  if (consoleErrors.length > 0) {
    console.error('Console errors:', consoleErrors);
  }
}

testVesper().catch(err => {
  console.error('Test failed:', err);
  process.exit(1);
});
