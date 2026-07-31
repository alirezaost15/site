<?php
/**
 * 🍓 پاک‌کردن همه‌ی پاسخ‌های سرور
 * فراخوانی: POST { key: رمز }
 */
require __DIR__ . '/config.php';

header('Content-Type: application/json; charset=utf-8');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') { http_response_code(204); exit; }

if ($_SERVER['REQUEST_METHOD'] !== 'POST') { http_response_code(405); exit; }

$input = json_decode(file_get_contents('php://input'), true);
if (!is_array($input) || ($input['key'] ?? '') !== $API_KEY) {
  http_response_code(403);
  echo json_encode(['ok' => false, 'error' => 'unauthorized']);
  exit;
}

$FILE = __DIR__ . '/data/answers.json';
file_put_contents($FILE, '[]', LOCK_EX);

echo json_encode(['ok' => true]);
