create table t_conference
(
    id                uuid not null
        constraint t_conference_pkey
            primary key,
    abstract_deadline timestamp,
    call_for_papers   timestamp,
    ending_date       timestamp,
    starting_date     timestamp
);

alter table t_conference
    owner to "cms-user";

create table t_paper
(
    name varchar(255) not null
        constraint t_paper_pkey
            primary key
);

alter table t_paper
    owner to "cms-user";

create table t_proposal
(
    id                 uuid not null
        constraint t_proposal_pkey
            primary key,
    abstract_paragraph varchar(255),
    name               varchar(255),
    paper_name         varchar(255)
        constraint fk9oqi49f5s1ssnre2ddkrejswo
            references t_paper
);

alter table t_proposal
    owner to "cms-user";

create table t_keyword
(
    name        varchar(255) not null
        constraint t_keyword_pkey
            primary key,
    proposal_id uuid
        constraint fkt1jsrqlqn0soodx925xyppjxl
            references t_proposal
);

alter table t_keyword
    owner to "cms-user";

create table t_section
(
    id            uuid not null
        constraint t_section_pkey
            primary key,
    name          varchar(255),
    conference_id uuid
        constraint fkfd6yne6xkuwucedoqy0yy1ww6
            references t_conference
);

alter table t_section
    owner to "cms-user";

create table t_topic
(
    name        varchar(255) not null
        constraint t_topic_pkey
            primary key,
    proposal_id uuid
        constraint fk8i12dswe4b9eatw55m5l6jrds
            references t_proposal
);

alter table t_topic
    owner to "cms-user";

create table t_user
(
    dtype         varchar(31) not null,
    id            uuid        not null
        constraint t_user_pkey
            primary key,
    first_name    varchar(255),
    last_name     varchar(255),
    password      varchar(255),
    username      varchar(255),
    affiliation   varchar(255),
    email_address varchar(255),
    web_page      varchar(255)
);

alter table t_user
    owner to "cms-user";

create table t_analysis
(
    id             uuid not null
        constraint t_analysis_pkey
            primary key,
    analysis_score integer,
    pc_member_id   uuid
        constraint fkhpq9q3xdyts0ifrddo3ppw62k
            references t_user,
    proposal_id    uuid
        constraint fk1jjrbnn16e7n45ng1oaw1tp8r
            references t_proposal
);

alter table t_analysis
    owner to "cms-user";

create table t_evaluation
(
    id               uuid not null
        constraint t_evaluation_pkey
            primary key,
    evaluation_score integer,
    proposal_id      uuid,
    recommendation   varchar(255),
    pc_member_id     uuid
        constraint fkmh64wix6ps8yfjf00rqcyko4t
            references t_user
);

alter table t_evaluation
    owner to "cms-user";

create table t_presentation
(
    id           uuid not null
        constraint t_presentation_pkey
            primary key,
    date         timestamp,
    end_time     time,
    start_time   time,
    author_id    uuid
        constraint fkookqabhipdn6aurdi2omvhb64
            references t_user,
    pc_member_id uuid
        constraint fkga66lmbrrjs0m8r19d0jgk90n
            references t_user,
    section_id   uuid
        constraint fkdbjeqduasbvsqj6chcpbksqks
            references t_section
);

alter table t_presentation
    owner to "cms-user";

create table t_attendance
(
    id              uuid not null
        constraint t_attendance_pkey
            primary key,
    listener_id     uuid
        constraint fkmypdk0oot0inxes2l4b5vgst0
            references t_user,
    presentation_id uuid
        constraint fk4ks7p4c5oh078omkuxtmxhwqf
            references t_presentation
);

alter table t_attendance
    owner to "cms-user";

