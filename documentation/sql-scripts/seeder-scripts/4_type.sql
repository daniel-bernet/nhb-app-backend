INSERT INTO Types (TypeID, Label, createdAt, updatedAt)
VALUES
(generate_uuid(), 'gig', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(generate_uuid(), 'rehearsal', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(generate_uuid(), 'stamm', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(generate_uuid(), 'meeting', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(generate_uuid(), 'unspecified', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
