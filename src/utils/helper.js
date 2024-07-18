export const extractTimezoneText = (timezone) => {
  let end = 0;
  for (let i = 0; i < timezone.length; i++) {
    if (timezone[i] === " ") {
      end = i;
      break;
    }
  }
  return timezone.slice(0, end + 1);
};
