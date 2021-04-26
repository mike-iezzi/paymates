CREATE DATABASE paymates

CREATE TABLE deals(
    deal_id uuid DEFAULT uuid_generate_v4(),
    description VARCHAR(128) NOT NULL,
    owner_user_id uuid NOT NULL,
    amount NUMERIC(10,2) NOT NULL,
    method VARCHAR(32) NOT NULL,
    transactions_list uuid[],
    PRIMARY KEY (deal_id)
);

CREATE TABLE transactions(
    transaction_id uuid DEFAULT uuid_generate_v4(),
    user_id uuid NOT NULL,
    deal_id uuid NOT NULL,
    description VARCHAR(128) NOT NULL
    amount_owed NUMERIC(10,2) NOT NULL,
    amount_paid NUMERIC(10,2) NOT NULL,
    PRIMARY KEY (transaction_id)  
);

CREATE TABLE users(
    user_id uuid NOT NULL PRIMARY KEY,
    username VARCHAR(32) NOT NULL,
    firstname VARCHAR(32),
    lastname VARCHAR(32),
    transaction_list uuid [],
    groups_list uuid [],
    PRIMARY KEY (user_id)  
);

CREATE TABLE groups(
    group_id uuid DEFAULT uuid_generate_v4(),
    users_list uuid [],
    PRIMARY KEY (group_id)  
);