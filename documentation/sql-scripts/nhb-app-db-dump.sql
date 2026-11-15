--
-- PostgreSQL database dump
--


-- Dumped from database version 15.20 (Debian 15.20-1.pgdg13+1)
-- Dumped by pg_dump version 15.20 (Debian 15.20-1.pgdg13+1)

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

--
-- Name: nhb-app; Type: DATABASE; Schema: -; Owner: postgres
--

CREATE DATABASE "nhb-app" WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'en_US.utf8';


ALTER DATABASE "nhb-app" OWNER TO postgres;

\encoding SQL_ASCII
\connect -reuse-previous=on "dbname='nhb-app'"

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
-- Name: Accounts; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Accounts" (
    "AccountID" uuid NOT NULL,
    "FirstName" character varying(64) NOT NULL,
    "LastName" character varying(64) NOT NULL,
    "Email" character varying(128) NOT NULL,
    "PasswordHash" character varying(512) NOT NULL,
    "createdAt" timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


ALTER TABLE public."Accounts" OWNER TO postgres;

--
-- Name: Answers; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Answers" (
    "AnswerID" uuid NOT NULL,
    "QuestionID" uuid NOT NULL,
    "GroupMemberID" uuid NOT NULL,
    "OptionID" uuid NOT NULL,
    "createdAt" timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


ALTER TABLE public."Answers" OWNER TO postgres;

--
-- Name: Bands; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Bands" (
    "BandID" integer NOT NULL,
    "Description" character varying(512) NOT NULL,
    "createdAt" timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


ALTER TABLE public."Bands" OWNER TO postgres;

--
-- Name: Bands_BandID_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."Bands_BandID_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."Bands_BandID_seq" OWNER TO postgres;

--
-- Name: Bands_BandID_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."Bands_BandID_seq" OWNED BY public."Bands"."BandID";


--
-- Name: Events; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Events" (
    "EventID" uuid NOT NULL,
    "GroupID" uuid NOT NULL,
    "TypeID" uuid NOT NULL,
    "Title" character varying(64) NOT NULL,
    "Description" character varying(512) NOT NULL,
    "Location" character varying(64) NOT NULL,
    "Date" timestamp with time zone NOT NULL,
    "Duration" integer NOT NULL,
    "createdAt" timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


ALTER TABLE public."Events" OWNER TO postgres;

