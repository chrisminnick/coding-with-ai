// converts an array to an HTML unordered list
function makeUnorderedList(array: any[]) {
  let listItems = array.map(function (element) {
    return `<li>${element}</li>`;
  });
  return `<ul>${listItems.join('')}</ul>`;
}
