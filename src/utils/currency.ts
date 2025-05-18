/**
 * Format number to Indonesian Rupiah.
 *
 * @param {number} num
 * @return {string}
 */
export const formatRupiah = (num: number): string => {
  if (isNaN(num)) return 'Rp0';

  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
  }).format(num);
};
