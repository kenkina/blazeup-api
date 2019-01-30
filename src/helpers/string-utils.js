
export const stringToStringArray = (string) => {
  return string
    .trim()
    .substr(1, string.length - 2)
    .split(',')
    .map(e => e.trim()
      .substr(1, e.length - 2)
    );
}

export const stringNumberToNumberArray = (string) => {
  return string
    .trim()
    .substr(1, string.length - 2)
    .split(',')
    .map(e => e.trim()*1);
}
