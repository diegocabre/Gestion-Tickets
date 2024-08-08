# Título del Proyecto

Sistema de Tickets para Soporte Técnico.

## Descripción del Proyecto

Este proyecto es un sistema de tickets para soporte técnico que permite a los usuarios crear, visualizar y gestionar tickets de soporte. Incluye funcionalidades para diferentes tipos de usuarios, tales como administradores y estudiantes. Los administradores pueden ver todos los tickets, auditarlos y añadir comentarios, mientras que los estudiantes pueden crear nuevos tickets y ver los comentarios asociados a los mismos.

## Capturas de Pantalla del Proyecto

![Inicio](image.png)
![Iniciar Sesión](image-1.png)
![Registrarse](image-2.png)
![Vista Administrador](image-3.png)
![Vista Estudiante](image-4.png)
![Nuevo Ticket](image-5.png)
![Comentarios](image-6.png)

## Prerrequisitos o Dependencias

### Dependencias

- `bcryptjs`: "^2.4.3"
- `body-parser`: "^1.20.2"
- `dotenv`: "^16.4.5"
- `express`: "^4.19.2"
- `express-handlebars`: "^7.1.3"
- `express-session`: "^1.18.0"
- `jsonwebtoken`: "^9.0.2"
- `method-override`: "^3.0.0"
- `pg`: "^8.12.0"

### DevDependencies

- `nodemon`: "^3.1.4"

## Instalación del Proyecto

Sigue los siguientes pasos para configurar el entorno de desarrollo e instalar todas las dependencias necesarias.

```bash
# Paso 1: Clona el repositorio
git clone https://https://github.com/diegocabre/Gestion-Tickets

# Paso 2: Navega al directorio del proyecto
cd Gestion-Tickets


# Paso 3: Instala las dependencias
npm install

Credenciales de Acceso
Para Usuario Tipo Administrador
Email: administrador@mail.com
Contraseña: Abc123#
Para Usuario Tipo Estudiante
Email: estudiante@mail.com
Contraseña: Abc123#
Email: estudiante2@mail.com
Contraseña: Abc123#
Autor

Diego Cabre

# Paso 4: crea BD

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

ALTER TABLE tickets ADD COLUMN id_tipo INT REFERENCES tipos(id);

INSERT INTO tipos (nombre) VALUES ('Urgente'), ('Importante'), ('Neutro');

CREATE TABLE tickets (
    id SERIAL PRIMARY KEY,
    descripcion TEXT NOT NULL,
    fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    fecha_modificacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    id_usuario INT NOT NULL REFERENCES usuarios(id),
    id_tipo INT NOT NULL REFERENCES tipos(id)
);

ALTER TABLE tickets ADD COLUMN auditado BOOLEAN DEFAULT FALSE;


CREATE TABLE comentarios (
    id SERIAL PRIMARY KEY,
    mensaje TEXT NOT NULL,
    id_usuario INT NOT NULL REFERENCES usuarios(id),
    id_ticket INT NOT NULL REFERENCES tickets(id)
);

SELECT * FROM usuarios;

SELECT * FROM tipos

SELECT id, nombre FROM tipos;

CREATE TABLE notificaciones (
    id SERIAL PRIMARY KEY,
    id_usuario INTEGER REFERENCES usuarios(id),
    mensaje TEXT,
    leida BOOLEAN DEFAULT FALSE,
    fecha TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
