namespace NgPlaybook.Server.Startup
{
    using System.Web.Http;
    using Newtonsoft.Json.Serialization;

    public class WebApiStartup
    {
        public static void Configure(HttpConfiguration config)
        {
            config.MapHttpAttributeRoutes();
            config.Routes.MapHttpRoute("api", "api/{controller}");
            config.Formatters.JsonFormatter.SerializerSettings.ContractResolver = 
                new CamelCasePropertyNamesContractResolver();
        }
    }
}