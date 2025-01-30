<?php

// Set content type to JSON
header('Content-Type: application/json');

// Include Composer autoload
require_once __DIR__ . '/../../vendor/autoload.php';

use Dotenv\Dotenv;

// Load environment variables
$dotenv = Dotenv::createImmutable(__DIR__ . '/../../config');
$dotenv->load();

// Retrieve the OpenAI API key
$apiKey = $_ENV['OPENAI_API_KEY'];

// Verify that the API key is defined
if (!$apiKey) {
    http_response_code(500);
    echo json_encode(['error' => 'OpenAI API key is not defined.']);
    exit;
}

// Configure the headers
$headers = [
    'Content-Type: application/json',
    "Authorization: Bearer $apiKey"
];

// Capture the request body sent by the frontend
$data = file_get_contents('php://input');

// Validate the received JSON
if (json_last_error() !== JSON_ERROR_NONE) {
    http_response_code(400);
    echo json_encode(['error' => 'Invalid JSON in the request.']);
    exit;
}

// Initialize cURL
$ch = curl_init('https://api.openai.com/v1/chat/completions');
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);
curl_setopt($ch, CURLOPT_POST, true);
curl_setopt($ch, CURLOPT_POSTFIELDS, $data);

// Execute the request and capture the response
$response = curl_exec($ch);
$httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);

// Check for cURL errors
if (curl_errno($ch)) {
    $error_msg = curl_error($ch);
    http_response_code(500);
    echo json_encode(['error' => 'cURL Error: ' . $error_msg]);
    curl_close($ch);
    exit;
}

curl_close($ch);

// Check the HTTP status code of the OpenAI API response
if ($httpCode !== 200) {
    // Return the OpenAI API response, which may contain error details
    http_response_code($httpCode);
    echo $response;
    exit;
}

// Ensure the OpenAI API response is in JSON format
$decodedResponse = json_decode($response, true);

if (json_last_error() !== JSON_ERROR_NONE) {
    http_response_code(500);
    echo json_encode(['error' => 'The OpenAI API response is not a valid JSON.']);
    exit;
}

// Return the OpenAI API response as JSON to the frontend
echo json_encode($decodedResponse);
?>
