CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  rol VARCHAR(50) NOT NULL
);

CREATE TABLE folders (
    id SERIAL PRIMARY KEY,
    owner INTEGER REFERENCES users(id),
    folder INTEGER REFERENCES folders(id),
    name VARCHAR(255) NOT NULL,
    description VARCHAR(255),
    created TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE SEQUENCE document_id_seq START 10000;

    -- id INTEGER PRIMARY KEY DEFAULT nextval('document_id_seq'),

CREATE TABLE documents (
    id INTEGER PRIMARY KEY DEFAULT nextval('document_id_seq'),
    key VARCHAR(255) NOT NULL,
    owner INTEGER REFERENCES users(id),
    folder INTEGER REFERENCES folders(id),
    name VARCHAR(255) NOT NULL,
    created TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
);

CREATE TABLE folder_permissions (
    user_id INTEGER REFERENCES users(id),
    folder_id INTEGER REFERENCES folders(id),
    PRIMARY KEY (user_id, folder_id)
);