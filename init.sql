create sequence brands_id_seq
    as BIGINT;

create table brand
(
    id   bigint default nextval('brands_id_seq'::regclass) not null
        constraint brands_pk
            primary key,
    name varchar(50) not null
);

alter table brand
    owner to username;

create table model
(
    id            BIGINT
        constraint model_pk
            primary key,
    name          varchar(50),
    average_price bigint,
    brand_id      BIGINT
        constraint model_brands_id_fk
            references brand
);

alter table model
    owner to username;
