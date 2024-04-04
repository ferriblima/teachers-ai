<?php

// Substitua pela sua chave de API da OpenAI
$apiKey = '';

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
