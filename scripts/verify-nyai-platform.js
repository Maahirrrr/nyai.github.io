const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });

  // 1. Hero
  await page.goto('http://localhost:8000/#home', { waitUntil: 'networkidle' });
  await page.waitForTimeout(2000); // Allow WAAPI entrance to finish
  await page.screenshot({ path: '/home/maahir/.gemini/antigravity/brain/d911e133-e1dc-44a4-ab84-d51cc3b95abb/nyai_platform_01_hero.png' });

  // 2. Features / Live Reasoning
  const sec2 = await page.$('#features');
  if (sec2) {
    await sec2.scrollIntoViewIfNeeded();
    await page.waitForTimeout(1600);
    await page.screenshot({ path: '/home/maahir/.gemini/antigravity/brain/d911e133-e1dc-44a4-ab84-d51cc3b95abb/nyai_platform_02_reasoning.png' });
  }

  // 3. Platform & Footer
  const sec3 = await page.$('#platform');
  if (sec3) {
    await sec3.scrollIntoViewIfNeeded();
    await page.waitForTimeout(800);
    await page.screenshot({ path: '/home/maahir/.gemini/antigravity/brain/d911e133-e1dc-44a4-ab84-d51cc3b95abb/nyai_platform_03_enterprise_footer.png' });
  }

  // 4. Chat Assistant View (#chat)
  await page.goto('http://localhost:8000/#chat', { waitUntil: 'networkidle' });
  await page.waitForTimeout(1000);
  await page.screenshot({ path: '/home/maahir/.gemini/antigravity/brain/d911e133-e1dc-44a4-ab84-d51cc3b95abb/nyai_platform_04_chat_view.png' });

  // 5. Mobile View (390x844)
  const mobile = await browser.newPage({ viewport: { width: 390, height: 844 } });
  await mobile.goto('http://localhost:8000/#home', { waitUntil: 'networkidle' });
  await mobile.waitForTimeout(2000);
  await mobile.screenshot({ path: '/home/maahir/.gemini/antigravity/brain/d911e133-e1dc-44a4-ab84-d51cc3b95abb/nyai_platform_05_mobile_hero.png' });

  await browser.close();
  console.log('NyAI Platform verification screenshots captured successfully!');
})();
