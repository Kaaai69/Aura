const { chromium, devices } = require('playwright');
const path = require('path');

const targetUrl = 'https://aura-landing-zeta-tan.vercel.app';
const outputDir = '/Users/a1111/.gemini/antigravity/brain/fd70d92d-9e34-45a3-ad6b-e6ab26d055e2';

async function run() {
  console.log('Launching browser...');
  const browser = await chromium.launch({ headless: true });

  try {
    // 1. Desktop Viewport
    console.log('Setting up desktop viewport...');
    const desktopPage = await browser.newPage({
      viewport: { width: 1440, height: 900 },
      deviceScaleFactor: 2,
    });
    console.log(`Navigating to ${targetUrl}...`);
    await desktopPage.goto(targetUrl, { waitUntil: 'networkidle' });
    
    // Wait for fade-in animations to complete
    await desktopPage.waitForTimeout(1000);
    
    console.log('Taking full page desktop screenshot...');
    await desktopPage.screenshot({
      path: path.join(outputDir, 'desktop_full.png'),
      fullPage: true,
    });
    await desktopPage.close();

    // 2. Mobile Viewport (iPhone 12 / 13)
    console.log('Setting up mobile viewport...');
    const iPhone = devices['iPhone 12'];
    const mobilePage = await browser.newPage({
      ...iPhone,
      deviceScaleFactor: 2,
    });
    
    console.log(`Navigating to ${targetUrl} (Mobile)...`);
    await mobilePage.goto(targetUrl, { waitUntil: 'networkidle' });
    await mobilePage.waitForTimeout(1000);
    
    console.log('Taking full page mobile screenshot...');
    await mobilePage.screenshot({
      path: path.join(outputDir, 'mobile_full.png'),
      fullPage: true,
    });
    await mobilePage.close();

    console.log('Screenshots taken successfully!');
  } catch (error) {
    console.error('Error during screenshot generation:', error);
  } finally {
    await browser.close();
  }
}

run();
