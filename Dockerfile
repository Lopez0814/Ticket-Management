# Production image for Railway: nginx + PHP-FPM, Composer deps, Vite build.
FROM serversideup/php:8.3-fpm-nginx

USER root
RUN apt-get update \
 && apt-get install -y --no-install-recommends curl ca-certificates \
 && curl -fsSL https://deb.nodesource.com/setup_20.x | bash - \
 && apt-get install -y --no-install-recommends nodejs \
 && rm -rf /var/lib/apt/lists/*

WORKDIR /var/www/html
COPY --chown=www-data:www-data . .
USER www-data

RUN composer install --no-dev --optimize-autoloader --no-interaction --no-scripts \
 && npm ci \
 && npm run build \
 && rm -rf node_modules

# Runs on every container start: php artisan migrate --force, storage:link, config/route/view cache
ENV AUTORUN_ENABLED=true \
    AUTORUN_LARAVEL_MIGRATION=true \
    AUTORUN_LARAVEL_STORAGE_LINK=true \
    PHP_OPCACHE_ENABLE=1
