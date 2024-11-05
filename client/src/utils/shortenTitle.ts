function shortenTitle(title: string, maxLength: number): string {
  if (title.length <= maxLength) return title;
  return `${title.slice(0, maxLength)}...`;
}

export default shortenTitle;
