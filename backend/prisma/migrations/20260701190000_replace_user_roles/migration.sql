-- Replace the old STAFF/ADMIN role enum with the full role set.
-- Existing STAFF users become ATTENDANT to preserve an operational staff role.

ALTER TABLE "users" ALTER COLUMN "role" DROP DEFAULT;

ALTER TYPE "Role" RENAME TO "Role_old";

CREATE TYPE "Role" AS ENUM (
  'CUSTOMER',
  'ATTENDANT',
  'KITCHEN',
  'MANAGER',
  'ADMIN',
  'SUPER_ADMIN'
);

ALTER TABLE "users"
  ALTER COLUMN "role" TYPE "Role"
  USING (
    CASE "role"::text
      WHEN 'STAFF' THEN 'ATTENDANT'
      WHEN 'ADMIN' THEN 'ADMIN'
      ELSE 'CUSTOMER'
    END
  )::"Role";

ALTER TABLE "users" ALTER COLUMN "role" SET DEFAULT 'CUSTOMER';

DROP TYPE "Role_old";
