function makeUnorderedList(array: string[]) {
  let listItems = array.map((element) => {
    return `<li>${element}</li>`;
  });
  return `<ul>${listItems.join('')}</ul>`;
}
