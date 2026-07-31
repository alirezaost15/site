<?php
/**
 * 🍓 ذخیره‌سازی پاسخ‌ها روی سرور
 * از script.js فراخوانی می‌شود: POST { key, answers: [...] }
 */
require __DIR__ . '/config.php';

// امن برای هر هاستی — بعضی‌ها mbstring ندارن
if (!function_exists('mb_substr')) {
  function mb_substr($str, $start, $len) { return substr($str, $start, $len); }
}

header('Content-Type: application/json; charset=utf-8');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') { http_response_code(204); exit; }

$FILE = __DIR__ . '/data/answers.json';
$MAX_RECORDS = 5000;
$MAX_JSON_SIZE = 5 * 1024 * 1024; // 5MB

if ($_SERVER['REQUEST_METHOD'] !== 'POST') { http_response_code(405); exit; }

$raw = file_get_contents('php://input');
if (strncmp($raw, "\xEF\xBB\xBF", 3) === 0) { $raw = substr($raw, 3); } // حذف BOM احتمالی
$input = json_decode($raw, true);

// بررسی رمز و ساختار ورودی
if (!is_array($input) || ($input['key'] ?? '') !== $API_KEY || !isset($input['answers']) || !is_array($input['answers'])) {
  http_response_code(403);
  echo json_encode(['ok' => false, 'error' => 'invalid request']);
  exit;
}

// ساخت پوشه‌ی data اگر وجود نداشته باشد
if (!is_dir(__DIR__ . '/data')) { @mkdir(__DIR__ . '/data', 0755, true); }
if (!file_exists($FILE)) { file_put_contents($FILE, '[]'); }

if (filesize($FILE) > $MAX_JSON_SIZE) {
  http_response_code(413);
  echo json_encode(['ok' => false, 'error' => 'storage full']);
  exit;
}

$list = json_decode(file_get_contents($FILE), true);
if (!is_array($list)) { $list = []; }

foreach ($input['answers'] as $a) {
  if (!is_array($a)) { continue; }
  $list[] = [
    'question' => mb_substr((string)($a['question'] ?? ''), 0, 300),
    'answer'   => mb_substr((string)($a['answer'] ?? ''), 0, 2000),
    'date'     => mb_substr((string)($a['date'] ?? ''), 0, 120),
    'time'     => mb_substr((string)($a['time'] ?? ''), 0, 120),
    'ts'       => mb_substr((string)($a['ts'] ?? ''), 0, 40),
  ];
}

// نگه‌داشتن فقط آخرین رکوردها
$list = array_slice($list, -$MAX_RECORDS);

file_put_contents($FILE, json_encode($list, JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT), LOCK_EX);

echo json_encode(['ok' => true, 'total' => count($list)]);
