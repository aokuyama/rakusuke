FROM public.ecr.aws/lambda/nodejs:18 as build

RUN npm install -g turbo@1.10.3 prisma@4.15.0

WORKDIR /build
COPY ./ ./

RUN rm -rf /build/apps/workshop
RUN rm -rf /build/apps/web
RUN rm -rf /build/packages/ui

RUN npm ci --ignore-scripts -workspace=server
RUN prisma generate
ENV NODE_ENV=production
RUN npm run build-lambda -workspace=server

FROM public.ecr.aws/lambda/nodejs:18
WORKDIR ${LAMBDA_TASK_ROOT}
COPY --from=build /build/apps/server/dist/* ./
COPY --from=build /build/node_modules/.prisma/client/libquery_engine-rhel-openssl-1.0.x.so.node ./
COPY ./prisma ./

CMD ["index.handler"]
