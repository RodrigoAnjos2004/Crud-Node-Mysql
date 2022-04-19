create database CrudDB;
use CrudDB;

create table `Crud`(
 `MatriculaID` int(11) not null auto_increment,
 `CPF` varchar(11) default null,
 `Nome` varchar(45) default null,
 `idade` int(3) default null,
 Primary key(`MatriculaID`)
)engine=InnoDB auto_increment=0 default charset=utf8mb4;

use CrudDB;
lock tables `Crud` write;
insert into `Crud` values (7,'23434564567','Alan kardec',50),(8,'87986789782','Rodrigo Silva',17);
unlock tables;