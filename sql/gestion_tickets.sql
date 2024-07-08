-- Active: 1713565959560@@127.0.0.1@5433@gestion_tickets@public
CREATE DATABASE gestion_tickets

CREATE TABLE usuarios (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(100) NOT NULL,
    tipo_usuario VARCHAR(50) NOT NULL
);

CREATE TABLE tipos (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL
);

CREATE TABLE tickets (
    id SERIAL PRIMARY KEY,
    descripcion TEXT NOT NULL,
    fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    fecha_modificacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    id_usuario INT NOT NULL REFERENCES usuarios(id),
    id_tipo INT NOT NULL REFERENCES tipos(id)
);

CREATE TABLE comentarios (
    id SERIAL PRIMARY KEY,
    mensaje TEXT NOT NULL,
    id_usuario INT NOT NULL REFERENCES usuarios(id),
    id_ticket INT NOT NULL REFERENCES tickets(id)
);

SELECT * FROM usuarios;