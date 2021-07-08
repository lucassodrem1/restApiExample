CREATE TABLE users (
  id SERIAL,
  username VARCHAR(12) NOT NULL UNIQUE,
  password_hash TEXT NOT NULL,
  PRIMARY KEY (id)
);

INSERT INTO users (username, password_hash) values ('admin', '$2b$08$V7faI59F0Pq54IblekMSz.ijJ2aU4FfARsb5hEBwimlrHwsomTVOS');

CREATE TABLE posts (
  id SERIAL,
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  slug TEXT NOT NULL,
  created_by INT NOT NULL,
  FOREIGN KEY (created_by)
    REFERENCES users (id)
    ON UPDATE CASCADE
    ON DELETE CASCADE,
  PRIMARY KEY (id)
);