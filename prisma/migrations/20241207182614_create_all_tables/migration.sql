-- CreateTable
CREATE TABLE "emotional_regulation_techniques" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "video_url" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),
    "deleted_at" TIMESTAMP(3) NOT NULL,
    "created_by" TEXT NOT NULL,

    CONSTRAINT "emotional_regulation_techniques_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "plans" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "price" BIGINT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),
    "deleted_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "plans_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user_plans" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "plan_id" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "start_date" TIMESTAMP(3) NOT NULL,
    "end_date" TIMESTAMP(3) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "user_plans_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "emotional_regulation_history" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "emotional_regulation_technique_id" TEXT NOT NULL,
    "emotionalState" TEXT NOT NULL,
    "desiredState" TEXT NOT NULL,
    "availableTime" INTEGER NOT NULL,
    "location" TEXT NOT NULL,
    "rating" INTEGER,
    "feedback" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "emotional_regulation_history_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "emotional_regulation_techniques_id_key" ON "emotional_regulation_techniques"("id");

-- CreateIndex
CREATE UNIQUE INDEX "plans_id_key" ON "plans"("id");

-- CreateIndex
CREATE UNIQUE INDEX "user_plans_id_key" ON "user_plans"("id");

-- CreateIndex
CREATE UNIQUE INDEX "emotional_regulation_history_id_key" ON "emotional_regulation_history"("id");

-- AddForeignKey
ALTER TABLE "emotional_regulation_techniques" ADD CONSTRAINT "emotional_regulation_techniques_created_by_fkey" FOREIGN KEY ("created_by") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_plans" ADD CONSTRAINT "user_plans_plan_id_fkey" FOREIGN KEY ("plan_id") REFERENCES "plans"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_plans" ADD CONSTRAINT "user_plans_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "emotional_regulation_history" ADD CONSTRAINT "emotional_regulation_history_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "emotional_regulation_history" ADD CONSTRAINT "emotional_regulation_history_emotional_regulation_techniqu_fkey" FOREIGN KEY ("emotional_regulation_technique_id") REFERENCES "plans"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
