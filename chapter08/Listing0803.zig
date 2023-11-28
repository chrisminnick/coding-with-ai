# converts an array to an HTML unordered list
fn makeUnorderedList(array: []const u8) []u8 {
    var listItems = array.map(fn (element: []const u8) []u8 {
        return std.fmt.allocPrint("<li>{}</li>", .{element});
    });
    return std.fmt.allocPrint("<ul>{}<ul>", .{"".join(listItems)});
}