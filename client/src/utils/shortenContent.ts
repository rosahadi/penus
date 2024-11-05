const shortenContent = (content: string, maxLength: number = 130): string => {
  const firstTagEndIndex = content.indexOf('</');

  const sliceIndex =
    firstTagEndIndex !== -1 ? Math.min(firstTagEndIndex, maxLength) : maxLength;

  if (content.length > sliceIndex) {
    return content.slice(0, sliceIndex) + '...';
  }

  return content;
};

export default shortenContent;
