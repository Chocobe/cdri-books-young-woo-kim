const toKRW = (price: number) => {
  return price.toLocaleString('ko-KR', { currency: 'KRW' });
};

export default toKRW;
