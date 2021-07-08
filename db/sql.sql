CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  username VARCHAR(12) NOT NULL UNIQUE,
  password_hash TEXT NOT NULL
);

INSERT INTO users (username, password_hash) values ('admin', '$2b$08$V7faI59F0Pq54IblekMSz.ijJ2aU4FfARsb5hEBwimlrHwsomTVOS')