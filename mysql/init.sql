-- =================================================================
-- TaskManager - Script de inicializacion de BD
-- Crea el esquema y carga datos de prueba (30 registros por tabla)
-- =================================================================

CREATE DATABASE IF NOT EXISTS taskmanager;
USE taskmanager;

DROP TABLE IF EXISTS tasks;
DROP TABLE IF EXISTS projects;
DROP TABLE IF EXISTS users;

CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(100) NOT NULL,
    email VARCHAR(150) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE projects (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(150) NOT NULL,
    description TEXT,
    user_id INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

CREATE TABLE tasks (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(150) NOT NULL,
    description TEXT,
    completed BOOLEAN DEFAULT FALSE,
    project_id INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (project_id) REFERENCES projects(id) ON DELETE CASCADE
);

-- =================================================================
-- DATOS DE PRUEBA
-- Password en TODOS los usuarios: demo1234
-- Usuarios destacados para la demo:
--   demo1@taskmanager.com / demo1234
--   demo2@taskmanager.com / demo1234
--   demo3@taskmanager.com / demo1234
-- =================================================================

INSERT INTO users (username, email, password) VALUES
('demo1',    'demo1@taskmanager.com',    '$2b$10$F4LjkPaGRf1dmbHXWsa6oe4AEUcKcdbFCNrHdLC6gZgmJu5BMRjcy'),
('demo2',    'demo2@taskmanager.com',    '$2b$10$F4LjkPaGRf1dmbHXWsa6oe4AEUcKcdbFCNrHdLC6gZgmJu5BMRjcy'),
('demo3',    'demo3@taskmanager.com',    '$2b$10$F4LjkPaGRf1dmbHXWsa6oe4AEUcKcdbFCNrHdLC6gZgmJu5BMRjcy'),
('alice',    'alice@taskmanager.com',    '$2b$10$F4LjkPaGRf1dmbHXWsa6oe4AEUcKcdbFCNrHdLC6gZgmJu5BMRjcy'),
('bob',      'bob@taskmanager.com',      '$2b$10$F4LjkPaGRf1dmbHXWsa6oe4AEUcKcdbFCNrHdLC6gZgmJu5BMRjcy'),
('carol',    'carol@taskmanager.com',    '$2b$10$F4LjkPaGRf1dmbHXWsa6oe4AEUcKcdbFCNrHdLC6gZgmJu5BMRjcy'),
('david',    'david@taskmanager.com',    '$2b$10$F4LjkPaGRf1dmbHXWsa6oe4AEUcKcdbFCNrHdLC6gZgmJu5BMRjcy'),
('eva',      'eva@taskmanager.com',      '$2b$10$F4LjkPaGRf1dmbHXWsa6oe4AEUcKcdbFCNrHdLC6gZgmJu5BMRjcy'),
('frank',    'frank@taskmanager.com',    '$2b$10$F4LjkPaGRf1dmbHXWsa6oe4AEUcKcdbFCNrHdLC6gZgmJu5BMRjcy'),
('grace',    'grace@taskmanager.com',    '$2b$10$F4LjkPaGRf1dmbHXWsa6oe4AEUcKcdbFCNrHdLC6gZgmJu5BMRjcy'),
('henry',    'henry@taskmanager.com',    '$2b$10$F4LjkPaGRf1dmbHXWsa6oe4AEUcKcdbFCNrHdLC6gZgmJu5BMRjcy'),
('iris',     'iris@taskmanager.com',     '$2b$10$F4LjkPaGRf1dmbHXWsa6oe4AEUcKcdbFCNrHdLC6gZgmJu5BMRjcy'),
('jack',     'jack@taskmanager.com',     '$2b$10$F4LjkPaGRf1dmbHXWsa6oe4AEUcKcdbFCNrHdLC6gZgmJu5BMRjcy'),
('kate',     'kate@taskmanager.com',     '$2b$10$F4LjkPaGRf1dmbHXWsa6oe4AEUcKcdbFCNrHdLC6gZgmJu5BMRjcy'),
('liam',     'liam@taskmanager.com',     '$2b$10$F4LjkPaGRf1dmbHXWsa6oe4AEUcKcdbFCNrHdLC6gZgmJu5BMRjcy'),
('mia',      'mia@taskmanager.com',      '$2b$10$F4LjkPaGRf1dmbHXWsa6oe4AEUcKcdbFCNrHdLC6gZgmJu5BMRjcy'),
('noah',     'noah@taskmanager.com',     '$2b$10$F4LjkPaGRf1dmbHXWsa6oe4AEUcKcdbFCNrHdLC6gZgmJu5BMRjcy'),
('olivia',   'olivia@taskmanager.com',   '$2b$10$F4LjkPaGRf1dmbHXWsa6oe4AEUcKcdbFCNrHdLC6gZgmJu5BMRjcy'),
('peter',    'peter@taskmanager.com',    '$2b$10$F4LjkPaGRf1dmbHXWsa6oe4AEUcKcdbFCNrHdLC6gZgmJu5BMRjcy'),
('quinn',    'quinn@taskmanager.com',    '$2b$10$F4LjkPaGRf1dmbHXWsa6oe4AEUcKcdbFCNrHdLC6gZgmJu5BMRjcy'),
('rachel',   'rachel@taskmanager.com',   '$2b$10$F4LjkPaGRf1dmbHXWsa6oe4AEUcKcdbFCNrHdLC6gZgmJu5BMRjcy'),
('steve',    'steve@taskmanager.com',    '$2b$10$F4LjkPaGRf1dmbHXWsa6oe4AEUcKcdbFCNrHdLC6gZgmJu5BMRjcy'),
('tina',     'tina@taskmanager.com',     '$2b$10$F4LjkPaGRf1dmbHXWsa6oe4AEUcKcdbFCNrHdLC6gZgmJu5BMRjcy'),
('umar',     'umar@taskmanager.com',     '$2b$10$F4LjkPaGRf1dmbHXWsa6oe4AEUcKcdbFCNrHdLC6gZgmJu5BMRjcy'),
('victoria', 'victoria@taskmanager.com', '$2b$10$F4LjkPaGRf1dmbHXWsa6oe4AEUcKcdbFCNrHdLC6gZgmJu5BMRjcy'),
('walter',   'walter@taskmanager.com',   '$2b$10$F4LjkPaGRf1dmbHXWsa6oe4AEUcKcdbFCNrHdLC6gZgmJu5BMRjcy'),
('xenia',    'xenia@taskmanager.com',    '$2b$10$F4LjkPaGRf1dmbHXWsa6oe4AEUcKcdbFCNrHdLC6gZgmJu5BMRjcy'),
('yago',     'yago@taskmanager.com',     '$2b$10$F4LjkPaGRf1dmbHXWsa6oe4AEUcKcdbFCNrHdLC6gZgmJu5BMRjcy'),
('zoe',      'zoe@taskmanager.com',      '$2b$10$F4LjkPaGRf1dmbHXWsa6oe4AEUcKcdbFCNrHdLC6gZgmJu5BMRjcy'),
('marcos',   'marcos@taskmanager.com',   '$2b$10$F4LjkPaGRf1dmbHXWsa6oe4AEUcKcdbFCNrHdLC6gZgmJu5BMRjcy');

INSERT INTO projects (name, description, user_id) VALUES
('Proyecto Personal',        'Tareas personales del dia a dia',                1),
('Aprender Node.js',         'Curso completo de backend con Express',           1),
('Reforma cocina',           'Planificacion de la reforma de la cocina',        2),
('Viaje a Japon',            'Organizar viaje de dos semanas a Japon',          2),
('Trabajo final master',     'Tesis sobre arquitecturas cloud',                 3),
('Lanzar blog tecnico',      'Crear y mantener un blog sobre desarrollo web',   3),
('Mudanza casa nueva',       'Tareas relacionadas con la mudanza',              4),
('Maraton Lisboa',           'Plan de entrenamiento de 16 semanas',             5),
('Estudiar AWS',             'Preparacion certificacion Solutions Architect',   6),
('Reformar despacho',        'Renovar el espacio de trabajo en casa',           7),
('Aprender frances',         'Nivel B2 en 6 meses',                             8),
('Boda 2026',                'Organizacion completa de la boda',                9),
('App de fitness',           'MVP de aplicacion movil para gym',               10),
('Curso Java avanzado',      'Profundizar en Spring Boot y microservicios',    11),
('Jardin urbano',            'Crear huerto en el balcon',                      12),
('Negocio freelance',        'Captacion de clientes y facturacion',            13),
('Renovar carnet conducir',  'Examen teorico y practico',                      14),
('Aprender 3DS Max',         'Modelado y animacion 3D',                        15),
('Inversion bolsa',          'Estrategia de inversion a largo plazo',          16),
('Maestria Python',          'Avanzar en data engineering',                    17),
('Reto fotografia',          'Una foto al dia durante un ano',                 18),
('Casa rural Galicia',       'Proyecto de turismo rural',                      19),
('Podcast tecnologia',       'Producir 10 episodios sobre IA',                 20),
('Aprender violin',          'Clases semanales y practica diaria',             21),
('Renovar coche',            'Comparar opciones y financiacion',               22),
('Reforma bano',             'Sustituir banera por ducha',                     23),
('Curso ciberseguridad',     'Pentesting basico y CTFs',                       24),
('Plan ahorro 2026',         'Objetivo: ahorrar 10000 euros',                  25),
('Viaje Patagonia',          'Trekking por Argentina y Chile',                 26),
('Tesis doctoral',           'Investigacion sobre LLMs aplicados a educacion', 27);

INSERT INTO tasks (title, description, completed, project_id) VALUES
('Comprar leche',                'Ir al supermercado del barrio',                       1, 1),
('Llamar al fontanero',          'Arreglar grifo de la cocina',                         0, 1),
('Ordenar el escritorio',        'Tirar papeles viejos',                                1, 1),
('Instalar Node.js',             'Version LTS en el portatil',                          1, 2),
('Completar modulo Express',     'Routing, middlewares y controllers',                  1, 2),
('Hacer el proyecto final',      'API REST con auth y Docker',                          0, 2),
('Medir cocina',                 'Tomar todas las medidas con metro laser',             1, 3),
('Pedir presupuesto azulejos',   'Comparar al menos tres proveedores',                  0, 3),
('Reservar vuelo a Tokio',       'Buscar ofertas para octubre',                         1, 4),
('Sacar el JR Pass',             'Pasar por la agencia',                                0, 4),
('Escribir capitulo 1',          'Introduccion y estado del arte',                      1, 5),
('Defender propuesta',           'Presentacion ante el tribunal',                       0, 5),
('Comprar dominio del blog',     'Registrar en Namecheap',                              1, 6),
('Escribir primer post',         'Sobre buenas practicas REST',                         0, 6),
('Empaquetar libros',            'Etiquetar todas las cajas',                           0, 7),
('Tirada larga 21km',            'Domingo por la manana',                               1, 8),
('Hacer laboratorio EC2',        'Practica del modulo de computo',                      1, 9),
('Pintar paredes despacho',      'Color gris claro',                                    0, 10),
('Repaso vocabulario',           'Lista de 200 palabras',                               1, 11),
('Probar pasteles boda',         'Cita con pastelero confirmada',                       0, 12),
('Wireframes de la app',         'Disenar pantallas principales en Figma',              1, 13),
('Estudiar streams en Java',     'Capitulo 5 del libro',                                0, 14),
('Plantar tomates',              'Semillas y tierra preparadas',                        1, 15),
('Crear LinkedIn pro',           'Optimizar perfil para captar clientes',               0, 16),
('Renovar carnet',               'Cita en jefatura',                                    0, 17),
('Modelar silla en 3DS Max',     'Practica de modelado poligonal',                      1, 18),
('Abrir cuenta broker',          'Comparar comisiones',                                 1, 19),
('Curso de pandas avanzado',     'Modulos 1 a 4 completados',                           0, 20),
('Foto del dia 1',               'Tema: luz del amanecer',                              1, 21),
('Hablar con notario',           'Documentacion casa rural',                            0, 22);