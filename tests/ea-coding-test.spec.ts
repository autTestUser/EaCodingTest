import { expect, test } from '@playwright/test';

test('has title', async ({ page }) => {
  await page.goto('http://localhost:4200/festivals');

  // Expect title to be 'EaCodingTest'
  await expect(page).toHaveTitle(/EaCodingTest/);
});

test('festival data should be visible', async ({ page }) => {
  await page.goto('http://localhost:4200/festivals', { waitUntil: 'domcontentloaded' });
  const ele = page.locator('body app-root app-festivals');
  const errorMessage = 'Music festival data should be visible';

  // expect festival data to be visible
  await expect(ele, errorMessage).toBeVisible({ timeout: 8000 });
});

test('festival data should not be empty', async ({ page }) => {
  await page.goto('http://localhost:4200/festivals', { waitUntil: 'domcontentloaded' });
  const ele = page.locator('body app-root app-festivals');
  const errorMessage = 'Music festival data should not be empty';

  // wait for festival data to be visible
  await ele.waitFor({
    state: 'visible',
    timeout: 8000,
  });

  // expect festival data to not be empty
  await expect(ele, errorMessage).not.toBeEmpty({ timeout: 8000 });
});

test('music festival data should be in json format', async ({ page }) => {
  await page.goto('http://localhost:4200/festivals', { waitUntil: 'domcontentloaded' });
  const ele = page.locator('body app-root app-festivals');
  const errorMessage = 'Music festival data is not in json format';

  // wait for festival data to be visible
  await ele.waitFor({
    state: 'visible',
    timeout: 8000,
  });

  const musicData = await ele.textContent();
  if (musicData === null) {
    throw new Error('Music festival data is null');
  }
  console.log("Music festival data: ");
  console.log(musicData);

  try {
    JSON.parse(musicData.toString());
    console.log("The data is in JSON format.");
  } catch (e) {
    throw new Error(errorMessage);
  }
});

test('music festival data should have properties', async ({ page }) => {
  await page.goto('http://localhost:4200/festivals', { waitUntil: 'domcontentloaded' });
  const ele = page.locator('body app-root app-festivals');

  // wait for festival data to be visible
  await ele.waitFor({
    state: 'visible',
    timeout: 8000,
  });

  const musicData = await ele.textContent();
  if (musicData === null) {
    throw new Error('Music festival data is null');
  }
  console.log("Music festival data: ");
  console.log(musicData);

  const jsonData = JSON.parse(musicData.toString());

  // Verify the structure of jsonData
  expect(Array.isArray(jsonData)).toBe(true);
  jsonData.forEach(festival => {
    expect(festival).toHaveProperty('name');
    expect(festival).toHaveProperty('bands');
    expect(Array.isArray(festival.bands)).toBe(true);
    festival.bands.forEach(band => {
      expect(band).toHaveProperty('name');
      expect(band).toHaveProperty('recordLabel');
    });
  });
});

test('music festival data properties should have string values', async ({ page }) => {
  await page.goto('http://localhost:4200/festivals', { waitUntil: 'domcontentloaded' });
  const ele = page.locator('body app-root app-festivals');

  // wait for festival data to be visible
  await ele.waitFor({
    state: 'visible',
    timeout: 8000,
  });

  const musicData = await ele.textContent();
  if (musicData === null) {
    throw new Error('Music festival data is null');
  }
  console.log("Music festival data: ");
  console.log(musicData);

  const jsonData = JSON.parse(musicData.toString());

  // Verify the data type of jsonData properties
  expect(Array.isArray(jsonData)).toBe(true);
  jsonData.forEach(festival => {
    expect(typeof festival.name).toBe('string');
    expect(Array.isArray(festival.bands)).toBe(true);
    festival.bands.forEach(band => {
      expect(typeof band.name).toBe('string');
      expect(typeof band.recordLabel).toBe('string');
    });
  });
});

test('music festival data properties should not have empty string', async ({ page }) => {
  await page.goto('http://localhost:4200/festivals', { waitUntil: 'domcontentloaded' });
  const ele = page.locator('body app-root app-festivals');

  // wait for festival data to be visible
  await ele.waitFor({
    state: 'visible',
    timeout: 8000,
  });

  const musicData = await ele.textContent();
  if (musicData === null) {
    throw new Error('Music festival data is null');
  }
  console.log("Music festival data: ");
  console.log(musicData);

  const jsonData = JSON.parse(musicData.toString());

  // Verify the jsonData properties to not have empty string values 
  expect(Array.isArray(jsonData)).toBe(true);
  jsonData.forEach(festival => {
    expect(festival.name).not.toBe('');
    expect(Array.isArray(festival.bands)).toBe(true);
    festival.bands.forEach(band => {
      expect(band.name).not.toBe('');
      expect(band.recordLabel).not.toBe('');
    });
  });
});