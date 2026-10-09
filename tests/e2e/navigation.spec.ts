import { expect, test } from '@playwright/test';

test('switches between four primary menus', async ({ page }) => {
  await page.goto('/');
  await expect(page.getByRole('heading', { name: '게임장' })).toBeVisible();

  for (const label of ['알바', '뽑기', '도감', '게임장']) {
    await page.getByRole('navigation').getByRole('button', { name: label }).last().click();
    await expect(page.getByRole('heading', { name: label, exact: true })).toBeVisible();
  }
});

test('game categories filter without opening unfinished games', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('button', { name: '주사위', exact: true }).click();
  await expect(page.getByText('주사위 홀짝')).toBeVisible();
  await expect(page.getByText('하이로우')).toHaveCount(0);
});

test('never overflows horizontally on a 320px screen', async ({ page }) => {
  await page.setViewportSize({ width: 320, height: 568 });
  await page.goto('/');
  const hasHorizontalOverflow = await page.evaluate(
    () => document.documentElement.scrollWidth > window.innerWidth,
  );
  expect(hasHorizontalOverflow).toBe(false);
});
