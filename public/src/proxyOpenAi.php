<?php

// Definir o tipo de conteúdo para JSON
header('Content-Type: application/json');

// Incluir o autoload do Composer
require_once __DIR__ . '/../../vendor/autoload.php';


use Dotenv\Dotenv;

// Carrega as variáveis de ambiente
$dotenv = Dotenv::createImmutable(__DIR__ . '/../../config'); // Ajuste para a raiz do projeto
$dotenv->load();

// Importação da chave da API da OpenAI
$apiKey = $_ENV['OPENAI_API_KEY'];

// Verifica se a chave da API está definida
if (!$apiKey) {
    http_response_code(500);
    echo json_encode(['error' => 'Chave da API da OpenAI não definida.']);
    exit;
}

// Configuração dos headers
$headers = [
    'Content-Type: application/json',
    "Authorization: Bearer $apiKey"
];

// Captura o corpo da requisição enviada pelo frontend
$data = file_get_contents('php://input');

// Valida o JSON recebido
if (json_last_error() !== JSON_ERROR_NONE) {
    http_response_code(400);
    echo json_encode(['error' => 'JSON inválido na requisição.']);
    exit;
}

// Inicializa o cURL
$ch = curl_init('https://api.openai.com/v1/chat/completions');
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);
curl_setopt($ch, CURLOPT_POST, true);
curl_setopt($ch, CURLOPT_POSTFIELDS, $data);

// Executa a requisição e captura a resposta
$response = curl_exec($ch);
$httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);

// Verifica se houve erro no cURL
if (curl_errno($ch)) {
    $error_msg = curl_error($ch);
    http_response_code(500);
    echo json_encode(['error' => 'cURL Error: ' . $error_msg]);
    curl_close($ch);
    exit;
}

curl_close($ch);

// Verifica o código de status HTTP da resposta da API OpenAI
if ($httpCode !== 200) {
    // Retorna a resposta da API OpenAI, que pode conter detalhes do erro
    http_response_code($httpCode);
    echo $response;
    exit;
}

// Assegura que a resposta da API OpenAI está no formato JSON
$decodedResponse = json_decode($response, true);

if (json_last_error() !== JSON_ERROR_NONE) {
    http_response_code(500);
    echo json_encode(['error' => 'Resposta da API OpenAI não é um JSON válido.']);
    exit;
}

// Retorna a resposta JSON da API OpenAI para o frontend
echo json_encode($decodedResponse);
?>
