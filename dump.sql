--
-- PostgreSQL database dump
--

\restrict 2g5ABNoJRl00mbyyckhCrhce0eDiaUBsDBqZX0NFjBvDjnXGL7N1Kc0eJWoMbd6

-- Dumped from database version 17.10
-- Dumped by pg_dump version 17.10

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: Role; Type: TYPE; Schema: public; Owner: pizzaria
--

CREATE TYPE public."Role" AS ENUM (
    'CUSTOMER',
    'ATTENDANT',
    'KITCHEN',
    'MANAGER',
    'ADMIN',
    'SUPER_ADMIN'
);


ALTER TYPE public."Role" OWNER TO pizzaria;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: categories; Type: TABLE; Schema: public; Owner: pizzaria
--

CREATE TABLE public.categories (
    id text NOT NULL,
    name text NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL
);


ALTER TABLE public.categories OWNER TO pizzaria;

--
-- Name: items; Type: TABLE; Schema: public; Owner: pizzaria
--

CREATE TABLE public.items (
    id text NOT NULL,
    amount integer NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL,
    order_id text NOT NULL,
    product_id text NOT NULL
);


ALTER TABLE public.items OWNER TO pizzaria;

--
-- Name: orders; Type: TABLE; Schema: public; Owner: pizzaria
--

CREATE TABLE public.orders (
    id text NOT NULL,
    "table" integer NOT NULL,
    status boolean DEFAULT false NOT NULL,
    draft boolean DEFAULT true NOT NULL,
    name text,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL
);


ALTER TABLE public.orders OWNER TO pizzaria;

--
-- Name: products; Type: TABLE; Schema: public; Owner: pizzaria
--

CREATE TABLE public.products (
    id text NOT NULL,
    name text NOT NULL,
    price integer NOT NULL,
    description text NOT NULL,
    banner text NOT NULL,
    disabled boolean DEFAULT false NOT NULL,
    category_id text NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL
);


ALTER TABLE public.products OWNER TO pizzaria;

--
-- Name: users; Type: TABLE; Schema: public; Owner: pizzaria
--

CREATE TABLE public.users (
    id integer NOT NULL,
    name text NOT NULL,
    email text NOT NULL,
    password text NOT NULL,
    role public."Role" DEFAULT 'CUSTOMER'::public."Role" NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL
);


ALTER TABLE public.users OWNER TO pizzaria;

--
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: pizzaria
--

CREATE SEQUENCE public.users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.users_id_seq OWNER TO pizzaria;

--
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: pizzaria
--

ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;


--
-- Name: users id; Type: DEFAULT; Schema: public; Owner: pizzaria
--

ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);


--
-- Data for Name: categories; Type: TABLE DATA; Schema: public; Owner: pizzaria
--

COPY public.categories (id, name, "createdAt", "updatedAt") FROM stdin;
\.


--
-- Data for Name: items; Type: TABLE DATA; Schema: public; Owner: pizzaria
--

COPY public.items (id, amount, "createdAt", "updatedAt", order_id, product_id) FROM stdin;
\.


--
-- Data for Name: orders; Type: TABLE DATA; Schema: public; Owner: pizzaria
--

COPY public.orders (id, "table", status, draft, name, "createdAt", "updatedAt") FROM stdin;
\.


--
-- Data for Name: products; Type: TABLE DATA; Schema: public; Owner: pizzaria
--

COPY public.products (id, name, price, description, banner, disabled, category_id, "createdAt", "updatedAt") FROM stdin;
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: pizzaria
--

COPY public.users (id, name, email, password, role, "createdAt", "updatedAt") FROM stdin;
4	guilherme	guilherme.teste@email.com	$2b$10$APMMxRuBA0LegnlPcDMG.OTLAa02Gl0FeTwU/R2W/asnP2i/1yJdG	ATTENDANT	2026-06-23 13:32:28.465	2026-06-23 13:32:28.465
\.


--
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: pizzaria
--

SELECT pg_catalog.setval('public.users_id_seq', 4, true);


--
-- Name: categories categories_pkey; Type: CONSTRAINT; Schema: public; Owner: pizzaria
--

ALTER TABLE ONLY public.categories
    ADD CONSTRAINT categories_pkey PRIMARY KEY (id);


--
-- Name: items items_pkey; Type: CONSTRAINT; Schema: public; Owner: pizzaria
--

ALTER TABLE ONLY public.items
    ADD CONSTRAINT items_pkey PRIMARY KEY (id);


--
-- Name: orders orders_pkey; Type: CONSTRAINT; Schema: public; Owner: pizzaria
--

ALTER TABLE ONLY public.orders
    ADD CONSTRAINT orders_pkey PRIMARY KEY (id);


--
-- Name: products products_pkey; Type: CONSTRAINT; Schema: public; Owner: pizzaria
--

ALTER TABLE ONLY public.products
    ADD CONSTRAINT products_pkey PRIMARY KEY (id);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: pizzaria
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- Name: users_email_key; Type: INDEX; Schema: public; Owner: pizzaria
--

CREATE UNIQUE INDEX users_email_key ON public.users USING btree (email);


--
-- Name: items items_order_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: pizzaria
--

ALTER TABLE ONLY public.items
    ADD CONSTRAINT items_order_id_fkey FOREIGN KEY (order_id) REFERENCES public.orders(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: items items_product_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: pizzaria
--

ALTER TABLE ONLY public.items
    ADD CONSTRAINT items_product_id_fkey FOREIGN KEY (product_id) REFERENCES public.products(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: products products_category_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: pizzaria
--

ALTER TABLE ONLY public.products
    ADD CONSTRAINT products_category_id_fkey FOREIGN KEY (category_id) REFERENCES public.categories(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- PostgreSQL database dump complete
--

\unrestrict 2g5ABNoJRl00mbyyckhCrhce0eDiaUBsDBqZX0NFjBvDjnXGL7N1Kc0eJWoMbd6
