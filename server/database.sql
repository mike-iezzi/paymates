CREATE DATABASE paymates

CREATE TABLE deals(
    deal_id SERIAL NOT NULL PRIMARY KEY,
    description VARCHAR(128) NOT NULL,
    owner_user_id SERIAL NOT NULL,
    amount NUMERIC(10,2) NOT NULL,
    method VARCHAR(32) NOT NULL,
    transactions_list SERIAL []
);

CREATE TABLE transactions(
    transaction_id SERIAL NOT NULL PRIMARY KEY,
    user_id SERIAL NOT NULL,
    deal_id SERIAL NOT NULL,
    description VARCHAR(128) NOT NULL
    amount_owed NUMERIC(10,2) NOT NULL,
    amount_paid NUMERIC(10,2) NOT NULL,  
);

CREATE TABLE users(
    user_id SERIAL NOT NULL PRIMARY KEY,
    username VARCHAR(32) NOT NULL,
    firstname VARCHAR(32),
    lastname VARCHAR(32),
    transaction_list SERIAL [],
    groups_list SERIAL []
);

CREATE TABLE groups(
    group_id SERIAL NOT NULL PRIMARY KEY,
    users_list SERIAL [],
);