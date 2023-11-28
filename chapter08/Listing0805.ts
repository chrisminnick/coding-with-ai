converts an array to an HTML unordered list
function makeUnorderedList(array: string[]): string {
  let listItems: string[] = array.map((element) => {
    return `<li>${element}</li>`;
  });
  return `<ul>${listItems.join('')}</ul>`;
}