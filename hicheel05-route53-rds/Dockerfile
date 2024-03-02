# Use the official PHP image with Apache
FROM php:7.4-apache

# Install mysqli extension
RUN docker-php-ext-install mysqli

# Copy the application files to the container
COPY . /var/www/html

# Expose port 8080
EXPOSE 8080

# Configure Apache to listen on port 8080 and set ServerName
RUN sed -i 's/80/8080/g' /etc/apache2/ports.conf /etc/apache2/sites-available/000-default.conf && \
    echo "ServerName localhost" >> /etc/apache2/apache2.conf

# Start Apache in the foreground
CMD ["apache2-foreground"]