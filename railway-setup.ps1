# 🚀 راه‌اندازی خودکار Railway — لینک پروژه + ساخت Volume
# فقط یک بار اجرا کن. (روی فایل دابل‌کلیک کن یا:  .\railway-setup.ps1)
$ErrorActionPreference = 'Stop'

Write-Host ""
Write-Host "  ==== 🍓 راه‌اندازی Railway ====  " -ForegroundColor Magenta

# ---- 1) نصب Railway CLI (اگه نصب نیست) ----
Write-Host ""
Write-Host "[1/5] بررسی Railway CLI..." -ForegroundColor Cyan
if (Get-Command railway -ErrorAction SilentlyContinue) {
  Write-Host "      نصبه:  railway $((railway --version 2>$null).Trim())" -ForegroundColor Green
} else {
  Write-Host "      نصب از npm..." -ForegroundColor Yellow
  npm install -g @railway/cli
  if (-not $?) { Write-Host "      نصب CLI ناموفق بود ❌" -ForegroundColor Red; exit 1 }
  Write-Host "      Railway CLI نصب شد ✓" -ForegroundColor Green
}

# ---- 2) ورود به حساب (مرورگر باز می‌شود) ----
Write-Host ""
Write-Host "[2/5] ورود به حساب Railway..." -ForegroundColor Cyan
railway login
if (-not $?) { Write-Host "      ورود ناموفق بود ❌" -ForegroundColor Red; exit 1 }
Write-Host "      ورود انجام شد ✓" -ForegroundColor Green

# ---- 3) اتصال به پروژه (با فلش، پروژه‌ات را انتخاب کن) ----
Write-Host ""
Write-Host "[3/5] اتصال به پروژه — از لیست، پروژه‌ات را انتخاب کن..." -ForegroundColor Cyan
railway link
if (-not $?) { Write-Host "      اتصال ناموفق بود ❌" -ForegroundColor Red; exit 1 }
Write-Host "      پروژه لینک شد ✓" -ForegroundColor Green

# ---- 4) ساخت Volume روی /app/api/data (سرویس را انتخاب کن) ----
Write-Host ""
Write-Host "[4/5] ساخت Volume — سرویس سایتت را انتخاب کن..." -ForegroundColor Cyan
railway volume add -m /app/api/data
if (-not $?) { Write-Host "      ساخت Volume ناموفق بود ❌" -ForegroundColor Red; exit 1 }
Write-Host "      Volume ساخته و وصل شد ✓" -ForegroundColor Green

# ---- 5) دیپلوی دوباره برای اعمال ولوم ----
Write-Host ""
Write-Host "[5/5] دیپلوی دوباره..." -ForegroundColor Cyan
railway redeploy
if (-not $?) { Write-Host "      دیپلوی با خطا مواجه شد — خودت از دشبورد Deploy بزن" -ForegroundColor Yellow }

Write-Host ""
Write-Host "  ==== ✅ تمام شد! ====  " -ForegroundColor Green
Write-Host "  تست کن:  https://سرویست.railway.app/api/view.php?key=love-2026-strawberry-secret"
Write-Host ""
