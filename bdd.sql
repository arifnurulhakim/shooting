PGDMP     3                    {         '   shooting-star-main-db-0566c731c8e780280    14.5    15.3 6    �           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false            �           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false            �           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false            �           1262    81248 '   shooting-star-main-db-0566c731c8e780280    DATABASE     �   CREATE DATABASE "shooting-star-main-db-0566c731c8e780280" WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'en_US.UTF-8';
 9   DROP DATABASE "shooting-star-main-db-0566c731c8e780280";
                adaptableadmin    false            �           0    0 2   DATABASE "shooting-star-main-db-0566c731c8e780280"    ACL     �   REVOKE CONNECT,TEMPORARY ON DATABASE "shooting-star-main-db-0566c731c8e780280" FROM PUBLIC;
GRANT CREATE,CONNECT ON DATABASE "shooting-star-main-db-0566c731c8e780280" TO "shooting-star-main-db-0566c731c8e780280";
                   adaptableadmin    false    4333                        2615    2200    public    SCHEMA     2   -- *not* creating schema, since initdb creates it
 2   -- *not* dropping schema, since initdb creates it
                adaptableadmin    false            �           0    0    SCHEMA public    ACL     Q   REVOKE USAGE ON SCHEMA public FROM PUBLIC;
GRANT ALL ON SCHEMA public TO PUBLIC;
                   adaptableadmin    false    5            �            1259    82961    admins    TABLE     
  CREATE TABLE public.admins (
    id integer NOT NULL,
    username character varying(255),
    email character varying(255),
    password character varying(255),
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);
    DROP TABLE public.admins;
       public         heap '   shooting-star-main-db-0566c731c8e780280    false    5            �            1259    82960    admins_id_seq    SEQUENCE     �   CREATE SEQUENCE public.admins_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 $   DROP SEQUENCE public.admins_id_seq;
       public       '   shooting-star-main-db-0566c731c8e780280    false    5    212            �           0    0    admins_id_seq    SEQUENCE OWNED BY     ?   ALTER SEQUENCE public.admins_id_seq OWNED BY public.admins.id;
          public       '   shooting-star-main-db-0566c731c8e780280    false    211            �            1259    83005    admintokens    TABLE     �   CREATE TABLE public.admintokens (
    id integer NOT NULL,
    token character varying(255),
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL,
    "adminId" integer
);
    DROP TABLE public.admintokens;
       public         heap '   shooting-star-main-db-0566c731c8e780280    false    5            �            1259    83004    admintokens_id_seq    SEQUENCE     �   CREATE SEQUENCE public.admintokens_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 )   DROP SEQUENCE public.admintokens_id_seq;
       public       '   shooting-star-main-db-0566c731c8e780280    false    220    5            �           0    0    admintokens_id_seq    SEQUENCE OWNED BY     I   ALTER SEQUENCE public.admintokens_id_seq OWNED BY public.admintokens.id;
          public       '   shooting-star-main-db-0566c731c8e780280    false    219            �            1259    82972    contents    TABLE     �   CREATE TABLE public.contents (
    id integer NOT NULL,
    label character varying(255),
    title character varying(255),
    content text,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);
    DROP TABLE public.contents;
       public         heap '   shooting-star-main-db-0566c731c8e780280    false    5            �            1259    82971    contents_id_seq    SEQUENCE     �   CREATE SEQUENCE public.contents_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 &   DROP SEQUENCE public.contents_id_seq;
       public       '   shooting-star-main-db-0566c731c8e780280    false    214    5            �           0    0    contents_id_seq    SEQUENCE OWNED BY     C   ALTER SEQUENCE public.contents_id_seq OWNED BY public.contents.id;
          public       '   shooting-star-main-db-0566c731c8e780280    false    213            �            1259    82950    players    TABLE     0  CREATE TABLE public.players (
    id integer NOT NULL,
    wallet character varying(255),
    name character varying(255),
    discord_link character varying(255),
    tw_link character varying(255),
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);
    DROP TABLE public.players;
       public         heap '   shooting-star-main-db-0566c731c8e780280    false    5            �            1259    82949    players_id_seq    SEQUENCE     �   CREATE SEQUENCE public.players_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 %   DROP SEQUENCE public.players_id_seq;
       public       '   shooting-star-main-db-0566c731c8e780280    false    5    210            �           0    0    players_id_seq    SEQUENCE OWNED BY     A   ALTER SEQUENCE public.players_id_seq OWNED BY public.players.id;
          public       '   shooting-star-main-db-0566c731c8e780280    false    209            �            1259    82981    playertokens    TABLE     �   CREATE TABLE public.playertokens (
    id integer NOT NULL,
    token character varying(255),
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL,
    "playerId" integer
);
     DROP TABLE public.playertokens;
       public         heap '   shooting-star-main-db-0566c731c8e780280    false    5            �            1259    82980    playertokens_id_seq    SEQUENCE     �   CREATE SEQUENCE public.playertokens_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 *   DROP SEQUENCE public.playertokens_id_seq;
       public       '   shooting-star-main-db-0566c731c8e780280    false    216    5            �           0    0    playertokens_id_seq    SEQUENCE OWNED BY     K   ALTER SEQUENCE public.playertokens_id_seq OWNED BY public.playertokens.id;
          public       '   shooting-star-main-db-0566c731c8e780280    false    215            �            1259    82993    plays    TABLE        CREATE TABLE public.plays (
    id integer NOT NULL,
    reward character varying(255),
    play_time timestamp with time zone,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL,
    "playerId" integer
);
    DROP TABLE public.plays;
       public         heap '   shooting-star-main-db-0566c731c8e780280    false    5            �            1259    82992    plays_id_seq    SEQUENCE     �   CREATE SEQUENCE public.plays_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 #   DROP SEQUENCE public.plays_id_seq;
       public       '   shooting-star-main-db-0566c731c8e780280    false    218    5            �           0    0    plays_id_seq    SEQUENCE OWNED BY     =   ALTER SEQUENCE public.plays_id_seq OWNED BY public.plays.id;
          public       '   shooting-star-main-db-0566c731c8e780280    false    217            9           2604    82964 	   admins id    DEFAULT     f   ALTER TABLE ONLY public.admins ALTER COLUMN id SET DEFAULT nextval('public.admins_id_seq'::regclass);
 8   ALTER TABLE public.admins ALTER COLUMN id DROP DEFAULT;
       public       '   shooting-star-main-db-0566c731c8e780280    false    211    212    212            =           2604    83008    admintokens id    DEFAULT     p   ALTER TABLE ONLY public.admintokens ALTER COLUMN id SET DEFAULT nextval('public.admintokens_id_seq'::regclass);
 =   ALTER TABLE public.admintokens ALTER COLUMN id DROP DEFAULT;
       public       '   shooting-star-main-db-0566c731c8e780280    false    219    220    220            :           2604    82975    contents id    DEFAULT     j   ALTER TABLE ONLY public.contents ALTER COLUMN id SET DEFAULT nextval('public.contents_id_seq'::regclass);
 :   ALTER TABLE public.contents ALTER COLUMN id DROP DEFAULT;
       public       '   shooting-star-main-db-0566c731c8e780280    false    214    213    214            8           2604    82953 
   players id    DEFAULT     h   ALTER TABLE ONLY public.players ALTER COLUMN id SET DEFAULT nextval('public.players_id_seq'::regclass);
 9   ALTER TABLE public.players ALTER COLUMN id DROP DEFAULT;
       public       '   shooting-star-main-db-0566c731c8e780280    false    210    209    210            ;           2604    82984    playertokens id    DEFAULT     r   ALTER TABLE ONLY public.playertokens ALTER COLUMN id SET DEFAULT nextval('public.playertokens_id_seq'::regclass);
 >   ALTER TABLE public.playertokens ALTER COLUMN id DROP DEFAULT;
       public       '   shooting-star-main-db-0566c731c8e780280    false    216    215    216            <           2604    82996    plays id    DEFAULT     d   ALTER TABLE ONLY public.plays ALTER COLUMN id SET DEFAULT nextval('public.plays_id_seq'::regclass);
 7   ALTER TABLE public.plays ALTER COLUMN id DROP DEFAULT;
       public       '   shooting-star-main-db-0566c731c8e780280    false    218    217    218            �          0    82961    admins 
   TABLE DATA           Y   COPY public.admins (id, username, email, password, "createdAt", "updatedAt") FROM stdin;
    public       '   shooting-star-main-db-0566c731c8e780280    false    212   �C       �          0    83005    admintokens 
   TABLE DATA           U   COPY public.admintokens (id, token, "createdAt", "updatedAt", "adminId") FROM stdin;
    public       '   shooting-star-main-db-0566c731c8e780280    false    220   D       �          0    82972    contents 
   TABLE DATA           W   COPY public.contents (id, label, title, content, "createdAt", "updatedAt") FROM stdin;
    public       '   shooting-star-main-db-0566c731c8e780280    false    214    D       �          0    82950    players 
   TABLE DATA           d   COPY public.players (id, wallet, name, discord_link, tw_link, "createdAt", "updatedAt") FROM stdin;
    public       '   shooting-star-main-db-0566c731c8e780280    false    210   =D       �          0    82981    playertokens 
   TABLE DATA           W   COPY public.playertokens (id, token, "createdAt", "updatedAt", "playerId") FROM stdin;
    public       '   shooting-star-main-db-0566c731c8e780280    false    216   �D       �          0    82993    plays 
   TABLE DATA           \   COPY public.plays (id, reward, play_time, "createdAt", "updatedAt", "playerId") FROM stdin;
    public       '   shooting-star-main-db-0566c731c8e780280    false    218   nE       �           0    0    admins_id_seq    SEQUENCE SET     <   SELECT pg_catalog.setval('public.admins_id_seq', 1, false);
          public       '   shooting-star-main-db-0566c731c8e780280    false    211            �           0    0    admintokens_id_seq    SEQUENCE SET     A   SELECT pg_catalog.setval('public.admintokens_id_seq', 1, false);
          public       '   shooting-star-main-db-0566c731c8e780280    false    219            �           0    0    contents_id_seq    SEQUENCE SET     >   SELECT pg_catalog.setval('public.contents_id_seq', 1, false);
          public       '   shooting-star-main-db-0566c731c8e780280    false    213            �           0    0    players_id_seq    SEQUENCE SET     <   SELECT pg_catalog.setval('public.players_id_seq', 1, true);
          public       '   shooting-star-main-db-0566c731c8e780280    false    209            �           0    0    playertokens_id_seq    SEQUENCE SET     A   SELECT pg_catalog.setval('public.playertokens_id_seq', 3, true);
          public       '   shooting-star-main-db-0566c731c8e780280    false    215            �           0    0    plays_id_seq    SEQUENCE SET     ;   SELECT pg_catalog.setval('public.plays_id_seq', 1, false);
          public       '   shooting-star-main-db-0566c731c8e780280    false    217            C           2606    82968    admins admins_pkey 
   CONSTRAINT     P   ALTER TABLE ONLY public.admins
    ADD CONSTRAINT admins_pkey PRIMARY KEY (id);
 <   ALTER TABLE ONLY public.admins DROP CONSTRAINT admins_pkey;
       public         '   shooting-star-main-db-0566c731c8e780280    false    212            E           2606    82970    admins admins_username_key 
   CONSTRAINT     Y   ALTER TABLE ONLY public.admins
    ADD CONSTRAINT admins_username_key UNIQUE (username);
 D   ALTER TABLE ONLY public.admins DROP CONSTRAINT admins_username_key;
       public         '   shooting-star-main-db-0566c731c8e780280    false    212            M           2606    83010    admintokens admintokens_pkey 
   CONSTRAINT     Z   ALTER TABLE ONLY public.admintokens
    ADD CONSTRAINT admintokens_pkey PRIMARY KEY (id);
 F   ALTER TABLE ONLY public.admintokens DROP CONSTRAINT admintokens_pkey;
       public         '   shooting-star-main-db-0566c731c8e780280    false    220            G           2606    82979    contents contents_pkey 
   CONSTRAINT     T   ALTER TABLE ONLY public.contents
    ADD CONSTRAINT contents_pkey PRIMARY KEY (id);
 @   ALTER TABLE ONLY public.contents DROP CONSTRAINT contents_pkey;
       public         '   shooting-star-main-db-0566c731c8e780280    false    214            ?           2606    82957    players players_pkey 
   CONSTRAINT     R   ALTER TABLE ONLY public.players
    ADD CONSTRAINT players_pkey PRIMARY KEY (id);
 >   ALTER TABLE ONLY public.players DROP CONSTRAINT players_pkey;
       public         '   shooting-star-main-db-0566c731c8e780280    false    210            A           2606    82959    players players_wallet_key 
   CONSTRAINT     W   ALTER TABLE ONLY public.players
    ADD CONSTRAINT players_wallet_key UNIQUE (wallet);
 D   ALTER TABLE ONLY public.players DROP CONSTRAINT players_wallet_key;
       public         '   shooting-star-main-db-0566c731c8e780280    false    210            I           2606    82986    playertokens playertokens_pkey 
   CONSTRAINT     \   ALTER TABLE ONLY public.playertokens
    ADD CONSTRAINT playertokens_pkey PRIMARY KEY (id);
 H   ALTER TABLE ONLY public.playertokens DROP CONSTRAINT playertokens_pkey;
       public         '   shooting-star-main-db-0566c731c8e780280    false    216            K           2606    82998    plays plays_pkey 
   CONSTRAINT     N   ALTER TABLE ONLY public.plays
    ADD CONSTRAINT plays_pkey PRIMARY KEY (id);
 :   ALTER TABLE ONLY public.plays DROP CONSTRAINT plays_pkey;
       public         '   shooting-star-main-db-0566c731c8e780280    false    218            P           2606    83011 $   admintokens admintokens_adminId_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.admintokens
    ADD CONSTRAINT "admintokens_adminId_fkey" FOREIGN KEY ("adminId") REFERENCES public.admins(id) ON UPDATE CASCADE ON DELETE SET NULL;
 P   ALTER TABLE ONLY public.admintokens DROP CONSTRAINT "admintokens_adminId_fkey";
       public       '   shooting-star-main-db-0566c731c8e780280    false    4163    212    220            N           2606    82987 '   playertokens playertokens_playerId_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.playertokens
    ADD CONSTRAINT "playertokens_playerId_fkey" FOREIGN KEY ("playerId") REFERENCES public.players(id) ON UPDATE CASCADE ON DELETE SET NULL;
 S   ALTER TABLE ONLY public.playertokens DROP CONSTRAINT "playertokens_playerId_fkey";
       public       '   shooting-star-main-db-0566c731c8e780280    false    4159    210    216            O           2606    82999    plays plays_playerId_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.plays
    ADD CONSTRAINT "plays_playerId_fkey" FOREIGN KEY ("playerId") REFERENCES public.players(id) ON UPDATE CASCADE ON DELETE SET NULL;
 E   ALTER TABLE ONLY public.plays DROP CONSTRAINT "plays_playerId_fkey";
       public       '   shooting-star-main-db-0566c731c8e780280    false    218    210    4159            �      x������ � �      �      x������ � �      �      x������ � �      �   `   x�E�1�  �����@�"i��&F⤉���y���^m/��t����4�����,Ò�����#�8��i��r�R��PS�L_��c^r&�      �   �   x�}̽�0@�>���ޖ�t��A#��Eň O�h����9Ժ��	�T��e�N�K���1Ǿ���]-d]�]*m��U�{����(A����8�^�e�/*77����,�&�zW��9����(a��KoY�����Q��^۽Ja|�?��Aj��Z�_�d�B�H�@�      �      x������ � �     