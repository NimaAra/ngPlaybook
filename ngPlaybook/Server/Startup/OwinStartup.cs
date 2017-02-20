using NgPlaybook.Server.Startup;
using Microsoft.Owin;

[assembly: OwinStartup(typeof(OwinStartup))]
namespace NgPlaybook.Server.Startup
{
    using Owin;
    using NgPlaybook.Server.Auth;

    public class OwinStartup
    {
        public void Configuration(IAppBuilder app)
        {
            app.UseOAuthAuthorizationServer(new NgPlaybookOAuthOptions());
            app.UseJwtBearerAuthentication(new NgPlaybookJWTOptions());
        }
    }
}