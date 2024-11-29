--
-- PostgreSQL database dump
--

-- Dumped from database version 16.3
-- Dumped by pg_dump version 16.3

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: comentarios; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.comentarios (
    id integer NOT NULL,
    mensaje text NOT NULL,
    id_usuario integer NOT NULL,
    id_ticket integer NOT NULL
);


ALTER TABLE public.comentarios OWNER TO postgres;

--
-- Name: comentarios_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.comentarios_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.comentarios_id_seq OWNER TO postgres;

--
-- Name: comentarios_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.comentarios_id_seq OWNED BY public.comentarios.id;


--
-- Name: notificaciones; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.notificaciones (
    id integer NOT NULL,
    id_usuario integer,
    mensaje text,
    leida boolean DEFAULT false,
    fecha timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public.notificaciones OWNER TO postgres;

--
-- Name: notificaciones_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.notificaciones_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.notificaciones_id_seq OWNER TO postgres;

--
-- Name: notificaciones_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.notificaciones_id_seq OWNED BY public.notificaciones.id;


--
-- Name: tickets; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.tickets (
    id integer NOT NULL,
    descripcion text NOT NULL,
    fecha_creacion timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    fecha_modificacion timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    id_usuario integer NOT NULL,
    id_tipo integer NOT NULL,
    auditado boolean DEFAULT false
);


ALTER TABLE public.tickets OWNER TO postgres;

--
-- Name: tickets_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.tickets_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.tickets_id_seq OWNER TO postgres;

--
-- Name: tickets_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.tickets_id_seq OWNED BY public.tickets.id;


--
-- Name: tipos; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.tipos (
    id integer NOT NULL,
    nombre character varying(100) NOT NULL
);


ALTER TABLE public.tipos OWNER TO postgres;

--
-- Name: tipos_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.tipos_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.tipos_id_seq OWNER TO postgres;

--
-- Name: tipos_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.tipos_id_seq OWNED BY public.tipos.id;


--
-- Name: usuarios; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.usuarios (
    id integer NOT NULL,
    nombre character varying(100) NOT NULL,
    email character varying(100) NOT NULL,
    password character varying(100) NOT NULL,
    tipo_usuario character varying(50) NOT NULL
);


ALTER TABLE public.usuarios OWNER TO postgres;

--
-- Name: usuarios_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.usuarios_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.usuarios_id_seq OWNER TO postgres;

--
-- Name: usuarios_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.usuarios_id_seq OWNED BY public.usuarios.id;


--
-- Name: comentarios id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.comentarios ALTER COLUMN id SET DEFAULT nextval('public.comentarios_id_seq'::regclass);


--
-- Name: notificaciones id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.notificaciones ALTER COLUMN id SET DEFAULT nextval('public.notificaciones_id_seq'::regclass);


--
-- Name: tickets id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tickets ALTER COLUMN id SET DEFAULT nextval('public.tickets_id_seq'::regclass);


--
-- Name: tipos id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tipos ALTER COLUMN id SET DEFAULT nextval('public.tipos_id_seq'::regclass);


--
-- Name: usuarios id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.usuarios ALTER COLUMN id SET DEFAULT nextval('public.usuarios_id_seq'::regclass);


--
-- Data for Name: comentarios; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.comentarios (id, mensaje, id_usuario, id_ticket) FROM stdin;
9	ok respondido	1	28
\.


--
-- Data for Name: notificaciones; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.notificaciones (id, id_usuario, mensaje, leida, fecha) FROM stdin;
1	3	Tu ticket con ID 10 ha sido auditado.	f	2024-07-07 16:21:56.183362
2	3	Tu ticket con ID 11 ha sido auditado.	f	2024-07-07 16:21:58.286602
3	4	Tu ticket con ID 9 ha sido auditado.	f	2024-07-07 16:21:59.189394
4	4	Tu ticket con ID 8 ha sido auditado.	f	2024-07-07 16:21:59.847185
5	3	Tu ticket con ID 7 ha sido auditado.	f	2024-07-07 16:22:00.48631
6	3	Tu ticket con ID 13 ha sido auditado.	f	2024-07-07 17:03:43.620889
7	3	Tu ticket con ID 13 ha sido auditado.	f	2024-07-07 21:17:08.700171
8	3	Tu ticket con ID 13 ha sido auditado.	f	2024-07-07 21:48:23.402649
9	4	Tu ticket con ID 14 ha sido auditado.	f	2024-07-07 21:48:25.385925
10	4	Tu ticket con ID 15 ha sido auditado.	f	2024-07-07 21:48:26.634789
11	3	Tu ticket con ID 16 ha sido auditado.	f	2024-07-07 21:48:27.429771
12	4	Tu ticket con ID 17 ha sido auditado.	f	2024-07-07 22:10:53.803316
13	4	Tu ticket con ID 17 ha sido auditado.	f	2024-07-07 22:10:54.537899
14	4	Tu ticket con ID 17 ha sido auditado.	f	2024-07-07 22:10:55.364264
15	4	Tu ticket con ID 17 ha sido auditado.	f	2024-07-07 22:10:55.969377
16	3	Tu ticket con ID 16 ha sido auditado.	f	2024-07-07 22:10:56.574885
17	4	Tu ticket con ID 17 ha sido auditado.	f	2024-07-07 22:10:57.340256
18	3	Tu ticket con ID 16 ha sido auditado.	f	2024-07-07 22:14:36.888343
19	3	Tu ticket con ID 16 ha sido auditado.	f	2024-07-07 22:14:37.847285
20	3	Tu ticket con ID 16 ha sido auditado.	f	2024-07-07 22:14:38.81987
21	3	Tu ticket con ID 16 ha sido auditado.	f	2024-07-07 22:14:39.393976
22	4	Tu ticket con ID 17 ha sido auditado.	f	2024-07-07 22:14:40.220664
23	4	Tu ticket con ID 15 ha sido auditado.	f	2024-07-07 22:14:41.509793
24	4	Tu ticket con ID 15 ha sido auditado.	f	2024-07-08 07:33:58.251257
25	4	Tu ticket con ID 15 ha sido auditado.	f	2024-07-08 07:34:01.133266
26	4	Tu ticket con ID 15 ha sido auditado.	f	2024-07-08 07:34:02.338478
27	4	Tu ticket con ID 17 ha sido auditado.	f	2024-07-08 07:34:08.898974
28	4	Tu ticket con ID 17 ha sido auditado.	f	2024-07-08 07:34:10.560478
29	4	Tu ticket con ID 15 ha sido auditado.	f	2024-07-08 07:34:29.45232
30	4	Tu ticket con ID 15 ha sido auditado.	f	2024-07-08 07:34:38.425064
31	4	Tu ticket con ID 15 ha sido auditado.	f	2024-07-08 07:34:50.726402
32	4	Tu ticket con ID 15 ha sido auditado.	f	2024-07-08 07:41:41.475688
33	4	Tu ticket con ID 15 ha sido auditado.	f	2024-07-08 07:41:43.754313
34	4	Tu ticket con ID 15 ha sido auditado.	f	2024-07-08 07:41:45.23872
35	4	Tu ticket con ID 18 ha sido auditado.	f	2024-07-08 07:42:27.720425
36	4	Tu ticket con ID 19 ha sido auditado.	f	2024-07-08 07:49:12.449216
37	4	Tu ticket con ID 19 ha sido auditado.	f	2024-07-08 07:49:13.677323
38	3	Tu ticket con ID 20 ha sido auditado.	f	2024-07-08 07:49:14.557219
39	4	Tu ticket con ID 19 ha sido auditado.	f	2024-07-08 07:49:33.43724
40	4	Tu ticket con ID 19 ha sido auditado.	f	2024-07-08 07:49:34.609392
41	3	Tu ticket con ID 20 ha sido auditado.	f	2024-07-08 07:50:59.874487
42	4	Tu ticket con ID 19 ha sido auditado.	f	2024-07-08 07:51:01.013543
43	4	Tu ticket con ID 19 ha sido auditado.	f	2024-07-08 07:51:02.375529
44	4	Tu ticket con ID 19 ha sido auditado.	f	2024-07-08 07:51:03.126746
45	3	Tu ticket con ID 20 ha sido auditado.	f	2024-07-08 07:55:17.765712
46	3	Tu ticket con ID 20 ha sido auditado.	f	2024-07-08 08:01:33.415021
47	3	Tu ticket con ID 20 ha sido auditado.	f	2024-07-08 08:01:45.291539
48	4	Tu ticket con ID 21 ha sido auditado.	f	2024-07-08 08:02:57.773467
49	3	Tu ticket con ID 23 ha sido auditado.	f	2024-07-08 08:02:58.584915
50	3	Tu ticket con ID 23 ha sido auditado.	f	2024-07-08 08:03:00.19175
51	4	Tu ticket con ID 22 ha sido auditado.	f	2024-07-08 08:09:07.103059
52	4	Tu ticket con ID 21 ha sido auditado.	f	2024-07-08 08:10:26.840581
53	4	Tu ticket con ID 22 ha sido auditado.	f	2024-07-08 08:10:29.352067
54	4	Tu ticket con ID 22 ha sido auditado.	f	2024-07-08 08:10:31.066755
55	4	Tu ticket con ID 21 ha sido auditado.	f	2024-07-08 08:10:32.175459
56	3	Tu ticket con ID 23 ha sido auditado.	f	2024-07-08 08:10:33.266591
57	3	Tu ticket con ID 23 ha sido auditado.	f	2024-07-08 08:14:54.038451
58	4	Tu ticket con ID 22 ha sido auditado.	f	2024-07-08 08:15:01.64423
59	3	Tu ticket con ID 23 ha sido auditado.	f	2024-07-08 08:16:33.612277
60	3	Tu ticket con ID 23 ha sido auditado.	f	2024-07-08 08:16:34.871186
61	4	Tu ticket con ID 22 ha sido auditado.	f	2024-07-08 08:16:35.865848
62	4	Tu ticket con ID 21 ha sido auditado.	f	2024-07-08 08:16:37.319552
63	4	Tu ticket con ID 22 ha sido auditado.	f	2024-07-08 08:16:38.465382
64	3	Tu ticket con ID 23 ha sido auditado.	f	2024-07-08 08:16:41.087084
65	4	Tu ticket con ID 22 ha sido auditado.	f	2024-07-08 08:16:42.975342
66	4	Tu ticket con ID 21 ha sido auditado.	f	2024-07-08 08:16:43.956569
67	3	Tu ticket con ID 23 ha sido auditado.	f	2024-07-08 08:17:05.680425
68	3	Tu ticket con ID 23 ha sido auditado.	f	2024-07-08 08:17:08.030649
69	4	Tu ticket con ID 21 ha sido auditado.	f	2024-07-08 08:17:09.402054
70	4	Tu ticket con ID 22 ha sido auditado.	f	2024-07-08 08:17:11.09573
71	3	Tu ticket con ID 23 ha sido auditado.	f	2024-07-08 08:22:04.29141
72	4	Tu ticket con ID 22 ha sido auditado.	f	2024-07-08 09:07:19.781052
73	4	Tu ticket con ID 21 ha sido auditado.	f	2024-07-08 09:53:11.140266
74	3	Tu ticket con ID 24 ha sido auditado.	f	2024-07-08 09:53:13.644824
75	4	Tu ticket con ID 25 ha sido auditado.	f	2024-07-08 09:53:16.185257
76	3	Tu ticket con ID 24 ha sido auditado.	f	2024-07-08 12:39:57.512338
77	4	Tu ticket con ID 21 ha sido auditado.	f	2024-07-08 12:40:00.036107
78	3	Tu ticket con ID 26 ha sido auditado.	f	2024-07-08 12:40:12.153874
79	3	Tu ticket con ID 24 ha sido auditado.	f	2024-07-08 12:40:17.248322
80	4	Tu ticket con ID 21 ha sido auditado.	f	2024-07-08 12:40:18.195938
81	3	Tu ticket con ID 27 ha sido auditado.	f	2024-08-08 05:10:42.093656
82	3	Tu ticket con ID 28 ha sido auditado.	f	2024-11-28 22:46:04.008592
83	3	Tu ticket con ID 28 ha sido auditado.	f	2024-11-28 22:52:08.222188
\.


--
-- Data for Name: tickets; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.tickets (id, descripcion, fecha_creacion, fecha_modificacion, id_usuario, id_tipo, auditado) FROM stdin;
28	esto es del estudiante 1	2024-11-28 22:45:42.761629	2024-11-28 22:45:42.761629	3	1	f
\.


--
-- Data for Name: tipos; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.tipos (id, nombre) FROM stdin;
1	Urgente
2	Importante
3	Neutro
\.


--
-- Data for Name: usuarios; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.usuarios (id, nombre, email, password, tipo_usuario) FROM stdin;
1	Diego Cabre	administrador@mail.com	$2a$10$Y8Yb2ADkit.J7diKutiMw.6LG6WrFpGZTnEHAD.KFROVM6BhKifVC	administrador
3	Diego Cabre	estudiante@mail.com	$2a$10$bxBRRynkmGIHZt6XBUBPk.LSg9xuwJjl8BKkha.JRqhhlvFU.59jO	estudiante
4	Antonio Perrone	estudiante2@mail.com	$2a$10$vikAibjxA78.TMiUkWxmOeb5EJjtbht7VnCBau7naDEzvrFDsj/cq	estudiante
\.


--
-- Name: comentarios_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.comentarios_id_seq', 9, true);


--
-- Name: notificaciones_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.notificaciones_id_seq', 83, true);


--
-- Name: tickets_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.tickets_id_seq', 28, true);


--
-- Name: tipos_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.tipos_id_seq', 3, true);


--
-- Name: usuarios_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.usuarios_id_seq', 4, true);


--
-- Name: comentarios comentarios_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.comentarios
    ADD CONSTRAINT comentarios_pkey PRIMARY KEY (id);


--
-- Name: notificaciones notificaciones_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.notificaciones
    ADD CONSTRAINT notificaciones_pkey PRIMARY KEY (id);


--
-- Name: tickets tickets_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tickets
    ADD CONSTRAINT tickets_pkey PRIMARY KEY (id);


--
-- Name: tipos tipos_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tipos
    ADD CONSTRAINT tipos_pkey PRIMARY KEY (id);


--
-- Name: usuarios usuarios_email_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.usuarios
    ADD CONSTRAINT usuarios_email_key UNIQUE (email);


--
-- Name: usuarios usuarios_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.usuarios
    ADD CONSTRAINT usuarios_pkey PRIMARY KEY (id);


--
-- Name: comentarios comentarios_id_ticket_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.comentarios
    ADD CONSTRAINT comentarios_id_ticket_fkey FOREIGN KEY (id_ticket) REFERENCES public.tickets(id);


--
-- Name: notificaciones notificaciones_id_usuario_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.notificaciones
    ADD CONSTRAINT notificaciones_id_usuario_fkey FOREIGN KEY (id_usuario) REFERENCES public.usuarios(id);


--
-- Name: tickets tickets_id_tipo_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tickets
    ADD CONSTRAINT tickets_id_tipo_fkey FOREIGN KEY (id_tipo) REFERENCES public.tipos(id);


--
-- PostgreSQL database dump complete
--

