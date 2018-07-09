psql -h 172.19.0.2 -U postgres

create database dashboard;
\connect dashboard

create table history (
    id serial primary key,
    state varchar not null,
    resource varchar not null,
    time timestamp not null default now()
);