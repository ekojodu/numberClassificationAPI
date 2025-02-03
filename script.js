const express = require('express'); // Importing Express framework
const axios = require('axios'); // Importing Axios to make HTTP requests

const app = express(); // Creating an Express application instance
const port = process.env.PORT || 3000; // Defining the port, using environment variable or defaulting to 3000

// Helper function to check if a number is prime
const isPrime = (num) => {
	if (num <= 1) return false; // A number less than or equal to 1 is not prime
	for (let i = 2; i <= Math.sqrt(num); i++) {
		// Loop through numbers from 2 to the square root of the number
		if (num % i === 0) return false; // If the number is divisible by i, it's not prime
	}
	return true; // If no divisors are found, the number is prime
};

// Helper function to check if a number is perfect
const isPerfect = (num) => {
	let sum = 0; // Initialize sum of divisors
	for (let i = 1; i <= num / 2; i++) {
		// Loop through numbers up to half of the number
		if (num % i === 0) sum += i; // If i is a divisor of num, add it to sum
	}
	return sum === num; // If the sum of divisors equals the number, it's perfect
};

// Helper function to check if a number is Armstrong
const isArmstrong = (num) => {
	const digits = num.toString().split(''); // Convert number to string, then split into individual digits
	const sum = digits.reduce(
		(acc, digit) => acc + Math.pow(Number(digit), digits.length),
		0
	); // Calculate Armstrong sum
	return sum === num; // If the sum equals the number, it's an Armstrong number
};

// Helper function to calculate digit sum
const digitSum = (num) =>
	num
		.toString()
		.split('')
		.reduce((acc, digit) => acc + Number(digit), 0); // Sum all digits of the number

// Endpoint to classify number
app.get('/api/classify-number', async (req, res) => {
	const { number } = req.query; // Get the number query parameter

	if (isNaN(number)) {
		// Check if the input is not a valid number
		return res.status(400).json({ number, error: true }); // Return 400 Bad Request if invalid
	}

	const num = parseInt(number); // Convert number from string to integer

	// Classifying the number
	const properties = []; // Initialize an empty array to hold the number's properties
	if (isArmstrong(num)) properties.push('armstrong'); // If the number is Armstrong, add "armstrong" to properties
	properties.push(num % 2 === 0 ? 'even' : 'odd'); // Add "even" or "odd" based on the number's parity
	const prime = isPrime(num); // Check if the number is prime
	const perfect = isPerfect(num); // Check if the number is perfect
	const sum = digitSum(num); // Calculate the sum of the digits

	// Fetching fun fact from Numbers API
	try {
		const response = await axios.get(`http://numbersapi.com/${num}?json`); // Fetch fun fact from Numbers API
		const funFact = response.data.text; // Extract the fun fact from the response data

		res.status(200).json({
			// Return the JSON response with number classification and fun fact
			number: num,
			is_prime: prime,
			is_perfect: perfect,
			properties: properties,
			digit_sum: sum,
			fun_fact: funFact,
		});
	} catch (error) {
		res.status(500).json({ error: 'Error fetching fun fact from Numbers API' }); // Handle error if the Numbers API fails
	}
});

// Start server
app.listen(port, () => {
	console.log(`Server is running on http://localhost:${port}`); // Start the server and log the URL
});
