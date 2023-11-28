def calculate_average(numbers):
    total = 0
    for number in numbers:
        if not isinstance(number, (int, float)):
            raise TypeError("Invalid data type. All values must be numbers.")
        total += number
    average = total / len(numbers)
    return average