--
-- Name: GroupMembers; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."GroupMembers" (
    "GroupMemberID" uuid NOT NULL,
    "GroupID" uuid NOT NULL,
    "AccountID" uuid NOT NULL,
    "createdAt" timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


ALTER TABLE public."GroupMembers" OWNER TO postgres;

--
-- Name: Groups; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Groups" (
    "GroupID" uuid NOT NULL,
    "BandID" integer NOT NULL,
    "Name" character varying(64) NOT NULL,
    "Description" character varying(512) NOT NULL,
    "createdAt" timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


ALTER TABLE public."Groups" OWNER TO postgres;

--
-- Name: Options; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Options" (
    "OptionID" uuid NOT NULL,
    "SentimentID" integer NOT NULL,
    "Option" character varying(64) NOT NULL,
    "Description" character varying(512),
    "createdAt" timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


ALTER TABLE public."Options" OWNER TO postgres;

--
-- Name: PollQuestionJoins; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."PollQuestionJoins" (
    "PollQuestionID" uuid NOT NULL,
    "PollID" uuid NOT NULL,
    "QuestionID" uuid NOT NULL,
    "createdAt" timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


ALTER TABLE public."PollQuestionJoins" OWNER TO postgres;

--
-- Name: Polls; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Polls" (
    "PollID" uuid NOT NULL,
    "TypeID" uuid NOT NULL,
    "GroupID" uuid NOT NULL,
    "Title" character varying(64) NOT NULL,
    "Description" character varying(512) NOT NULL,
    "IsClosed" boolean DEFAULT false NOT NULL,
    "createdAt" timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


ALTER TABLE public."Polls" OWNER TO postgres;

--
-- Name: QuestionOptionJoins; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."QuestionOptionJoins" (
    "QuestionOptionID" uuid NOT NULL,
    "QuestionID" uuid NOT NULL,
    "OptionID" uuid NOT NULL,
    "createdAt" timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


ALTER TABLE public."QuestionOptionJoins" OWNER TO postgres;

--
-- Name: Questions; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Questions" (
    "QuestionID" uuid NOT NULL,
    "Question" character varying(128) NOT NULL,
    "Date" timestamp with time zone NOT NULL,
    "Duration" integer NOT NULL,
    "Description" character varying(512) NOT NULL,
    "createdAt" timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


ALTER TABLE public."Questions" OWNER TO postgres;

--
-- Name: Sentiments; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Sentiments" (
    "SentimentID" integer NOT NULL,
    "Sentiment" character varying(1) NOT NULL,
    "createdAt" timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


ALTER TABLE public."Sentiments" OWNER TO postgres;

--
-- Name: Sentiments_SentimentID_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."Sentiments_SentimentID_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."Sentiments_SentimentID_seq" OWNER TO postgres;

--
-- Name: Sentiments_SentimentID_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."Sentiments_SentimentID_seq" OWNED BY public."Sentiments"."SentimentID";


--
-- Name: SequelizeMeta; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."SequelizeMeta" (
    name character varying(255) NOT NULL
);


ALTER TABLE public."SequelizeMeta" OWNER TO postgres;

--
-- Name: Types; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Types" (
    "TypeID" uuid NOT NULL,
    "Label" character varying(64) NOT NULL,
    "createdAt" timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


ALTER TABLE public."Types" OWNER TO postgres;

--
-- Name: Bands BandID; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Bands" ALTER COLUMN "BandID" SET DEFAULT nextval('public."Bands_BandID_seq"'::regclass);


--
-- Name: Sentiments SentimentID; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Sentiments" ALTER COLUMN "SentimentID" SET DEFAULT nextval('public."Sentiments_SentimentID_seq"'::regclass);


--
-- Data for Name: Accounts; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public."Accounts" VALUES ('f56a0556-a858-4878-99b0-8dc17801b3e9', 'test', 'test', 'test@test.com', '$2b$10$yrPyPLB8MruPaoktknEMSuCuU17O2x99VkynvclDVLELlJB7wgCn6', '2026-11-15 23:28:28.078+00', '2026-11-15 23:28:28.078+00') ON CONFLICT DO NOTHING;
INSERT INTO public."Accounts" VALUES ('8c3b4b56-16da-4b9a-b443-1839e29ca1da', 'Anna', 'Example', 'anna@example.com', '$2b$10$nhW5sznH9A29Wxnhet9ccu88j9J/6nSyQXZTGEa2yf5leFWHTbxLq', '2026-11-15 23:28:32.496+00', '2026-11-15 23:28:32.496+00') ON CONFLICT DO NOTHING;
INSERT INTO public."Accounts" VALUES ('494a53d4-8f75-423f-b525-5e5e3be6631f', 'Ben', 'Sample', 'ben@example.com', '$2b$10$Cqznp03d7Plet/z3V01FaOdyg1QWgCRc7eAyJdOE/57Jkg1XrQ/0q', '2026-11-15 23:28:32.577+00', '2026-11-15 23:28:32.577+00') ON CONFLICT DO NOTHING;
INSERT INTO public."Accounts" VALUES ('2c6c78d7-9798-4493-bfd3-e99d18bdd0ff', 'Carla', 'Demo', 'carla@example.com', '$2b$10$NC0oSuebT6h9CKJJAt4ex..MLWLrcGW1DNz03H/d6y5JI5Nb.Ys0S', '2026-11-15 23:28:32.658+00', '2026-11-15 23:28:32.658+00') ON CONFLICT DO NOTHING;
INSERT INTO public."Accounts" VALUES ('df3ddc12-2e59-40d4-b0d6-f2850ca2c7fa', 'David', 'Placeholder', 'david@example.com', '$2b$10$ixSWTMxASWjWA42g9yGVvuSXYS9FMI5nYaKg2aurstEXeKbln7yWa', '2026-11-15 23:28:32.714+00', '2026-11-15 23:28:32.714+00') ON CONFLICT DO NOTHING;
INSERT INTO public."Accounts" VALUES ('d5a6459f-d0cf-4926-b264-5dc300e88200', 'Eva', 'Muster', 'eva@example.com', '$2b$10$RU5qhYhwzRHLrf4CFTI4kO26fT9gqIBbyT6vao.5XLS8T.bNO/GHW', '2026-11-15 23:28:32.769+00', '2026-11-15 23:28:32.769+00') ON CONFLICT DO NOTHING;
INSERT INTO public."Accounts" VALUES ('bf6eb820-d081-4829-b0d4-b6280d47bc8c', 'Felix', 'Beispiel', 'felix@example.com', '$2b$10$Mr4tdKWOZgt9IQOhWfYZVuieg5VsBcaLlfbZIlTat957bqHaTRj7G', '2026-11-15 23:28:32.824+00', '2026-11-15 23:28:32.824+00') ON CONFLICT DO NOTHING;
INSERT INTO public."Accounts" VALUES ('8697b469-25a5-4cc8-a997-d57cceae130f', 'Gina', 'Testperson', 'gina@example.com', '$2b$10$rIVIKBjKLlyIf4637rYEIuweWwf9/yAyGfSvym.B.OBsz862tB.x2', '2026-11-15 23:28:32.88+00', '2026-11-15 23:28:32.88+00') ON CONFLICT DO NOTHING;
INSERT INTO public."Accounts" VALUES ('839cf73c-320d-4ba4-bab4-6aacc60bd51b', 'Hugo', 'Fictional', 'hugo@example.com', '$2b$10$Cd/AWPwF/l2MCGEPtYSaA.x7hZoQG3j3GGANMDy3A9BGTHFZH.Bau', '2026-11-15 23:28:32.934+00', '2026-11-15 23:28:32.934+00') ON CONFLICT DO NOTHING;


--
-- Data for Name: Answers; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public."Answers" VALUES ('c36dd746-edad-437a-be10-0048795ed879', 'b65d7d29-965c-4597-a78a-3da2517c8616', '5fdb9785-ca44-4e5f-85db-76c449c6a69e', 'eca5981d-670d-42c5-aefb-3f3af1b062e8', '2026-11-15 23:28:33.064+00', '2026-11-15 23:28:33.064+00') ON CONFLICT DO NOTHING;
INSERT INTO public."Answers" VALUES ('b0326329-5529-41e9-826a-80e5e8d2565d', 'b65d7d29-965c-4597-a78a-3da2517c8616', '43c13bc5-66ad-4fb2-85a4-a440ebca176f', 'eca5981d-670d-42c5-aefb-3f3af1b062e8', '2026-11-15 23:28:33.067+00', '2026-11-15 23:28:33.067+00') ON CONFLICT DO NOTHING;
INSERT INTO public."Answers" VALUES ('a1f70b2c-b743-4d29-add1-36d4b56f928f', 'b65d7d29-965c-4597-a78a-3da2517c8616', 'f8d76aff-460f-451a-b38a-18b13ef1316c', 'eca5981d-670d-42c5-aefb-3f3af1b062e8', '2026-11-15 23:28:33.068+00', '2026-11-15 23:28:33.068+00') ON CONFLICT DO NOTHING;
INSERT INTO public."Answers" VALUES ('e7d887d3-73bb-4c31-a121-de40e5d4a638', '389e15c8-ce14-4ef7-b308-80c21d1f057a', '5fdb9785-ca44-4e5f-85db-76c449c6a69e', 'eca5981d-670d-42c5-aefb-3f3af1b062e8', '2026-11-15 23:28:33.071+00', '2026-11-15 23:28:33.071+00') ON CONFLICT DO NOTHING;
INSERT INTO public."Answers" VALUES ('c8dd4921-6427-45cf-ae0d-0c1fda8ef0e3', '389e15c8-ce14-4ef7-b308-80c21d1f057a', '43c13bc5-66ad-4fb2-85a4-a440ebca176f', 'eca5981d-670d-42c5-aefb-3f3af1b062e8', '2026-11-15 23:28:33.074+00', '2026-11-15 23:28:33.074+00') ON CONFLICT DO NOTHING;
INSERT INTO public."Answers" VALUES ('4efb7347-b20c-4e95-8536-f34665492737', '389e15c8-ce14-4ef7-b308-80c21d1f057a', 'f8d76aff-460f-451a-b38a-18b13ef1316c', 'eca5981d-670d-42c5-aefb-3f3af1b062e8', '2026-11-15 23:28:33.074+00', '2026-11-15 23:28:33.074+00') ON CONFLICT DO NOTHING;
INSERT INTO public."Answers" VALUES ('57209f86-8253-4575-a34f-2747c8b60d98', '17a2b290-7bd1-487d-926b-22882dcbfe19', '5945491a-b471-485b-860f-c156cf4875db', 'eca5981d-670d-42c5-aefb-3f3af1b062e8', '2026-11-15 23:28:33.082+00', '2026-11-15 23:28:33.082+00') ON CONFLICT DO NOTHING;
INSERT INTO public."Answers" VALUES ('96cf574c-5ab4-478f-b3a9-d7af1e67af00', '17a2b290-7bd1-487d-926b-22882dcbfe19', '7f1e3ef7-6d1b-4057-92e4-9b163d9f5530', 'eca5981d-670d-42c5-aefb-3f3af1b062e8', '2026-11-15 23:28:33.084+00', '2026-11-15 23:28:33.084+00') ON CONFLICT DO NOTHING;
INSERT INTO public."Answers" VALUES ('8d54f9c4-2c60-4cc8-a0a2-32a20c37b4cf', 'b2be2b7f-59d6-4035-b611-52402763bcde', '5fdb9785-ca44-4e5f-85db-76c449c6a69e', 'eca5981d-670d-42c5-aefb-3f3af1b062e8', '2026-11-15 23:28:33.092+00', '2026-11-15 23:28:33.092+00') ON CONFLICT DO NOTHING;
INSERT INTO public."Answers" VALUES ('27a6b07f-c896-4cb5-b7d6-717d53b043e1', 'b2be2b7f-59d6-4035-b611-52402763bcde', '1d9b0345-088f-4df2-b2d9-fa1cc972dbf3', 'eca5981d-670d-42c5-aefb-3f3af1b062e8', '2026-11-15 23:28:33.093+00', '2026-11-15 23:28:33.093+00') ON CONFLICT DO NOTHING;
INSERT INTO public."Answers" VALUES ('8d035805-185b-4bcc-846f-75d796bdf709', 'b2be2b7f-59d6-4035-b611-52402763bcde', '300df1d4-4e9f-4fbd-8858-066c06dcb3d1', 'eca5981d-670d-42c5-aefb-3f3af1b062e8', '2026-11-15 23:28:33.093+00', '2026-11-15 23:28:33.093+00') ON CONFLICT DO NOTHING;
INSERT INTO public."Answers" VALUES ('fe5d093c-2a42-492e-9247-31a1d12f56fb', 'b2be2b7f-59d6-4035-b611-52402763bcde', 'd5f3196a-f946-47a6-abb5-2598e2d99a63', 'eca5981d-670d-42c5-aefb-3f3af1b062e8', '2026-11-15 23:28:33.094+00', '2026-11-15 23:28:33.094+00') ON CONFLICT DO NOTHING;
INSERT INTO public."Answers" VALUES ('0f2c5c70-1903-4930-8747-e1d9c69b5af9', 'b2be2b7f-59d6-4035-b611-52402763bcde', '4439aed1-5503-4eda-b2a3-089889c906bf', 'eca5981d-670d-42c5-aefb-3f3af1b062e8', '2026-11-15 23:28:33.094+00', '2026-11-15 23:28:33.094+00') ON CONFLICT DO NOTHING;
INSERT INTO public."Answers" VALUES ('ae8f70eb-4f51-4069-818f-ff9c906b8961', 'b2be2b7f-59d6-4035-b611-52402763bcde', '8c446af7-dcbc-4035-bfbf-d4bd31f30351', 'eca5981d-670d-42c5-aefb-3f3af1b062e8', '2026-11-15 23:28:33.094+00', '2026-11-15 23:28:33.094+00') ON CONFLICT DO NOTHING;
INSERT INTO public."Answers" VALUES ('27f8efda-ce1e-4b24-ba51-5a4caa1ee040', '7752e659-9f1c-42fd-b175-eebeb3c7fc39', '5fdb9785-ca44-4e5f-85db-76c449c6a69e', 'eca5981d-670d-42c5-aefb-3f3af1b062e8', '2026-11-15 23:28:33.098+00', '2026-11-15 23:28:33.098+00') ON CONFLICT DO NOTHING;
INSERT INTO public."Answers" VALUES ('be84ff2c-ee28-417a-8b90-e600bfe41302', '7752e659-9f1c-42fd-b175-eebeb3c7fc39', '1d9b0345-088f-4df2-b2d9-fa1cc972dbf3', 'eca5981d-670d-42c5-aefb-3f3af1b062e8', '2026-11-15 23:28:33.099+00', '2026-11-15 23:28:33.099+00') ON CONFLICT DO NOTHING;
INSERT INTO public."Answers" VALUES ('8905e855-5328-42c7-8f3a-56f7803bfce4', '7752e659-9f1c-42fd-b175-eebeb3c7fc39', '300df1d4-4e9f-4fbd-8858-066c06dcb3d1', 'eca5981d-670d-42c5-aefb-3f3af1b062e8', '2026-11-15 23:28:33.099+00', '2026-11-15 23:28:33.099+00') ON CONFLICT DO NOTHING;
INSERT INTO public."Answers" VALUES ('d3466268-72c2-467e-a8c2-5fea28a48d9a', '7752e659-9f1c-42fd-b175-eebeb3c7fc39', 'd5f3196a-f946-47a6-abb5-2598e2d99a63', 'eca5981d-670d-42c5-aefb-3f3af1b062e8', '2026-11-15 23:28:33.1+00', '2026-11-15 23:28:33.1+00') ON CONFLICT DO NOTHING;
INSERT INTO public."Answers" VALUES ('7d5d4e2a-e753-4e9c-952d-84c21995a31c', '7752e659-9f1c-42fd-b175-eebeb3c7fc39', '4439aed1-5503-4eda-b2a3-089889c906bf', 'eca5981d-670d-42c5-aefb-3f3af1b062e8', '2026-11-15 23:28:33.1+00', '2026-11-15 23:28:33.1+00') ON CONFLICT DO NOTHING;
INSERT INTO public."Answers" VALUES ('3063d06e-9f2d-46c0-8e96-234e7d5d5788', '7752e659-9f1c-42fd-b175-eebeb3c7fc39', '8c446af7-dcbc-4035-bfbf-d4bd31f30351', 'eca5981d-670d-42c5-aefb-3f3af1b062e8', '2026-11-15 23:28:33.101+00', '2026-11-15 23:28:33.101+00') ON CONFLICT DO NOTHING;
INSERT INTO public."Answers" VALUES ('fc4d2d8b-5ed3-41c7-9c95-61fcde929194', 'b65d7d29-965c-4597-a78a-3da2517c8616', '1d9b0345-088f-4df2-b2d9-fa1cc972dbf3', 'e115f10d-6147-4f3d-ae40-7cbfa0f01bb5', '2026-11-15 23:28:33.065+00', '2026-11-15 23:28:44.624+00') ON CONFLICT DO NOTHING;
INSERT INTO public."Answers" VALUES ('512d80db-09b5-4161-985f-f0153659b982', '389e15c8-ce14-4ef7-b308-80c21d1f057a', '1d9b0345-088f-4df2-b2d9-fa1cc972dbf3', '279b4e74-edfd-453f-9830-b981dfcce228', '2026-11-15 23:28:33.072+00', '2026-11-15 23:28:44.625+00') ON CONFLICT DO NOTHING;
INSERT INTO public."Answers" VALUES ('0389ddd4-dcf1-4f6d-a614-82084ab07ee1', 'b65d7d29-965c-4597-a78a-3da2517c8616', '300df1d4-4e9f-4fbd-8858-066c06dcb3d1', 'e115f10d-6147-4f3d-ae40-7cbfa0f01bb5', '2026-11-15 23:28:33.066+00', '2026-11-15 23:28:44.652+00') ON CONFLICT DO NOTHING;
INSERT INTO public."Answers" VALUES ('18ca81ea-3357-4e68-8381-1cea90a2e02c', '389e15c8-ce14-4ef7-b308-80c21d1f057a', '300df1d4-4e9f-4fbd-8858-066c06dcb3d1', 'e115f10d-6147-4f3d-ae40-7cbfa0f01bb5', '2026-11-15 23:28:33.072+00', '2026-11-15 23:28:44.653+00') ON CONFLICT DO NOTHING;
INSERT INTO public."Answers" VALUES ('ff61ce9b-eba8-450b-bd97-0e79543ac66f', 'b65d7d29-965c-4597-a78a-3da2517c8616', 'd5f3196a-f946-47a6-abb5-2598e2d99a63', '279b4e74-edfd-453f-9830-b981dfcce228', '2026-11-15 23:28:33.066+00', '2026-11-15 23:28:44.676+00') ON CONFLICT DO NOTHING;
INSERT INTO public."Answers" VALUES ('eaf7dcc0-ed62-4406-b675-1f65324a61b0', '389e15c8-ce14-4ef7-b308-80c21d1f057a', 'd5f3196a-f946-47a6-abb5-2598e2d99a63', 'e115f10d-6147-4f3d-ae40-7cbfa0f01bb5', '2026-11-15 23:28:33.073+00', '2026-11-15 23:28:44.677+00') ON CONFLICT DO NOTHING;
INSERT INTO public."Answers" VALUES ('22e882cb-8305-48bf-b083-b7142a63bd8d', 'b65d7d29-965c-4597-a78a-3da2517c8616', '4439aed1-5503-4eda-b2a3-089889c906bf', 'e115f10d-6147-4f3d-ae40-7cbfa0f01bb5', '2026-11-15 23:28:33.066+00', '2026-11-15 23:28:44.699+00') ON CONFLICT DO NOTHING;
INSERT INTO public."Answers" VALUES ('681a7961-e5b5-4711-abae-be0a45bd63c0', '389e15c8-ce14-4ef7-b308-80c21d1f057a', '4439aed1-5503-4eda-b2a3-089889c906bf', '832611fd-1330-4e02-8199-4596f654af0d', '2026-11-15 23:28:33.073+00', '2026-11-15 23:28:44.699+00') ON CONFLICT DO NOTHING;
INSERT INTO public."Answers" VALUES ('37d3bd36-e3bd-4753-b29e-41f0444b1c45', 'b65d7d29-965c-4597-a78a-3da2517c8616', '8c446af7-dcbc-4035-bfbf-d4bd31f30351', 'e115f10d-6147-4f3d-ae40-7cbfa0f01bb5', '2026-11-15 23:28:33.067+00', '2026-11-15 23:28:44.719+00') ON CONFLICT DO NOTHING;
INSERT INTO public."Answers" VALUES ('95a78b8a-fb2c-4c09-9ac5-f1009efadc89', '389e15c8-ce14-4ef7-b308-80c21d1f057a', '8c446af7-dcbc-4035-bfbf-d4bd31f30351', '279b4e74-edfd-453f-9830-b981dfcce228', '2026-11-15 23:28:33.073+00', '2026-11-15 23:28:44.72+00') ON CONFLICT DO NOTHING;
INSERT INTO public."Answers" VALUES ('52577220-8a7b-448e-ad2d-2aa22456ba6e', '17a2b290-7bd1-487d-926b-22882dcbfe19', 'bf2f66fd-643f-4957-bad4-8bfd29708915', 'e115f10d-6147-4f3d-ae40-7cbfa0f01bb5', '2026-11-15 23:28:33.083+00', '2026-11-15 23:28:44.73+00') ON CONFLICT DO NOTHING;
INSERT INTO public."Answers" VALUES ('dc3c6243-b465-41d4-8401-2a88035c5d72', '17a2b290-7bd1-487d-926b-22882dcbfe19', '4d788fdd-087d-423b-bc7b-06f65c1c15b5', 'e115f10d-6147-4f3d-ae40-7cbfa0f01bb5', '2026-11-15 23:28:33.083+00', '2026-11-15 23:28:44.742+00') ON CONFLICT DO NOTHING;
INSERT INTO public."Answers" VALUES ('f3f3ae33-f211-4cdb-9097-9d396be8afea', '17a2b290-7bd1-487d-926b-22882dcbfe19', '364815db-d155-4289-958b-61674fe018ef', '279b4e74-edfd-453f-9830-b981dfcce228', '2026-11-15 23:28:33.084+00', '2026-11-15 23:28:44.754+00') ON CONFLICT DO NOTHING;
INSERT INTO public."Answers" VALUES ('fafd01b8-4090-4e90-861e-b2066bc1e4bb', 'b2be2b7f-59d6-4035-b611-52402763bcde', '43c13bc5-66ad-4fb2-85a4-a440ebca176f', 'e115f10d-6147-4f3d-ae40-7cbfa0f01bb5', '2026-11-15 23:28:33.095+00', '2026-11-15 23:28:44.771+00') ON CONFLICT DO NOTHING;
INSERT INTO public."Answers" VALUES ('c560ee74-477e-4038-89a9-0728dacb7d5b', '7752e659-9f1c-42fd-b175-eebeb3c7fc39', '43c13bc5-66ad-4fb2-85a4-a440ebca176f', 'e115f10d-6147-4f3d-ae40-7cbfa0f01bb5', '2026-11-15 23:28:33.101+00', '2026-11-15 23:28:44.771+00') ON CONFLICT DO NOTHING;
INSERT INTO public."Answers" VALUES ('d04fe7c2-1bf5-454b-8f56-0b43a6522bf5', 'b2be2b7f-59d6-4035-b611-52402763bcde', 'f8d76aff-460f-451a-b38a-18b13ef1316c', '279b4e74-edfd-453f-9830-b981dfcce228', '2026-11-15 23:28:33.095+00', '2026-11-15 23:28:44.791+00') ON CONFLICT DO NOTHING;
INSERT INTO public."Answers" VALUES ('10f54ad2-d4f1-42cc-aba6-5c2348fd5ab4', '7752e659-9f1c-42fd-b175-eebeb3c7fc39', 'f8d76aff-460f-451a-b38a-18b13ef1316c', 'e115f10d-6147-4f3d-ae40-7cbfa0f01bb5', '2026-11-15 23:28:33.102+00', '2026-11-15 23:28:44.792+00') ON CONFLICT DO NOTHING;


--
-- Data for Name: Bands; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public."Bands" VALUES (1, 'NoHeadBand', '2026-11-15 23:28:28.049+00', '2026-11-15 23:28:28.049+00') ON CONFLICT DO NOTHING;


--
-- Data for Name: Events; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public."Events" VALUES ('4d5457a6-f89e-48ed-8586-1c6009a3cd22', '41815db7-2236-468f-9f5d-e603d9467ec0', 'fed671de-90d9-43a2-a245-8780c8596664', 'Annual general meeting', 'Agenda follows by email', 'Rehearsal room', '2027-01-15 18:30:00+00', 120, '2026-11-15 23:28:33.044+00', '2026-11-15 23:28:33.044+00') ON CONFLICT DO NOTHING;
INSERT INTO public."Events" VALUES ('edbd0bbe-d730-4eac-b414-5971089a1a88', '41815db7-2236-468f-9f5d-e603d9467ec0', '7731f4d2-da1c-41ba-a227-b74ef0af8a70', 'Rehearsal weekend', 'Bring your own music stand', 'Rehearsal room', '2027-02-20 08:00:00+00', 480, '2026-11-15 23:28:33.048+00', '2026-11-15 23:28:33.048+00') ON CONFLICT DO NOTHING;
INSERT INTO public."Events" VALUES ('c1ceb8ba-ad00-4b95-b6e7-db42cb8377c9', '96637656-fa54-4869-94ff-64eb2b766f97', '0c0c1f03-1373-4cbc-89af-d8a72f7b43d8', 'Reception at the town hall', 'Two sets of 30 minutes', 'Town hall', '2027-03-05 17:00:00+00', 90, '2026-11-15 23:28:33.051+00', '2026-11-15 23:28:33.051+00') ON CONFLICT DO NOTHING;
INSERT INTO public."Events" VALUES ('430d8af2-4ce2-4a71-8b41-d56583475752', 'd655b2d4-776e-49cd-aca7-87fc6835ac3c', '0c0c1f03-1373-4cbc-89af-d8a72f7b43d8', 'Wedding party', 'Dance set, three blocks', 'Village hall', '2027-04-24 18:00:00+00', 240, '2026-11-15 23:28:33.055+00', '2026-11-15 23:28:33.055+00') ON CONFLICT DO NOTHING;


--
-- Data for Name: GroupMembers; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public."GroupMembers" VALUES ('5fdb9785-ca44-4e5f-85db-76c449c6a69e', '41815db7-2236-468f-9f5d-e603d9467ec0', '8c3b4b56-16da-4b9a-b443-1839e29ca1da', '2026-11-15 23:28:32.999+00', '2026-11-15 23:28:32.999+00') ON CONFLICT DO NOTHING;
INSERT INTO public."GroupMembers" VALUES ('1d9b0345-088f-4df2-b2d9-fa1cc972dbf3', '41815db7-2236-468f-9f5d-e603d9467ec0', '494a53d4-8f75-423f-b525-5e5e3be6631f', '2026-11-15 23:28:33.005+00', '2026-11-15 23:28:33.005+00') ON CONFLICT DO NOTHING;
INSERT INTO public."GroupMembers" VALUES ('300df1d4-4e9f-4fbd-8858-066c06dcb3d1', '41815db7-2236-468f-9f5d-e603d9467ec0', '2c6c78d7-9798-4493-bfd3-e99d18bdd0ff', '2026-11-15 23:28:33.006+00', '2026-11-15 23:28:33.006+00') ON CONFLICT DO NOTHING;
INSERT INTO public."GroupMembers" VALUES ('d5f3196a-f946-47a6-abb5-2598e2d99a63', '41815db7-2236-468f-9f5d-e603d9467ec0', 'df3ddc12-2e59-40d4-b0d6-f2850ca2c7fa', '2026-11-15 23:28:33.007+00', '2026-11-15 23:28:33.007+00') ON CONFLICT DO NOTHING;
INSERT INTO public."GroupMembers" VALUES ('4439aed1-5503-4eda-b2a3-089889c906bf', '41815db7-2236-468f-9f5d-e603d9467ec0', 'd5a6459f-d0cf-4926-b264-5dc300e88200', '2026-11-15 23:28:33.008+00', '2026-11-15 23:28:33.008+00') ON CONFLICT DO NOTHING;
INSERT INTO public."GroupMembers" VALUES ('8c446af7-dcbc-4035-bfbf-d4bd31f30351', '41815db7-2236-468f-9f5d-e603d9467ec0', 'bf6eb820-d081-4829-b0d4-b6280d47bc8c', '2026-11-15 23:28:33.009+00', '2026-11-15 23:28:33.009+00') ON CONFLICT DO NOTHING;
INSERT INTO public."GroupMembers" VALUES ('43c13bc5-66ad-4fb2-85a4-a440ebca176f', '41815db7-2236-468f-9f5d-e603d9467ec0', '8697b469-25a5-4cc8-a997-d57cceae130f', '2026-11-15 23:28:33.011+00', '2026-11-15 23:28:33.011+00') ON CONFLICT DO NOTHING;
INSERT INTO public."GroupMembers" VALUES ('f8d76aff-460f-451a-b38a-18b13ef1316c', '41815db7-2236-468f-9f5d-e603d9467ec0', '839cf73c-320d-4ba4-bab4-6aacc60bd51b', '2026-11-15 23:28:33.013+00', '2026-11-15 23:28:33.013+00') ON CONFLICT DO NOTHING;
INSERT INTO public."GroupMembers" VALUES ('5945491a-b471-485b-860f-c156cf4875db', '96637656-fa54-4869-94ff-64eb2b766f97', '8c3b4b56-16da-4b9a-b443-1839e29ca1da', '2026-11-15 23:28:33.023+00', '2026-11-15 23:28:33.023+00') ON CONFLICT DO NOTHING;
INSERT INTO public."GroupMembers" VALUES ('bf2f66fd-643f-4957-bad4-8bfd29708915', '96637656-fa54-4869-94ff-64eb2b766f97', '494a53d4-8f75-423f-b525-5e5e3be6631f', '2026-11-15 23:28:33.024+00', '2026-11-15 23:28:33.024+00') ON CONFLICT DO NOTHING;
INSERT INTO public."GroupMembers" VALUES ('4d788fdd-087d-423b-bc7b-06f65c1c15b5', '96637656-fa54-4869-94ff-64eb2b766f97', '2c6c78d7-9798-4493-bfd3-e99d18bdd0ff', '2026-11-15 23:28:33.025+00', '2026-11-15 23:28:33.025+00') ON CONFLICT DO NOTHING;
INSERT INTO public."GroupMembers" VALUES ('7f1e3ef7-6d1b-4057-92e4-9b163d9f5530', '96637656-fa54-4869-94ff-64eb2b766f97', 'df3ddc12-2e59-40d4-b0d6-f2850ca2c7fa', '2026-11-15 23:28:33.026+00', '2026-11-15 23:28:33.026+00') ON CONFLICT DO NOTHING;
INSERT INTO public."GroupMembers" VALUES ('364815db-d155-4289-958b-61674fe018ef', '96637656-fa54-4869-94ff-64eb2b766f97', 'd5a6459f-d0cf-4926-b264-5dc300e88200', '2026-11-15 23:28:33.027+00', '2026-11-15 23:28:33.027+00') ON CONFLICT DO NOTHING;
INSERT INTO public."GroupMembers" VALUES ('60e80b84-b37d-4564-aab2-5be271636151', 'd655b2d4-776e-49cd-aca7-87fc6835ac3c', '8c3b4b56-16da-4b9a-b443-1839e29ca1da', '2026-11-15 23:28:33.032+00', '2026-11-15 23:28:33.032+00') ON CONFLICT DO NOTHING;
INSERT INTO public."GroupMembers" VALUES ('2e1b87a3-cda8-4656-8f3f-982e9ba58049', 'd655b2d4-776e-49cd-aca7-87fc6835ac3c', '494a53d4-8f75-423f-b525-5e5e3be6631f', '2026-11-15 23:28:33.033+00', '2026-11-15 23:28:33.033+00') ON CONFLICT DO NOTHING;
INSERT INTO public."GroupMembers" VALUES ('ff3d2dee-04e2-4d6b-a69e-afd6773ef5d6', 'd655b2d4-776e-49cd-aca7-87fc6835ac3c', 'bf6eb820-d081-4829-b0d4-b6280d47bc8c', '2026-11-15 23:28:33.034+00', '2026-11-15 23:28:33.034+00') ON CONFLICT DO NOTHING;
INSERT INTO public."GroupMembers" VALUES ('7769f26a-66b9-4112-8e55-342bc1c3e9a7', 'd655b2d4-776e-49cd-aca7-87fc6835ac3c', '8697b469-25a5-4cc8-a997-d57cceae130f', '2026-11-15 23:28:33.034+00', '2026-11-15 23:28:33.034+00') ON CONFLICT DO NOTHING;
INSERT INTO public."GroupMembers" VALUES ('e072b4c2-9f03-44c3-8a67-6bbe44e90909', 'd655b2d4-776e-49cd-aca7-87fc6835ac3c', '839cf73c-320d-4ba4-bab4-6aacc60bd51b', '2026-11-15 23:28:33.035+00', '2026-11-15 23:28:33.035+00') ON CONFLICT DO NOTHING;


--
-- Data for Name: Groups; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public."Groups" VALUES ('41815db7-2236-468f-9f5d-e603d9467ec0', 1, 'Full band', 'Everyone in the band', '2026-11-15 23:28:32.997+00', '2026-11-15 23:28:32.997+00') ON CONFLICT DO NOTHING;
INSERT INTO public."Groups" VALUES ('96637656-fa54-4869-94ff-64eb2b766f97', 1, 'Brass quintet', 'Small line-up for receptions', '2026-11-15 23:28:33.022+00', '2026-11-15 23:28:33.022+00') ON CONFLICT DO NOTHING;
INSERT INTO public."Groups" VALUES ('d655b2d4-776e-49cd-aca7-87fc6835ac3c', 1, 'Party set', 'Line-up for parties and weddings', '2026-11-15 23:28:33.031+00', '2026-11-15 23:28:33.031+00') ON CONFLICT DO NOTHING;


--
-- Data for Name: Options; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public."Options" VALUES ('eca5981d-670d-42c5-aefb-3f3af1b062e8', 1, 'unanswered', 'Standard for unanswered questions', '2026-11-15 23:28:28.071+00', '2026-11-15 23:28:28.071+00') ON CONFLICT DO NOTHING;
INSERT INTO public."Options" VALUES ('279b4e74-edfd-453f-9830-b981dfcce228', 2, 'no', 'Give a negative answer', '2026-11-15 23:28:28.071+00', '2026-11-15 23:28:28.071+00') ON CONFLICT DO NOTHING;
INSERT INTO public."Options" VALUES ('e115f10d-6147-4f3d-ae40-7cbfa0f01bb5', 3, 'yes', 'Give a positive answer', '2026-11-15 23:28:28.071+00', '2026-11-15 23:28:28.071+00') ON CONFLICT DO NOTHING;
INSERT INTO public."Options" VALUES ('832611fd-1330-4e02-8199-4596f654af0d', 4, 'i don''t know yet', 'Pass up on giving an answer at this moment', '2026-11-15 23:28:28.071+00', '2026-11-15 23:28:28.071+00') ON CONFLICT DO NOTHING;
INSERT INTO public."Options" VALUES ('5fa25003-8f18-4463-8347-c34896615111', 4, 'i don''t care', 'Give an undefinitive answer', '2026-11-15 23:28:28.071+00', '2026-11-15 23:28:28.071+00') ON CONFLICT DO NOTHING;


--
-- Data for Name: PollQuestionJoins; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public."PollQuestionJoins" VALUES ('b39195ae-b361-4436-a359-af6a324aa964', 'ad94ae18-647e-4a29-aab3-02e83d83cdbb', 'b65d7d29-965c-4597-a78a-3da2517c8616', '2026-11-15 23:28:33.062+00', '2026-11-15 23:28:33.062+00') ON CONFLICT DO NOTHING;
INSERT INTO public."PollQuestionJoins" VALUES ('10c7592b-166f-43e3-8c00-3cdcffdae5ad', 'ad94ae18-647e-4a29-aab3-02e83d83cdbb', '389e15c8-ce14-4ef7-b308-80c21d1f057a', '2026-11-15 23:28:33.069+00', '2026-11-15 23:28:33.069+00') ON CONFLICT DO NOTHING;
INSERT INTO public."PollQuestionJoins" VALUES ('f4dee16b-c3ab-49f5-87c9-3df06f431b65', '2c89329a-10fe-4b1a-829b-4f4e14e37c47', '17a2b290-7bd1-487d-926b-22882dcbfe19', '2026-11-15 23:28:33.08+00', '2026-11-15 23:28:33.08+00') ON CONFLICT DO NOTHING;
INSERT INTO public."PollQuestionJoins" VALUES ('96ace78b-fe95-4ea9-8ad2-909e45778376', '42feec0b-5a65-47b1-931e-8005ac295043', 'b2be2b7f-59d6-4035-b611-52402763bcde', '2026-11-15 23:28:33.09+00', '2026-11-15 23:28:33.09+00') ON CONFLICT DO NOTHING;
INSERT INTO public."PollQuestionJoins" VALUES ('89686a68-640a-439d-a625-44326d24821a', '42feec0b-5a65-47b1-931e-8005ac295043', '7752e659-9f1c-42fd-b175-eebeb3c7fc39', '2026-11-15 23:28:33.096+00', '2026-11-15 23:28:33.096+00') ON CONFLICT DO NOTHING;


--
-- Data for Name: Polls; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public."Polls" VALUES ('ad94ae18-647e-4a29-aab3-02e83d83cdbb', '7731f4d2-da1c-41ba-a227-b74ef0af8a70', '41815db7-2236-468f-9f5d-e603d9467ec0', 'Extra rehearsal', 'Which evening suits you?', false, '2026-11-15 23:28:33.059+00', '2026-11-15 23:28:33.059+00') ON CONFLICT DO NOTHING;
INSERT INTO public."Polls" VALUES ('2c89329a-10fe-4b1a-829b-4f4e14e37c47', '0c0c1f03-1373-4cbc-89af-d8a72f7b43d8', '96637656-fa54-4869-94ff-64eb2b766f97', 'Gig request: spring market', 'Are you available?', false, '2026-11-15 23:28:33.079+00', '2026-11-15 23:28:33.079+00') ON CONFLICT DO NOTHING;
INSERT INTO public."Polls" VALUES ('42feec0b-5a65-47b1-931e-8005ac295043', 'cff8545b-a5b8-4e47-bc41-50e0ccf25126', '41815db7-2236-468f-9f5d-e603d9467ec0', 'Band get-together', 'Social evening after the season', false, '2026-11-15 23:28:33.088+00', '2026-11-15 23:28:33.088+00') ON CONFLICT DO NOTHING;


--
-- Data for Name: QuestionOptionJoins; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public."QuestionOptionJoins" VALUES ('7dbb432d-9638-4bf6-9e5d-e3b327d04118', 'b65d7d29-965c-4597-a78a-3da2517c8616', 'e115f10d-6147-4f3d-ae40-7cbfa0f01bb5', '2026-11-15 23:28:33.062+00', '2026-11-15 23:28:33.062+00') ON CONFLICT DO NOTHING;
INSERT INTO public."QuestionOptionJoins" VALUES ('0da0673b-6053-493a-9ae7-dda2199d9021', 'b65d7d29-965c-4597-a78a-3da2517c8616', '279b4e74-edfd-453f-9830-b981dfcce228', '2026-11-15 23:28:33.063+00', '2026-11-15 23:28:33.063+00') ON CONFLICT DO NOTHING;
INSERT INTO public."QuestionOptionJoins" VALUES ('3e03d05d-f4fd-4022-bf16-2134a32453ba', 'b65d7d29-965c-4597-a78a-3da2517c8616', '832611fd-1330-4e02-8199-4596f654af0d', '2026-11-15 23:28:33.064+00', '2026-11-15 23:28:33.064+00') ON CONFLICT DO NOTHING;
INSERT INTO public."QuestionOptionJoins" VALUES ('6e8155a2-d9f3-4968-850d-6968b07c8648', '389e15c8-ce14-4ef7-b308-80c21d1f057a', 'e115f10d-6147-4f3d-ae40-7cbfa0f01bb5', '2026-11-15 23:28:33.069+00', '2026-11-15 23:28:33.069+00') ON CONFLICT DO NOTHING;
INSERT INTO public."QuestionOptionJoins" VALUES ('205f2cda-f7b6-4629-9939-5d1c9f8a344b', '389e15c8-ce14-4ef7-b308-80c21d1f057a', '279b4e74-edfd-453f-9830-b981dfcce228', '2026-11-15 23:28:33.07+00', '2026-11-15 23:28:33.07+00') ON CONFLICT DO NOTHING;
INSERT INTO public."QuestionOptionJoins" VALUES ('ea88c20d-59f5-4e23-acf3-ca1c9dd1496b', '389e15c8-ce14-4ef7-b308-80c21d1f057a', '832611fd-1330-4e02-8199-4596f654af0d', '2026-11-15 23:28:33.071+00', '2026-11-15 23:28:33.071+00') ON CONFLICT DO NOTHING;
INSERT INTO public."QuestionOptionJoins" VALUES ('f42eaf7f-87ec-4db3-a14c-511e83e6c211', '17a2b290-7bd1-487d-926b-22882dcbfe19', 'e115f10d-6147-4f3d-ae40-7cbfa0f01bb5', '2026-11-15 23:28:33.081+00', '2026-11-15 23:28:33.081+00') ON CONFLICT DO NOTHING;
INSERT INTO public."QuestionOptionJoins" VALUES ('82a2b5cf-e755-4f95-b167-14e79abd116b', '17a2b290-7bd1-487d-926b-22882dcbfe19', '279b4e74-edfd-453f-9830-b981dfcce228', '2026-11-15 23:28:33.081+00', '2026-11-15 23:28:33.081+00') ON CONFLICT DO NOTHING;
INSERT INTO public."QuestionOptionJoins" VALUES ('f6a1d180-ceb9-4bb4-b56a-e3756ee26752', '17a2b290-7bd1-487d-926b-22882dcbfe19', '832611fd-1330-4e02-8199-4596f654af0d', '2026-11-15 23:28:33.082+00', '2026-11-15 23:28:33.082+00') ON CONFLICT DO NOTHING;
INSERT INTO public."QuestionOptionJoins" VALUES ('fb96eb19-2b40-4d31-ab96-8c51a8f9033e', 'b2be2b7f-59d6-4035-b611-52402763bcde', 'e115f10d-6147-4f3d-ae40-7cbfa0f01bb5', '2026-11-15 23:28:33.091+00', '2026-11-15 23:28:33.091+00') ON CONFLICT DO NOTHING;
INSERT INTO public."QuestionOptionJoins" VALUES ('82310e17-4dcd-4e30-91d6-1bf17830fc34', 'b2be2b7f-59d6-4035-b611-52402763bcde', '279b4e74-edfd-453f-9830-b981dfcce228', '2026-11-15 23:28:33.091+00', '2026-11-15 23:28:33.091+00') ON CONFLICT DO NOTHING;
INSERT INTO public."QuestionOptionJoins" VALUES ('31bc6bd0-83a7-4f2e-ae6b-f86eff8793ac', 'b2be2b7f-59d6-4035-b611-52402763bcde', '832611fd-1330-4e02-8199-4596f654af0d', '2026-11-15 23:28:33.092+00', '2026-11-15 23:28:33.092+00') ON CONFLICT DO NOTHING;
INSERT INTO public."QuestionOptionJoins" VALUES ('57c0b774-0094-4980-884c-f72acc50f259', '7752e659-9f1c-42fd-b175-eebeb3c7fc39', 'e115f10d-6147-4f3d-ae40-7cbfa0f01bb5', '2026-11-15 23:28:33.097+00', '2026-11-15 23:28:33.097+00') ON CONFLICT DO NOTHING;
INSERT INTO public."QuestionOptionJoins" VALUES ('ba5627e8-3f4d-4811-b241-ecc62331f36d', '7752e659-9f1c-42fd-b175-eebeb3c7fc39', '279b4e74-edfd-453f-9830-b981dfcce228', '2026-11-15 23:28:33.097+00', '2026-11-15 23:28:33.097+00') ON CONFLICT DO NOTHING;
INSERT INTO public."QuestionOptionJoins" VALUES ('cb31420f-11d3-4dda-93b6-fcb9a3c4e05a', '7752e659-9f1c-42fd-b175-eebeb3c7fc39', '832611fd-1330-4e02-8199-4596f654af0d', '2026-11-15 23:28:33.098+00', '2026-11-15 23:28:33.098+00') ON CONFLICT DO NOTHING;


--
-- Data for Name: Questions; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public."Questions" VALUES ('b65d7d29-965c-4597-a78a-3da2517c8616', 'Monday evening', '2026-11-15 23:28:33.061+00', 150, '19:30 in the rehearsal room', '2026-11-15 23:28:33.061+00', '2026-11-15 23:28:33.061+00') ON CONFLICT DO NOTHING;
INSERT INTO public."Questions" VALUES ('389e15c8-ce14-4ef7-b308-80c21d1f057a', 'Wednesday evening', '2026-11-15 23:28:33.068+00', 150, '19:30 in the rehearsal room', '2026-11-15 23:28:33.068+00', '2026-11-15 23:28:33.068+00') ON CONFLICT DO NOTHING;
INSERT INTO public."Questions" VALUES ('17a2b290-7bd1-487d-926b-22882dcbfe19', 'Can you play?', '2026-11-15 23:28:33.08+00', 120, 'Saturday morning, two sets', '2026-11-15 23:28:33.08+00', '2026-11-15 23:28:33.08+00') ON CONFLICT DO NOTHING;
INSERT INTO public."Questions" VALUES ('b2be2b7f-59d6-4035-b611-52402763bcde', 'Friday', '2026-11-15 23:28:33.089+00', 240, 'Barbecue', '2026-11-15 23:28:33.089+00', '2026-11-15 23:28:33.089+00') ON CONFLICT DO NOTHING;
INSERT INTO public."Questions" VALUES ('7752e659-9f1c-42fd-b175-eebeb3c7fc39', 'Saturday', '2026-11-15 23:28:33.096+00', 240, 'Barbecue', '2026-11-15 23:28:33.096+00', '2026-11-15 23:28:33.096+00') ON CONFLICT DO NOTHING;


--
-- Data for Name: Sentiments; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public."Sentiments" VALUES (1, 'u', '2026-11-15 23:28:28.064+00', '2026-11-15 23:28:28.064+00') ON CONFLICT DO NOTHING;
INSERT INTO public."Sentiments" VALUES (2, 'n', '2026-11-15 23:28:28.064+00', '2026-11-15 23:28:28.064+00') ON CONFLICT DO NOTHING;
INSERT INTO public."Sentiments" VALUES (3, 'y', '2026-11-15 23:28:28.064+00', '2026-11-15 23:28:28.064+00') ON CONFLICT DO NOTHING;
INSERT INTO public."Sentiments" VALUES (4, 'i', '2026-11-15 23:28:28.064+00', '2026-11-15 23:28:28.064+00') ON CONFLICT DO NOTHING;


--
-- Data for Name: SequelizeMeta; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public."SequelizeMeta" VALUES ('20240604184405-create_account_table.js') ON CONFLICT DO NOTHING;
INSERT INTO public."SequelizeMeta" VALUES ('20240604190549-create_band_table.js') ON CONFLICT DO NOTHING;
INSERT INTO public."SequelizeMeta" VALUES ('20240604190639-create_group_table.js') ON CONFLICT DO NOTHING;
INSERT INTO public."SequelizeMeta" VALUES ('20240604190648-create_type_table.js') ON CONFLICT DO NOTHING;
INSERT INTO public."SequelizeMeta" VALUES ('20240604190701-create_groupmember_table.js') ON CONFLICT DO NOTHING;
INSERT INTO public."SequelizeMeta" VALUES ('20240604200559-create_event_table.js') ON CONFLICT DO NOTHING;
INSERT INTO public."SequelizeMeta" VALUES ('20240604200609-create_poll_table.js') ON CONFLICT DO NOTHING;
INSERT INTO public."SequelizeMeta" VALUES ('20240604200627-create_question_table.js') ON CONFLICT DO NOTHING;
INSERT INTO public."SequelizeMeta" VALUES ('20240604202612-create_pollquestionjoin_table.js') ON CONFLICT DO NOTHING;
INSERT INTO public."SequelizeMeta" VALUES ('20240604202627-create_sentiment_table.js') ON CONFLICT DO NOTHING;
INSERT INTO public."SequelizeMeta" VALUES ('20240604202644-create_option_table.js') ON CONFLICT DO NOTHING;
INSERT INTO public."SequelizeMeta" VALUES ('20240604202655-create_questionoptionjoin_table.js') ON CONFLICT DO NOTHING;
INSERT INTO public."SequelizeMeta" VALUES ('20240604202709-create_answer_table.js') ON CONFLICT DO NOTHING;


--
-- Data for Name: Types; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public."Types" VALUES ('0c0c1f03-1373-4cbc-89af-d8a72f7b43d8', 'gig', '2026-11-15 23:28:28.074+00', '2026-11-15 23:28:28.074+00') ON CONFLICT DO NOTHING;
INSERT INTO public."Types" VALUES ('7731f4d2-da1c-41ba-a227-b74ef0af8a70', 'rehearsal', '2026-11-15 23:28:28.074+00', '2026-11-15 23:28:28.074+00') ON CONFLICT DO NOTHING;
INSERT INTO public."Types" VALUES ('cff8545b-a5b8-4e47-bc41-50e0ccf25126', 'stamm', '2026-11-15 23:28:28.074+00', '2026-11-15 23:28:28.074+00') ON CONFLICT DO NOTHING;
INSERT INTO public."Types" VALUES ('fed671de-90d9-43a2-a245-8780c8596664', 'meeting', '2026-11-15 23:28:28.074+00', '2026-11-15 23:28:28.074+00') ON CONFLICT DO NOTHING;
INSERT INTO public."Types" VALUES ('6ec92c29-3e4b-4e63-9cae-1df34148f92a', 'unspecified', '2026-11-15 23:28:28.074+00', '2026-11-15 23:28:28.074+00') ON CONFLICT DO NOTHING;


--
-- Name: Bands_BandID_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Bands_BandID_seq"', 1, false);


--
-- Name: Sentiments_SentimentID_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Sentiments_SentimentID_seq"', 1, false);


--
-- Name: Accounts Accounts_Email_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Accounts"
    ADD CONSTRAINT "Accounts_Email_key" UNIQUE ("Email");


--
-- Name: Accounts Accounts_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Accounts"
    ADD CONSTRAINT "Accounts_pkey" PRIMARY KEY ("AccountID");


--
-- Name: Answers Answers_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Answers"
    ADD CONSTRAINT "Answers_pkey" PRIMARY KEY ("AnswerID");


--
-- Name: Bands Bands_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Bands"
    ADD CONSTRAINT "Bands_pkey" PRIMARY KEY ("BandID");


--
-- Name: Events Events_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Events"
    ADD CONSTRAINT "Events_pkey" PRIMARY KEY ("EventID");


--
-- Name: GroupMembers GroupMembers_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."GroupMembers"
    ADD CONSTRAINT "GroupMembers_pkey" PRIMARY KEY ("GroupMemberID");


--
-- Name: Groups Groups_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Groups"
    ADD CONSTRAINT "Groups_pkey" PRIMARY KEY ("GroupID");


--
-- Name: Options Options_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Options"
    ADD CONSTRAINT "Options_pkey" PRIMARY KEY ("OptionID");


--
-- Name: PollQuestionJoins PollQuestionJoins_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."PollQuestionJoins"
    ADD CONSTRAINT "PollQuestionJoins_pkey" PRIMARY KEY ("PollQuestionID");


--
-- Name: Polls Polls_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Polls"
    ADD CONSTRAINT "Polls_pkey" PRIMARY KEY ("PollID");


--
-- Name: QuestionOptionJoins QuestionOptionJoins_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."QuestionOptionJoins"
    ADD CONSTRAINT "QuestionOptionJoins_pkey" PRIMARY KEY ("QuestionOptionID");


--
-- Name: Questions Questions_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Questions"
    ADD CONSTRAINT "Questions_pkey" PRIMARY KEY ("QuestionID");


--
-- Name: Sentiments Sentiments_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Sentiments"
    ADD CONSTRAINT "Sentiments_pkey" PRIMARY KEY ("SentimentID");


--
-- Name: SequelizeMeta SequelizeMeta_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."SequelizeMeta"
    ADD CONSTRAINT "SequelizeMeta_pkey" PRIMARY KEY (name);


--
-- Name: Types Types_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Types"
    ADD CONSTRAINT "Types_pkey" PRIMARY KEY ("TypeID");


--
-- Name: Answers Answers_GroupMemberID_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Answers"
    ADD CONSTRAINT "Answers_GroupMemberID_fkey" FOREIGN KEY ("GroupMemberID") REFERENCES public."GroupMembers"("GroupMemberID");


--
-- Name: Answers Answers_OptionID_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Answers"
    ADD CONSTRAINT "Answers_OptionID_fkey" FOREIGN KEY ("OptionID") REFERENCES public."Options"("OptionID");


--
-- Name: Answers Answers_QuestionID_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Answers"
    ADD CONSTRAINT "Answers_QuestionID_fkey" FOREIGN KEY ("QuestionID") REFERENCES public."Questions"("QuestionID") ON DELETE CASCADE;


--
-- Name: Events Events_GroupID_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Events"
    ADD CONSTRAINT "Events_GroupID_fkey" FOREIGN KEY ("GroupID") REFERENCES public."Groups"("GroupID") ON DELETE CASCADE;


--
-- Name: Events Events_TypeID_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Events"
    ADD CONSTRAINT "Events_TypeID_fkey" FOREIGN KEY ("TypeID") REFERENCES public."Types"("TypeID") ON DELETE CASCADE;


--
-- Name: GroupMembers GroupMembers_AccountID_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."GroupMembers"
    ADD CONSTRAINT "GroupMembers_AccountID_fkey" FOREIGN KEY ("AccountID") REFERENCES public."Accounts"("AccountID") ON DELETE CASCADE;


--
-- Name: GroupMembers GroupMembers_GroupID_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."GroupMembers"
    ADD CONSTRAINT "GroupMembers_GroupID_fkey" FOREIGN KEY ("GroupID") REFERENCES public."Groups"("GroupID") ON DELETE CASCADE;


--
-- Name: Groups Groups_BandID_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Groups"
    ADD CONSTRAINT "Groups_BandID_fkey" FOREIGN KEY ("BandID") REFERENCES public."Bands"("BandID");


--
-- Name: Options Options_SentimentID_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Options"
    ADD CONSTRAINT "Options_SentimentID_fkey" FOREIGN KEY ("SentimentID") REFERENCES public."Sentiments"("SentimentID");


--
-- Name: PollQuestionJoins PollQuestionJoins_PollID_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."PollQuestionJoins"
    ADD CONSTRAINT "PollQuestionJoins_PollID_fkey" FOREIGN KEY ("PollID") REFERENCES public."Polls"("PollID") ON DELETE CASCADE;


--
-- Name: PollQuestionJoins PollQuestionJoins_QuestionID_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."PollQuestionJoins"
    ADD CONSTRAINT "PollQuestionJoins_QuestionID_fkey" FOREIGN KEY ("QuestionID") REFERENCES public."Questions"("QuestionID") ON DELETE CASCADE;


--
-- Name: Polls Polls_GroupID_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Polls"
    ADD CONSTRAINT "Polls_GroupID_fkey" FOREIGN KEY ("GroupID") REFERENCES public."Groups"("GroupID") ON DELETE CASCADE;


--
-- Name: Polls Polls_TypeID_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Polls"
    ADD CONSTRAINT "Polls_TypeID_fkey" FOREIGN KEY ("TypeID") REFERENCES public."Types"("TypeID") ON DELETE CASCADE;


--
-- Name: QuestionOptionJoins QuestionOptionJoins_OptionID_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."QuestionOptionJoins"
    ADD CONSTRAINT "QuestionOptionJoins_OptionID_fkey" FOREIGN KEY ("OptionID") REFERENCES public."Options"("OptionID");


--
-- Name: QuestionOptionJoins QuestionOptionJoins_QuestionID_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."QuestionOptionJoins"
    ADD CONSTRAINT "QuestionOptionJoins_QuestionID_fkey" FOREIGN KEY ("QuestionID") REFERENCES public."Questions"("QuestionID") ON DELETE CASCADE;


--
-- PostgreSQL database dump complete
--


