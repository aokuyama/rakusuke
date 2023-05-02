-- CreateTable
CREATE TABLE "guest" (
    "id" SERIAL NOT NULL,
    "event_id" INTEGER NOT NULL,
    "guest_number" INTEGER NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "guest_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "attendance" (
    "id" SERIAL NOT NULL,
    "guest_id" INTEGER NOT NULL,
    "schedule_id" INTEGER NOT NULL,
    "enabled" BOOLEAN NOT NULL,

    CONSTRAINT "attendance_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "guest_event_id_guest_number_key" ON "guest"("event_id", "guest_number");

-- CreateIndex
CREATE UNIQUE INDEX "attendance_guest_id_schedule_id_key" ON "attendance"("guest_id", "schedule_id");

-- AddForeignKey
ALTER TABLE "guest" ADD CONSTRAINT "guest_event_id_fkey" FOREIGN KEY ("event_id") REFERENCES "event"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "attendance" ADD CONSTRAINT "attendance_guest_id_fkey" FOREIGN KEY ("guest_id") REFERENCES "guest"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "attendance" ADD CONSTRAINT "attendance_schedule_id_fkey" FOREIGN KEY ("schedule_id") REFERENCES "schedule"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
