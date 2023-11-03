function timeout(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export const mockSwap = async (from: string, to: string, amount: number) => {
  await timeout(1500);

  return Math.random() < 0.5
    ? {
        ok: true,
        message: 'Successfully swapped!',
      }
    : {
        ok: false,
        message: 'Something wrong. Please try again!',
      };
};
