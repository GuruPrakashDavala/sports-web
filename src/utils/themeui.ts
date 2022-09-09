export const themeUIArray = <T>(arr: T[], bp: number): T => {
  return bp < arr.length ? arr[bp] : arr[arr.length - 1];
};
