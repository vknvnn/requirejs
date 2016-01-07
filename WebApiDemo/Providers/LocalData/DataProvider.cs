using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace WebApiDemo.Providers.LocalData
{
    public static class DataProvider
    {
        #region data client
        public static List<Client> Clients = new List<Client>
        {
            new Client
            {
                Id = "ngAuthApp", 
                Active = true, 
                AllowedOrigin = "*", 
                ApplicationType = ApplicationTypes.JavaScript, 
                Name = "AngularJS front-end Application", 
                RefreshTokenLifeTime = 7200, 
                Secret = "5YV7M1r981yoGhELyB84aC+KiYksxZf1OY3++C1CtRM=",
            },
            new Client
            {
                Id = "consoleApp", 
                Active = true, 
                AllowedOrigin = "*", 
                ApplicationType = ApplicationTypes.NativeConfidential, 
                Name = "Console Application", 
                RefreshTokenLifeTime = 14400, 
                Secret = "lCXDroz4HhR1EIx8qaz3C13z/quTXBkQ3Q5hj7Qx3aA=",
            }
        };
        #endregion data client

        #region data user

        public static List<User> Users = new List<User>()
        {
            new User
            {
                Id = 1,
                Email = "nghiep.vo@caminois.com",
                Password = "nghiep.vo",
                UserName = "nghiep.vo",
                Role = "user"
            },
            new User
            {
                Id = 2,
                Email = "admin@admin.com",
                Password = "admin",
                UserName = "admin",
                Role = "admin"
            },
            new User
            {
                Id = 3,
                Email = "vknvnn@gmail.com",
                Password = "vknvnn",
                UserName = "vknvnn",
                Role = "user"
            },
        };

        #endregion

        #region refresh tocken

        public static List<RefreshToken> RefreshTokens = new List<RefreshToken>();

        #endregion
    }
}