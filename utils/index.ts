export function formatNumber(num: number): string {
  return new Intl.NumberFormat('fa-IR').format(num);
}