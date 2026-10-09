import { expect, test } from '@playwright/test';

test('dice preview reacts to a choice without changing wallet balance', async ({ page }) => {
  await page.goto('/');
  await expect(page.getByLabel('보유 코인 600 C')).toBeVisible();
  await page.getByRole('button', { name: '주사위 홀짝 화면 체험' }).click();
  await expect(page.getByRole('heading', { name: '주사위 홀짝' })).toBeVisible();
  await expect(page.getByText('실제 코인은 차감되거나 지급되지 않습니다.')).toBeVisible();
  await page.getByRole('button', { name: '홀수 선택' }).click();
  await expect(page.getByRole('status')).toContainText(/예측 적중|예측 실패/);
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
  await expect(page.getByRole('status')).toContainText(/예측 적중|예측 실패|동률/);
});

test('claw control prototype moves without paying coins', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('navigation').getByRole('button', { name: '뽑기' }).click();
  await page.getByRole('button', { name: '조작 체험' }).click();
  await page.getByRole('button', { name: '집게 오른쪽 이동' }).click();
  await expect(page.getByText('집게 위치 60%')).toBeVisible();
  await page.getByRole('button', { name: '집게 내리기' }).click();
  await expect(page.getByText(/획득 판정 미구현/)).toBeVisible();
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
