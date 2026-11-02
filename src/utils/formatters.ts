export const formatPrice = (price: number): string => {
  return new Intl.NumberFormat('en-CA', {
    style: 'currency',
    currency: 'CAD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(price);
};

export const formatPurity = (purity: string | number): string => {
  if (typeof purity === 'number') {
    return `${purity.toFixed(2)}%`;
  }
  return purity.endsWith('%') ? purity : `${purity}%`;
};

export const sanitizeHtml = (html: string): string => {
  return html.replace(/<[^>]*>?/gm, '');
};
