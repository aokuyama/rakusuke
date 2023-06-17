FROM node:16.19.1

RUN echo "deb http://ftp.us.debian.org/debian buster main non-free" >> /etc/apt/sources.list.d/fonts.list && \
    npx playwright install-deps chromium  && \
    npx playwright install chromium

RUN yarn global add turbo prisma@4.15.0 nodemon
