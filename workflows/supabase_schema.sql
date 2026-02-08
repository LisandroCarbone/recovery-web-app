CREATE  TABLE public.appointments (
  id serial NOT NULL,
  user_id character varying(20) NULL,
  date_start timestamp with time zone NOT NULL,
  description text NULL,
  google_event_id text NULL,
  status character varying(20) NULL DEFAULT 'active'::character varying,
  date_end timestamp with time zone NULL,
  24hs_notif boolean NULL,
  CONSTRAINT appointments_pkey PRIMARY KEY (id),
  CONSTRAINT appointments_google_event_id_key UNIQUE (google_event_id),
  CONSTRAINT appointments_user_id_fkey FOREIGN KEY (user_id) REFERENCES users(id),
  CONSTRAINT appointments_status_check CHECK (((status)::text = ANY ((ARRAY['active'::character varying, 'inactive'::character varying, 'cancelled'::character varying])::text[])))
) TABLESPACE pg_default;


create table public.history (
  id serial not null,
  user_id character varying(20) null,
  role character varying(20) not null,
  content text not null,
  created_at timestamp without time zone null default now(),
  constraint history_pkey primary key (id),
  constraint history_user_id_fkey foreign KEY (user_id) references users (id)
) TABLESPACE pg_default;


create table public.users (
  id character varying(20) not null,
  display_name character varying(255) null,
  name character varying(255) null,
  email character varying(255) null,
  constraint users_pkey primary key (id),
  constraint users_email_key unique (email)
) TABLESPACE pg_default;