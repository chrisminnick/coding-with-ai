# converts an array to an HTML unordered list
def makeUnorderedList(array):
    listItems = map(lambda element: f'<li>{element}</li>', array)
    return f'<ul>{"".join(listItems)}</ul>'
