using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading;
using System.Threading.Tasks;
using System.Web;
using System.Web.Http;
using System.Web.Http.Cors;
using System.Web.OData;
using System.Web.OData.Extensions;
using System.Web.OData.Query;
using System.Web.OData.Routing;
using WebApiDemo.Datas;
using WebApiDemo.Models;
using WebApiDemo.Utility;

namespace WebApiDemo.Controllers
{
    //[Authorize]
    [ODataRoutePrefix("calendars")]
    public class CalendarsController : ODataController
    {


        [EnableQuery(AllowedQueryOptions = AllowedQueryOptions.All, PageSize = 20, MaxTop = 50, AllowedFunctions = AllowedFunctions.AllFunctions)]
        //[EnableQuery]
        public IEnumerable<EventViewModel> Get()
        {
            return DataProvider.Calendars;
        }


        [EnableQuery(AllowedQueryOptions = AllowedQueryOptions.All, PageSize = 20, MaxTop = 50, AllowedFunctions = AllowedFunctions.AllFunctions)]
        //[EnableQuery]
        [ODataRoute("vms.getstartend(start={start},end={end})")]
        public IEnumerable<EventViewModel> GetStartEnd([FromODataUri]DateTime? start, [FromODataUri]DateTime? end)
        {
            return DataProvider.Calendars;
        }

        [EnableQuery]
        [ODataRoute("({id})")]
        public IHttpActionResult Get([FromODataUri] int id)
        {
            var product = DataProvider._issues.FirstOrDefault((p) => p.Id == id);
            if (product == null)
            {
                return NotFound();
            }
            return Ok(product);
        }
       
        //add
        [ODataRoute("()")]
        public async Task<EventViewModel> Post(EventViewModel item)
        {

            if (!ModelState.IsValid)
            {
                throw new HttpResponseException(Request.CreateErrorResponse(HttpStatusCode.BadRequest, ModelState));
            }
            item.Id = DataProvider.Calendars.Last().Id + 1;
            DataProvider.Calendars.Add(item);
            return item;
        }

        //update
        [ODataRoute("({id})")]
        public void Put(int id, EventViewModel item)
        {
            if (!ModelState.IsValid)
            {
                throw new HttpResponseException(Request.CreateErrorResponse(HttpStatusCode.BadRequest, ModelState));
            }
            item.Id = id;
            var ev = DataProvider.Calendars.FirstOrDefault(o => o.Id == id);

            if (ev == null)
            {
                throw new HttpResponseException(HttpStatusCode.NotFound);
            }
            DataProvider.Calendars.Remove(ev);
            DataProvider.Calendars.Add(item);
        }
        //delete
        [ODataRoute("({id})")]
        public void Delete(int id)
        {
            var ev = DataProvider.Calendars.FirstOrDefault(o => o.Id == id);
            if (ev == null)
            {
                throw new HttpResponseException(HttpStatusCode.NotFound);
            }
            DataProvider.Calendars.Remove(ev);
        }
    }
}
