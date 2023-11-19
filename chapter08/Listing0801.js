// converts an array to an HTML unordered list
function makeUnorderedList(array) {
  let listItems = array.map((element) => {
    return `<li>${element}</li>`;
  });
  return `<ul>${listItems.join('')}</ul>`;
}
