INSERT INTO Options (OptionID, SentimentID, Option, Description, createdAt, updatedAt)
VALUES
(generate_uuid(), 1, 'unanswered', 'Standard for unanswered questions', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(generate_uuid(), 2, 'no', 'Give a negative answer', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(generate_uuid(), 3, 'yes', 'Give a positive answer', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(generate_uuid(), 4, 'i don\'t know yet', 'Pass up on giving an answer at this moment', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(generate_uuid(), 4, 'i don\'t care', 'Give an undefinitive answer', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
