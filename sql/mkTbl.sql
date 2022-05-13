CREATE TABLE clients (
    cli_id int not null auto_increment,
    friendly varchar(255) not null,
    hostname varchar(255) not null,
    domain varchar(255),
    campus varchar(255),
    building varchar(255),
    room varchar(255),
    template_id varchar(255),
    unique(cli_id),
    unique(friendly),
    unique(hostname)
);

CREATE TABLE templates (
    template_id int not null auto_increment,
    templateName varchar(255) not null,
    filepath varchar(255) not null,
    dateCreated timestamp not null,
    dateModified timestamp not null,
    author varchar(255) not null,
    unique(template_id)

);

CREATE TABLE unisign_users (
    usr_id int not null auto_increment,
    user varchar(255) not null,
    firstname varchar(255) not null,
    lastname varchar(255) not null,
    title varchar(255),
    dept varchar(255),
    org varchar(255),
    phone varchar(255),
    email varchar(255),
    unique (usr_id),
    unique(user)
);

CREATE TABLE unisign_user_perm (
    usr_id int not null,
    lvl int not null,
    unique (usr_id) 
);