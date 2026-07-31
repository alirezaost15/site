<?php
/**
 * 🍓 روت‌ر سرور داخلی PHP (برای Railway و اجرای لوکال)
 * - دسترسی مستقیم به api/data را می‌بندد (پاسخ‌ها فقط از طریق API)
 * - بقیه فایل‌های استاتیک را سرو می‌کند
 */
$uri = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);

// محفوظ‌کردن پوشه‌ی داده‌ها — فقط از طریق api/*.php
if (strpos($uri, '/api/data') === 0 || strpos($uri, '/api/data/') === 0 || $uri === '/api/data') {
  http_response_code(403);
  echo 'Forbidden';
  exit;
}

// فایل واقعی وجود دارد؟ بگذار سرور خودش سرو کند
$path = realpath(__DIR__ . $uri);
if ($uri !== '/' && $path !== false && is_file($path)) {
  return false;
}

// اگر پوشه خواسته شد، index.html
if ($uri === '/' || is_dir($path)) {
  $index = $path === false ? __DIR__ . '/index.html' : rtrim($path, '/\\') . '/index.html';
  if (is_file($index)) {
    return false;
  }
}

http_response_code(404);
echo 'Not Found';
