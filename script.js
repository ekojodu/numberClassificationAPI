const express = require('express');
const axios = require('axios');
const cors = require('cors'); // Import CORS middleware

const app = express();
app.use(cors()); // Enable CORS

const port = process.env.PORT || 3000;

const isPrime = (num) => {
	if (num <= 1) return false;
	for (let i = 2; i <= Math.sqrt(num); i++) {
		if (num % i === 0) return false;
	}
	return true;
};

const isPerfect = (num) => {
	let sum = 0;
	for (let i = 1; i <= num / 2; i++) {
		if (num % i === 0) sum += i;
	}
	return sum === num;
};

const isArmstrong = (num) => {
	const digits = num.toString().split('');
	const sum = digits.reduce(
		(acc, digit) => acc + Math.pow(Number(digit), digits.length),
		0
	);
	return sum === num;
};

const digitSum = (num) =>
	num
		.toString()
		.split('')
		.reduce((acc, digit) => acc + Number(digit), 0);

app.get('/api/classify-number', async (req, res) => {
	const { number } = req.query;

	if (!number || isNaN(number) || !Number.isInteger(Number(number))) {
		return res.status(400).json({ number: 'invalid_input', error: true });
	}

	const num = Number(number);
	const properties = [];

	if (isArmstrong(num)) properties.push('armstrong');
	properties.push(num % 2 === 0 ? 'even' : 'odd');

	const prime = isPrime(num);
	const perfect = isPerfect(num);
	const sum = digitSum(num);

	try {
		const response = await axios.get(`http://numbersapi.com/${num}?json`);
		const funFact = response.data.text;

		res.status(200).json({
			number: num,
			is_prime: prime,
			is_perfect: perfect,
			properties: properties,
			digit_sum: sum,
			fun_fact: funFact,
		});
	} catch (error) {
		res.status(500).json({ error: 'Error fetching fun fact from Numbers API' });
	}
});

app.listen(port, () => {
	console.log(`Server is running on http://localhost:${port}`);
});
