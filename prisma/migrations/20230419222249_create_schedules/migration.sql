-- CreateTable
CREATE TABLE "schedule" (
    "id" SERIAL NOT NULL,
    "event_id" INTEGER NOT NULL,
    "datetime" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "schedule_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "schedule_event_id_datetime_key" ON "schedule"("event_id", "datetime");

-- AddForeignKey
ALTER TABLE "schedule" ADD CONSTRAINT "schedule_event_id_fkey" FOREIGN KEY ("event_id") REFERENCES "event"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
