export function getDate() {
  const monthNames = [
    'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
    'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec',
  ];
  const date = new Date();
  const mon = date.getMonth();
  const day = date.getDay();
  const year = date.getFullYear();
  return `${monthNames[mon]} ${day}, ${year}`;
}
