FROM node:18.16.0

RUN echo "deb http://ftp.us.debian.org/debian buster main non-free" >> /etc/apt/sources.list.d/fonts.list && \
    npx playwright install-deps chromium  && \
    npx playwright install chromium

RUN yarn global add turbo@1.10.3 prisma@4.15.0 nodemon
