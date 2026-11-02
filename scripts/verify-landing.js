const { chromium } = require('playwright');
const path = require('path');
const fs = require('fs');

async function verify() {
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
  console.log(`Navigating to ${targetUrl} ...`);
  await page.goto(targetUrl, { waitUntil: 'networkidle' });

  // 1. Check dynamic logo rays
  const rayCount = await page.locator('svg g.rays line').count();
  console.log(`Logo ray line count: ${rayCount} (expected 24)`);

  // 2. Wait for entrance animation to finish (at least 2000ms)
  await page.waitForTimeout(2500);

  const hasEntranceClass = await page.evaluate(() => document.documentElement.classList.contains('entrance'));
  const hasHeroReadyClass = await page.evaluate(() => document.documentElement.classList.contains('hero-ready'));
  console.log(`html.entrance removed: ${!hasEntranceClass}, html.hero-ready added: ${hasHeroReadyClass}`);

  // Screenshot desktop hero (Section 1)
  await page.screenshot({ path: path.join(outputDir, '01_desktop_hero.png') });
  console.log('Saved 01_desktop_hero.png');

  // 3. Scroll to Section 2 (#features)
  await page.evaluate(() => {
    document.querySelector('#features').scrollIntoView({ behavior: 'smooth' });
  });

  // Wait for Section 2 animation
  await page.waitForTimeout(2500);
  const hasEntranceS2Class = await page.evaluate(() => document.documentElement.classList.contains('entrance-s2'));
  console.log(`html.entrance-s2 removed: ${!hasEntranceS2Class}`);

  // Screenshot desktop Section 2
  await page.screenshot({ path: path.join(outputDir, '02_desktop_section2.png') });
  console.log('Saved 02_desktop_section2.png');

  // Full page screenshot
  await page.screenshot({ path: path.join(outputDir, '03_desktop_fullpage.png'), fullPage: true });
  console.log('Saved 03_desktop_fullpage.png');

  // 4. Test Mobile Viewport
  const mobileContext = await browser.newContext({
    viewport: { width: 390, height: 844 },
    isMobile: true
  });
  const mobilePage = await mobileContext.newPage();
  await mobilePage.goto(targetUrl, { waitUntil: 'networkidle' });
  await mobilePage.waitForTimeout(2500);

  await mobilePage.screenshot({ path: path.join(outputDir, '04_mobile_hero.png') });
  console.log('Saved 04_mobile_hero.png');

  // Click burger button
  const burger = mobilePage.locator('.burger-btn');
  if (await burger.isVisible()) {
    await burger.click();
    await mobilePage.waitForTimeout(600);

    const overlayOpen = await mobilePage.evaluate(() => {
      const ov = document.querySelector('#navOverlay');
      return ov && ov.classList.contains('open') && document.body.classList.contains('menu-open');
    });
    console.log(`Mobile nav overlay open: ${overlayOpen}`);

    await mobilePage.screenshot({ path: path.join(outputDir, '05_mobile_menu_open.png') });
    console.log('Saved 05_mobile_menu_open.png');
  } else {
    console.warn('Burger button was not visible on 390px viewport');
  }

  // Close menu and scroll mobile to section 2
  await burger.click();
  await mobilePage.waitForTimeout(500);
  await mobilePage.evaluate(() => {
    document.querySelector('#features').scrollIntoView();
  });
  await mobilePage.waitForTimeout(2500);
  await mobilePage.screenshot({ path: path.join(outputDir, '06_mobile_section2.png') });
  console.log('Saved 06_mobile_section2.png');

  await browser.close();

  console.log(`Total console errors: ${consoleErrors.length}`);
  if (consoleErrors.length > 0) {
    console.log('Console errors:', consoleErrors);
  }
}

verify().catch(err => {
  console.error('Verification failed:', err);
  process.exit(1);
});
