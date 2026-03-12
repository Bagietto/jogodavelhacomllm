import { expect, test } from '@playwright/test';

test('should load and start a new game', async ({ page }) => {
  await page.goto('/');
  await expect(page.getByRole('heading', { name: 'Jogo da Velha com IA' })).toBeVisible();
  await page.getByRole('button', { name: 'Nova partida' }).click();
  await expect(page.getByText('Partida em andamento.')).toBeVisible();
});
