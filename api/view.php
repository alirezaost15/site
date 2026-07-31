<?php
/**
 * 🍓 مشاهده‌ی پاسخ‌های سرور
 * فراخوانی: GET api/view.php?key=رمز
 */
require __DIR__ . '/config.php';

header('Content-Type: application/json; charset=utf-8');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') { http_response_code(204); exit; }

if (($_GET['key'] ?? '') !== $API_KEY) {
  http_response_code(403);
  echo json_encode(['ok' => false, 'error' => 'unauthorized']);
  exit;
}

$FILE = __DIR__ . '/data/answers.json';
if (!file_exists($FILE)) {
  echo json_encode(['ok' => true, 'answers' => []], JSON_UNESCAPED_UNICODE);
  exit;
}

$list = json_decode(file_get_contents($FILE), true);
if (!is_array($list)) { $list = []; }

echo json_encode(['ok' => true, 'answers' => $list], JSON_UNESCAPED_UNICODE);
