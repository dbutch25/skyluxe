-- Detail pages left behind by the old delete button (no listing card points to them).
-- They still hold their slug, which blocks re-importing a project with the same name.
--
-- Run step 1 first and check the list. Only run step 2 if nothing there should be kept.

-- 1. See what would be removed
SELECT p."id", p."title", p."slug", p."createdAt"
FROM "Project" p
WHERE NOT EXISTS (SELECT 1 FROM "ProjectPage" pp WHERE pp."projectId" = p."id")
ORDER BY p."createdAt";

-- 2. Remove them
-- DELETE FROM "Project" p
-- WHERE NOT EXISTS (SELECT 1 FROM "ProjectPage" pp WHERE pp."projectId" = p."id");
