const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });

  await page.goto('http://localhost:8000/', { waitUntil: 'networkidle' });
  await page.waitForTimeout(1000);

  // 1. Lithos Hero
  await page.screenshot({ path: '/home/maahir/.gemini/antigravity/brain/d911e133-e1dc-44a4-ab84-d51cc3b95abb/redesign_01_lithos_hero.png' });

  // Move mouse to test spotlight reveal
  await page.mouse.move(720, 450);
  await page.waitForTimeout(300);
  await page.screenshot({ path: '/home/maahir/.gemini/antigravity/brain/d911e133-e1dc-44a4-ab84-d51cc3b95abb/redesign_01_spotlight_active.png' });

  // 2. Scroll to Section 1: Think clearly
  const sec1 = await page.$('#home');
  if (sec1) {
    await sec1.scrollIntoViewIfNeeded();
    await page.waitForTimeout(1800); // wait for WAAPI entrance
    await page.screenshot({ path: '/home/maahir/.gemini/antigravity/brain/d911e133-e1dc-44a4-ab84-d51cc3b95abb/redesign_02_think_clearly.png' });
  }

  // 3. Scroll to Section 2: Features
  const sec2 = await page.$('#features');
  if (sec2) {
    await sec2.scrollIntoViewIfNeeded();
    await page.waitForTimeout(1800); // wait for WAAPI entrance
    await page.screenshot({ path: '/home/maahir/.gemini/antigravity/brain/d911e133-e1dc-44a4-ab84-d51cc3b95abb/redesign_03_features_reasoning.png' });
  }

  // 4. Scroll to Shipcraft CTA
  const secShip = await page.$('#shipcraft');
  if (secShip) {
    await secShip.scrollIntoViewIfNeeded();
    await page.waitForTimeout(500);
    await page.screenshot({ path: '/home/maahir/.gemini/antigravity/brain/d911e133-e1dc-44a4-ab84-d51cc3b95abb/redesign_04_shipcraft_cta.png' });
  }

  // 5. Scroll to Shipcraft Footer
  const secFoot = await page.$('#footer');
  if (secFoot) {
    await secFoot.scrollIntoViewIfNeeded();
    await page.waitForTimeout(500);
    await page.screenshot({ path: '/home/maahir/.gemini/antigravity/brain/d911e133-e1dc-44a4-ab84-d51cc3b95abb/redesign_05_shipcraft_footer.png' });
  }

  // 6. Mobile View (390x844)
  const mobilePage = await browser.newPage({ viewport: { width: 390, height: 844 } });
  await mobilePage.goto('http://localhost:8000/', { waitUntil: 'networkidle' });
  await mobilePage.waitForTimeout(500);
  await mobilePage.screenshot({ path: '/home/maahir/.gemini/antigravity/brain/d911e133-e1dc-44a4-ab84-d51cc3b95abb/redesign_06_mobile_lithos.png' });

  const mSec1 = await mobilePage.$('#home');
  if (mSec1) {
    await mSec1.scrollIntoViewIfNeeded();
    await mobilePage.waitForTimeout(1000);
    await mobilePage.screenshot({ path: '/home/maahir/.gemini/antigravity/brain/d911e133-e1dc-44a4-ab84-d51cc3b95abb/redesign_07_mobile_think_clearly.png' });
  }

  await browser.close();
  console.log('All redesign verification screenshots captured successfully!');
})();
