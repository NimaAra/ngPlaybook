namespace NgPlaybook.Server.Api
{
    using System;
    using System.Threading.Tasks;
    using System.Web.Http;

    public sealed class SlowController : ApiController
    {
        public async Task<IHttpActionResult> Get()
        {
            await Task.Delay(TimeSpan.FromSeconds(3));
            return Ok();
        }
    }
}