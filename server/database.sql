CREATE DATABASE paymates

CREATE TABLE deals(
    deal_id SERIAL NOT NULL PRIMARY KEY,
    description VARCHAR(128) NOT NULL,
    owner_user_id SERIAL NOT NULL,
    amount NUMERIC(10,2) NOT NULL,
    method VARCHAR(32) NOT NULL
);

CREATE TABLE transactions(
    transaction_id SERIAL NOT NULL PRIMARY KEY,
    deal_id SERIAL NOT NULL,
    user_id SERIAL NOT NULL,
    amount_owed NUMERIC(10,2) NOT NULL,
    amount_paid NUMERIC(10,2) NOT NULL,  
    description VARCHAR(128)
);

CREATE TABLE users(
    user_id SERIAL NOT NULL PRIMARY KEY,
    firstname VARCHAR(32) NOT NULL,
    lastname VARCHAR(32) NOT NULL,
    transaction_list SERIAL [],
    groups_list SERIAL []
);