<?php

// Cria a instância do Dotenv apontando para o diretório onde o seu arquivo .env está localizado e então carregam as variáveis de ambiente definidas nele
// Idealmente este arquivo deve ser criado em um index.php ou em algum tipo de arquivo de configuração que é incluído em todos os scripts.
require_once __DIR__ . '/vendor/autoload.php';
$dotenv = Dotenv\Dotenv::createImmutable(__DIR__); // createImmutable cria uma instância que previne a sobrescrita de variáveis de ambiente já existentes
$dotenv->load();

// Importação da chave da api da open ai
$apiKey = $_ENV['OPENAI_API_KEY'];

// O header de Content-Type para JSON
$headers = [
    'Content-Type: application/json',
    "Authorization: Bearer $apiKey"
];

// Captura o corpo da requisição enviada pelo frontend
$data = file_get_contents('php://input');

// Configuração do curl para a requisição à API da OpenAI
$ch = curl_init('https://api.openai.com/v1/chat/completions');
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);
curl_setopt($ch, CURLOPT_POST, true);
curl_setopt($ch, CURLOPT_POSTFIELDS, $data);

// Executa a requisição e captura a resposta
$response = curl_exec($ch);
curl_close($ch);

// Retorna a resposta para o frontend
echo $response;
