USE [GpsMember]

--Insert data to [aspnet_Applications]
INSERT INTO  .[dbo].[aspnet_Applications]
           ([ApplicationName]
           ,[LoweredApplicationName]
           ,[ApplicationId]
           ,[Description])
     VALUES
           ('eoq',
           'eoq',
           '6C8782A7-FD6B-4F5E-9AA8-48D01D0554FF',
           NULL)
GO

--INSERT DATA TO USERS
INSERT INTO  .[dbo].[aspnet_Users]
           ([ApplicationId]
           ,[UserId]
           ,[UserName]
           ,[LoweredUserName]
           ,[MobileAlias]
           ,[IsAnonymous]
           ,[LastActivityDate])
     VALUES
           ('6C8782A7-FD6B-4F5E-9AA8-48D01D0554FF'
           ,'2257956F-1CB1-472A-B1F1-D7C42D99313D'
           ,'admin'
           ,'admin'
           ,NULL
           ,'0'
           ,'2013-05-08 03:40:29.810')
GO

--Insert data to Roles
INSERT INTO  .[dbo].[aspnet_Roles]
           ([ApplicationId]
           ,[RoleId]
           ,[RoleName]
           ,[LoweredRoleName]
           ,[Description])
     (select 
           '6C8782A7-FD6B-4F5E-9AA8-48D01D0554FF'
           ,'7686BB0A-8466-4C58-879E-EE7BBD972332'
           ,'Administrator'
           ,'admin'
           , NUll)
     UNION ALL
     
     (select 
           '6C8782A7-FD6B-4F5E-9AA8-48D01D0554FF'
           ,'FC654CC8-F09A-44CE-809B-07271EF985BA'
           ,'Member'
           ,'member'
           ,NUll)
GO

--INSERT DATA TO USERINROLES
INSERT INTO  .[dbo].[aspnet_UsersInRoles]
           ([UserId]
           ,[RoleId])
     VALUES
           ('2257956F-1CB1-472A-B1F1-D7C42D99313D'
           ,'01291803-999C-446F-9C51-A92E80E8AAAA')
GO

--Insert data to Membership
INSERT INTO  .[dbo].[aspnet_Membership]
           ([ApplicationId]
           ,[UserId]
           ,[Password]
           ,[PasswordFormat]
           ,[PasswordSalt]
           ,[MobilePIN]
           ,[Email]
           ,[LoweredEmail]
           ,[PasswordQuestion]
           ,[PasswordAnswer]
           ,[IsApproved]
           ,[IsLockedOut]
           ,[CreateDate]
           ,[LastLoginDate]
           ,[LastPasswordChangedDate]
           ,[LastLockoutDate]
           ,[FailedPasswordAttemptCount]
           ,[FailedPasswordAttemptWindowStart]
           ,[FailedPasswordAnswerAttemptCount]
           ,[FailedPasswordAnswerAttemptWindowStart]
           ,[Comment])
     VALUES
           ('6C8782A7-FD6B-4F5E-9AA8-48D01D0554FF'
           ,'2257956F-1CB1-472A-B1F1-D7C42D99313D'
           ,'ARJLZvSVmNKaaeL8D9l7iMXNcR4='
           ,1
           ,'PBboZYfYGIEk34GrPb+LvA=='
           ,NULL
           ,'admin@default.com'
           ,'admin@default.com'
           ,NULL
           ,NULL
           ,'1'
           ,0
           ,'2013-05-08 03:39:55.000'
           ,'2013-05-08 03:40:29.810'
           ,'2013-05-08 03:39:55.000'
           ,'1754-01-01 00:00:00.000'
           ,0
           ,'1754-01-01 00:00:00.000'
           ,0
           ,'1754-01-01 00:00:00.000'
           ,NULL)
GO

