FROM public.ecr.aws/lambda/nodejs:16 as build

RUN npm install -g yarn
RUN yarn global add turbo prisma

WORKDIR /build
COPY ./ ./

RUN rm -rf /build/apps/workshop
RUN rm -rf /build/apps/web
RUN rm -rf /build/packages/ui

RUN yarn workspace server install
RUN prisma generate
ENV NODE_ENV=production
RUN yarn workspace server build-lambda

FROM public.ecr.aws/lambda/nodejs:16
WORKDIR ${LAMBDA_TASK_ROOT}
COPY --from=build /build/apps/server/dist/* ./
COPY --from=build /build/node_modules/.prisma/client/libquery_engine-rhel-openssl-1.1.x.so.node ./
COPY ./prisma ./

CMD ["index.handler"]
