Number Classification API 📊
A simple API that classifies numbers based on mathematical properties and provides a fun fact about the number using the Numbers API.

🚀 Features
Determines whether a number is prime or perfect.
Checks if a number is an Armstrong number.
Identifies if a number is even or odd.
Computes the sum of the digits.
Fetches an interesting fun fact about the number.
🔧 Tech Stack
Node.js (JavaScript runtime)
Express.js (Web framework)
Axios (For making external API requests)
Render (For deployment)


Base URL:
https://numberclassificationapi.onrender.com
Example API Call:
GET /api/classify-number?number=371


🔥 Installation & Setup
1️⃣ Clone the Repository
git clone https://github.com/ekojodu/numberClassificationAPI.git
cd numberClassificationAPI
2️⃣ Install Dependencies
npm install
3️⃣ Run Locally
node script.js
Your server will start on:
http://localhost:3000

📌 API Endpoint
1️⃣ Classify a Number
Endpoint:
GET /api/classify-number?number={num}
Query Parameter:
number (Integer) → The number to classify.
Response (200 OK) Example:
{
  "number": 371,
  "is_prime": false,
  "is_perfect": false,
  "properties": ["armstrong", "odd"],
  "digit_sum": 11,
  "fun_fact": "371 is an Armstrong number because 3^3 + 7^3 + 1^3 = 371"
}
Response (400 Bad Request) Example (Invalid Input):
{
  "number": "abc",
  "error": true
}

🛠 Project Structure

📁 numberClassificationAPI
│-- 📄 script.js         # Main server file
│-- 📄 package.json     # Dependencies & scripts
│-- 📄 README.md        # API Documentation
🚀 Deployment
This API is deployed using Render. To deploy manually:

**Push your changes to GitHub:**
git add .
git commit -m "Updated API"
git push origin main
Go to Render Dashboard, select your project, and redeploy.# numberClassificationAPI
