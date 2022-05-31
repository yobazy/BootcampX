SELECT cohorts.name AS cohorts_name, count(students.*) AS student_count
FROM cohorts
JOIN students ON cohorts.id = cohort_id
GROUP BY cohorts_name
HAVING student_count > 18
ORDER BY student_count;