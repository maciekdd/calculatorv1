FROM php:8.3-apache

COPY . /var/www/html

RUN chmod 666 /var/www/html/calculations.csv
RUN chown -R www-data:www-data /var/www/html


EXPOSE 80
