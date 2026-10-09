import { expect, test } from '@playwright/test';

test('dice preview reacts to a choice without changing wallet balance', async ({ page }) => {
  await page.goto('/');
  await expect(page.getByLabel('보유 코인 600 C')).toBeVisible();
  await page.getByRole('button', { name: '주사위 홀짝 화면 체험' }).click();
  await expect(page.getByRole('heading', { name: '주사위 홀짝' })).toBeVisible();
  await expect(page.getByText('실제 코인은 차감되거나 지급되지 않습니다.')).toBeVisible();
  await page.getByRole('button', { name: '홀수 선택' }).click();
  await expect(page.getByRole('status', { name: '게임 결과' })).toContainText(/예측 적중|예측 실패/);
  await expect(page.getByLabel('보유 코인 600 C')).toBeVisible();
  await page.getByRole('button', { name: '다시 체험하기' }).click();
  await expect(page.getByRole('button', { name: '짝수 선택' })).toBeEnabled();
  await page.getByRole('button', { name: '목록' }).click();
  await expect(page.getByRole('heading', { name: '게임장' })).toBeVisible();
});

test('highlow preview shows cards and can reveal the result', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('button', { name: '하이로우 화면 체험' }).click();
  await expect(page.getByRole('heading', { name: '하이로우' })).toBeVisible();
  await page.getByRole('button', { name: '▲ 높음' }).click();
  await expect(page.getByRole('status', { name: '게임 결과' })).toContainText(/예측 적중|예측 실패|동률/);
});

test('draw only shows merchandise gacha and changes series without spending coins', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('navigation').getByRole('button', { name: '뽑기' }).last().click();
  await expect(page.getByRole('heading', { name: '굿즈 가챠' })).toBeVisible();
  await expect(page.getByRole('heading', { name: '인형뽑기' })).toHaveCount(0);
  await page.getByRole('button', { name: '시리즈 B' }).click();
  await expect(page.getByRole('button', { name: '시리즈 B' })).toHaveAttribute('aria-pressed', 'true');
  await expect(page.getByRole('button', { name: '가챠 뽑기 · 준비 중' })).toBeDisabled();
  await expect(page.getByLabel('보유 코인 600 C')).toBeVisible();
});

test('mobile game preview gives controls full width, without bottom navigation', async ({ page, isMobile }) => {
  if (!isMobile) return;
  await page.setViewportSize({ width: 320, height: 640 });
  await page.goto('/');
  await page.getByRole('button', { name: '주사위 홀짝 화면 체험' }).click();
  await expect(page.getByRole('navigation', { name: '모바일 주 메뉴' })).toBeHidden();
  await expect(page.getByRole('button', { name: '홀수 선택' })).toBeVisible();
  const overflow = await page.evaluate(() => document.documentElement.scrollWidth > window.innerWidth);
  expect(overflow).toBe(false);
  await page.getByRole('button', { name: '목록' }).click();
  await expect(page.getByRole('navigation', { name: '모바일 주 메뉴' })).toBeVisible();
});
