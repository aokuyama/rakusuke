FROM node:18.16.1-bookworm-slim

RUN echo "deb http://ftp.us.debian.org/debian buster main non-free" >> /etc/apt/sources.list.d/fonts.list && \
    npx playwright install-deps chromium && \
    npx playwright install chromium

RUN apt install -y git

RUN npm install -g turbo@1.10.3 prisma@4.15.0 nodemon
