using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
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
    //[ODataRoutePrefix("issues")]
    public class IssuesController : ODataController
    {


        [EnableQuery(AllowedQueryOptions = AllowedQueryOptions.All, PageSize = 20, MaxTop = 50)]
        //[EnableQuery]
        public IEnumerable<IssueViewModel> Get()
        {
            return DataProvider._issues;
        }

        [EnableQuery]
        [ODataRoute("issues({id})")]
        public IHttpActionResult Get([FromODataUri] int id)
        {
            var product = DataProvider._issues.FirstOrDefault((p) => p.Id == id);
            if (product == null)
            {
                return NotFound();
            }
            return Ok(product);
        }

        //get
        //[ODataRoute("({id})")]
        //[EnableQuery]
        //public IHttpActionResult Get([FromODataUri] int id)
        //{
        //    var product = _issues.FirstOrDefault((p) => p.Id == id);
        //    if (product == null)
        //    {
        //        return NotFound();
        //    }
        //    return Ok(product);
        //}

        //add
        [ODataRoute("issues()")]
        public IssueViewModel PostIssues(IssueViewModel item)
        {
            if (!ModelState.IsValid)
            {
                throw new HttpResponseException(Request.CreateErrorResponse(HttpStatusCode.BadRequest, ModelState));
            }
            item.Id = DataProvider._issues.Last().Id + 1;
            DataProvider._issues.Add(item);
            return item;
        }

        //update
        [ODataRoute("issues({id})")]
        public void PutIssues(int id, IssueViewModel item)
        {
            if (!ModelState.IsValid)
            {
                throw new HttpResponseException(Request.CreateErrorResponse(HttpStatusCode.BadRequest, ModelState));
            }
            item.Id = id;
            var issue = DataProvider._issues.FirstOrDefault(o => o.Id == id);

            if (issue == null)
            {
                throw new HttpResponseException(HttpStatusCode.NotFound);
            }
            DataProvider._issues.Remove(issue);
            DataProvider._issues.Add(item);
        }
        //delete
        [ODataRoute("issues({id})")]
        public void DeleteIssues(int id)
        {
            var issue = DataProvider._issues.FirstOrDefault(o => o.Id == id);
            if (issue == null)
            {
                throw new HttpResponseException(HttpStatusCode.NotFound);
            }
            DataProvider._issues.Remove(issue);
        }
    }
}
