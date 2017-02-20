namespace NgPlaybook.Server.Auth
{
    using System;
    using Microsoft.Owin;
    using Microsoft.Owin.Security.OAuth;
    using NgPlaybook.Server.Config;

    public sealed class NgPlaybookOAuthOptions : OAuthAuthorizationServerOptions
    {
        public NgPlaybookOAuthOptions()
        {
            var config = AppConfiguration.Config;

            TokenEndpointPath = new PathString(config.TokenPath);
            AccessTokenExpireTimeSpan = TimeSpan.FromMinutes(config.ExpirationMinutes);
            AccessTokenFormat = new NgPlaybookJWTWriterFormat();
            Provider = new NgPlaybookOAuthProvider();
            #if DEBUG
                AllowInsecureHttp = true;
            #endif
        }
    }
}