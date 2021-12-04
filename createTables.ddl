connect to SE4WW3;
------------------------------------------------
--  DDL Statements for table Restaurant
------------------------------------------------
create table Restaurant(
	Name varchar(60) not null,
	Phone number bigint not null,
	Address varchar(60) not null,
	Longitude float(53) not null,
	Latitude float(53) not null,
	Rating float(5),
	Review varchar(60),
	primary key (Name, Longitude, Latitude)
);

------------------------------------------------
--  DDL Statements for table User
------------------------------------------------
create table User(
	FirstName varchar(60) not null,
	LastName varchar(60) not null,
	DateOfBirth DATE not null,
	Phone number bigint not null,
	EmailAddress varchar(60) not null,
	Gender varchar(60) not null,
	Password varchar(60) not null
	primary key (EmailAddress)
);

------------------------------------------------
--  DDL Statements for table Review
------------------------------------------------
create table Person(
	comment varchar(60) not null,
	Rating int(60) not null,
	Name varchar(60) not null,
	Longitude float(53) not null,
	Latitude float(53) not null,
	Foreign Key(Name, Longitude, Latitude) references Restaurant (Name, Longitude, Latitude) on delete cascade
	
);



