FROM ubuntu:18.04

ENV TZ 'Asia/Ulaanbaatar'

RUN apt update && \
  apt install -y software-properties-common && \
  add-apt-repository ppa:ondrej/php && \
  apt update -y && \
  echo $TZ > /etc/timezone && \
  apt update && apt install -y tzdata && \
  rm /etc/localtime && \
  ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && \
  dpkg-reconfigure -f noninteractive tzdata && \
  apt clean

RUN apt install -y git \
  vim \
  unzip \
  graphviz \
  aspell \
  ghostscript \
  clamav \
  curl \
  apache2 \
  php7.4 \
  php7.4-mysqli \
  php7.4-json && \
  apt autoremove -y

RUN rm -rf /var/www/html

COPY index.php /var/www/html/

CMD ["/usr/sbin/apache2ctl", "-D", "FOREGROUND"]