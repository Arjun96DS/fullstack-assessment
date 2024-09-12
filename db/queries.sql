-- //Query to Retrieve Posts by a Specific User:
SELECT * FROM posts WHERE user_id = $1;

-- //Query to Count Comments on a Post:
SELECT COUNT(*) FROM comments WHERE post_id = $1;
