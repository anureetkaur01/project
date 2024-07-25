create database project;
create table user(email varchar(30) primary key,pwd varchar(20),utype varchar(20),status int);
update user set status=1;
select * from user;
delete from user where email='anureet@gmail.com';
delete from user where email='bhbb';
delete from user where email='kanureet001';
update user set status=0 where email='user@gmail.com';

use project;
create table iprofile(emailid varchar(30) primary key,name varchar(30),gender varchar(15),dob date,address varchar(150),city varchar(30),contact bigint,fields varchar(200),insta varchar(150),fb varchar(150),youtube varchar(150),others varchar(200),picpath varchar(100));

select * from iprofile;
delete from iprofile  where emailid='fndjklsnk@gmail.com';
delete from iprofile  where emailid='dsbdjs@gmail.com';
delete from iprofile  where emailid='a@gmail.com';
delete from iprofile  where emailid='ddfsgdfd@outlook.com';
delete from iprofile  where emailid='anureet1702@gmail.com';
delete from iprofile  where emailid='asdfg@gmail.com';
delete from iprofile  where emailid='dfsgdfd@outlook.com';
delete from iprofile  where emailid='abc@gmail.com';
delete from iprofile  where emailid='user@gmail.com';



use project;
create table events(emailid varchar(30),events varchar(50),doe date,tos time,city varchar(40),venue varchar(50));
select * from events;
delete from events where emailid='';

drop table iprofile;
create table iprofile(emailid varchar(30) primary key,name varchar(30),gender varchar(15),dob date,address varchar(60),city varchar(20),contact bigint,fields varchar(100),insta varchar(50),fb varchar(50),youtube varchar(50),others varchar(200),picpath varchar(100));

drop table events;
create table events(rid int primary key auto_increment,emailid varchar(30),events varchar(150),doe date,tos time,city varchar(100),venue varchar(150));

create table cprofile(email varchar(30) primary key,name varchar(30),city varchar(100),state varchar(100),org varchar(150),mobile bigint);
select * from cprofile;
delete from cprofile where email='undefined';
drop table iprofile;
drop table cprofile;