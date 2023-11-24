def calculate_average(numbers):
    if not isinstance(numbers, list):
        return "Error: Input should be a list of numbers."
    if len(numbers) == 0:
        return None
    total = 0
    for number in numbers:
        if not isinstance(number, (int, float)):
            raise TypeError("Invalid data type. All values must be numbers.")
        total += number
    average = total / len(numbers)
    return average


print(calculate_average('a'))
