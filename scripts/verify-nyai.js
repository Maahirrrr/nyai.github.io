const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });

  // 1. Clear localStorage so default conversations reload cleanly
  await page.goto('http://localhost:8000/#chat', { waitUntil: 'networkidle' });
  await page.evaluate(() => {
    localStorage.removeItem('nyai_convs');
    location.reload();
  });
  await page.waitForTimeout(1000);

  // 2. Chat View screenshot
  await page.screenshot({ path: '/home/maahir/.gemini/antigravity/brain/d911e133-e1dc-44a4-ab84-d51cc3b95abb/nyai_new_chat_1440.png' });

  // 3. Sidebar Crop
  const sidebar = await page.$('.chat-sidebar');
  if (sidebar) {
    await sidebar.screenshot({ path: '/home/maahir/.gemini/antigravity/brain/d911e133-e1dc-44a4-ab84-d51cc3b95abb/nyai_new_sidebar_crop.png' });
  }

  // 4. Home View screenshot
  await page.goto('http://localhost:8000/#home', { waitUntil: 'networkidle' });
  await page.waitForTimeout(500);
  await page.screenshot({ path: '/home/maahir/.gemini/antigravity/brain/d911e133-e1dc-44a4-ab84-d51cc3b95abb/nyai_new_home_1440.png' });

  // 5. Pricing View screenshot
  await page.goto('http://localhost:8000/#pricing', { waitUntil: 'networkidle' });
  await page.waitForTimeout(500);
  await page.screenshot({ path: '/home/maahir/.gemini/antigravity/brain/d911e133-e1dc-44a4-ab84-d51cc3b95abb/nyai_new_pricing_1440.png' });

  // 6. Mobile Chat View (390x844)
  const mobilePage = await browser.newPage({ viewport: { width: 390, height: 844 } });
  await mobilePage.goto('http://localhost:8000/#chat', { waitUntil: 'networkidle' });
  await mobilePage.waitForTimeout(500);
  await mobilePage.screenshot({ path: '/home/maahir/.gemini/antigravity/brain/d911e133-e1dc-44a4-ab84-d51cc3b95abb/nyai_new_chat_mobile.png' });

  // Open mobile drawer
  await mobilePage.click('.chat-menu-btn');
  await mobilePage.waitForTimeout(400);
  await mobilePage.screenshot({ path: '/home/maahir/.gemini/antigravity/brain/d911e133-e1dc-44a4-ab84-d51cc3b95abb/nyai_new_chat_mobile_drawer.png' });

  await browser.close();
  console.log('All verification screenshots captured successfully!');
})();
