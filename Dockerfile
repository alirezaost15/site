FROM php:8.3-cli-alpine

WORKDIR /app

COPY . /app

EXPOSE 8080

# PHP بیلتاین برای فایلهای استاتیک + اجرای api/ — به صورت روتِر که api/data محفوظ بماند
CMD ["sh", "-c", "php -S 0.0.0.0:${PORT:-8080} /app/router.php"]
