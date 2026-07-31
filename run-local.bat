@echo off
REM 🍓 اجرای لوکال با PHP — برای تست کامل ذخیره‌سازی روی سرور
REM آدرس: http://localhost:8000
cd /d "%~dp0"
start "" "http://localhost:8000"
"C:\php\php.exe" -S localhost:8000
pause
