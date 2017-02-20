namespace NgPlaybook.Server.Auth
{
    using Microsoft.Owin.Security.Jwt;
    using NgPlaybook.Server.Config;

    // ReSharper disable once InconsistentNaming
    public sealed class NgPlaybookJWTOptions : JwtBearerAuthenticationOptions
    {
        public NgPlaybookJWTOptions()
        {
            var config = AppConfiguration.Config;
          
            AllowedAudiences = new[] { config.JwtAudience };
            IssuerSecurityTokenProviders = new[]
            {
                new SymmetricKeyIssuerSecurityTokenProvider(config.JwtIssuer, config.JwtKey)
            };
        }
    }
}