export default async function run(page) {
  const results = [];
  for (const viewport of [{ width: 1440, height: 900 }, { width: 768, height: 900 }, { width: 375, height: 812 }]) {
    await page.setViewportSize(viewport);
    await page.goto('file:///C:/Users/guhan/OneDrive/Desktop/portfolio/index.html');
    await page.evaluate(() => window.scrollTo(0, document.querySelector('#projects').offsetTop - 75));
    await page.waitForTimeout(250);
    const state = await page.evaluate(() => {
      const grid = document.querySelector('.projects-grid');
      const cards = [...document.querySelectorAll('.project-card')];
      return {
        viewport: { width: innerWidth, height: innerHeight },
        gridColumns: getComputedStyle(grid).gridTemplateColumns,
        projectTop: Math.round(document.querySelector('#projects').getBoundingClientRect().top),
        horizontalOverflow: document.documentElement.scrollWidth > document.documentElement.clientWidth,
        cards: cards.map(card => {
          const rect = card.getBoundingClientRect();
          const image = card.querySelector('img');
          return {
            width: Math.round(rect.width),
            height: Math.round(rect.height),
            visible: getComputedStyle(card).opacity !== '0',
            imageLoaded: image.complete && image.naturalWidth > 0,
            imageRatio: `${image.naturalWidth}x${image.naturalHeight}`,
            title: card.querySelector('h3').innerText
          };
        })
      };
    });
    if (viewport.width < 901) {
      await page.locator('#menuBtn').click();
    }
    await page.locator('.project-card').first().hover();
    results.push({
      ...state,
      menuOpen: viewport.width < 901 ? await page.locator('#navMenu').evaluate(node => getComputedStyle(node).display) : 'not applicable',
      firstCardTransform: await page.locator('.project-card').first().evaluate(node => getComputedStyle(node).transform)
    });
    await page.screenshot({ path: `C:/Users/guhan/AppData/Local/Temp/portfolio-projects-ievdnxj1.u00/projects-${viewport.width}.png` });
  }
  return results;
}