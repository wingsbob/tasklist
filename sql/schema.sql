CREATE DATABASE taskList;
CREATE USER 'tasklist'@'%' identified by 'secure-password';
GRANT DELETE,SELECT,INSERT,UPDATE ON tasklist.* TO 'tasklist'@'%';

CREATE TABLE taskLists (
    id int NOT NULL AUTO_INCREMENT,
    title varchar(255),
    updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (id)
);

CREATE TABLE tasks (
    id int AUTO_INCREMENT,
    taskListId int,
    title varchar(255),
    updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (id),
    FOREIGN KEY (taskListId) REFERENCES taskLists(id)
);
