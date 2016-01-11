using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Cors;
using System.Web.OData;
using System.Web.OData.Query;
using System.Web.OData.Routing;
using WebApiDemo.Models;

namespace WebApiDemo.Controllers
{
    [Authorize]
    //[ODataRoutePrefix("issues")]
    public class IssuesController : ODataController
    {
        static List<IssueViewModel> _issues = new List<IssueViewModel>
        {
            new IssueViewModel { Id = 1, Name = "Ui Design"},
            new IssueViewModel { Id = 2, Name = "Service Layer [Issue function]"},
            new IssueViewModel { Id = 3, Name = "Core Javascript"},
            new IssueViewModel { Id = 4, Name = "Angular JS"},
            new IssueViewModel { Id = 5, Name = "Google Map"},
        };

        //[EnableQuery]
        public IEnumerable<IssueViewModel> Get(ODataQueryOptions opts)
        {
            return _issues.Skip(opts.Skip.Value).Take(opts.Top.Value);
        }

        //[EnableQuery]
        [ODataRoute("issues({id})")]
        public IHttpActionResult Get([FromODataUri] int id)
        {
            var product = _issues.FirstOrDefault((p) => p.Id == id);
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
            item.Id = _issues.Last().Id + 1;
            _issues.Add(item);
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
            var issue = _issues.FirstOrDefault(o => o.Id == id);

            if (issue == null)
            {
                throw new HttpResponseException(HttpStatusCode.NotFound);
            }
            _issues.Remove(issue);
            _issues.Add(item);
        }
        //delete
        [ODataRoute("issues({id})")]
        public void DeleteIssues(int id)
        {
            var issue = _issues.FirstOrDefault(o => o.Id == id);
            if (issue == null)
            {
                throw new HttpResponseException(HttpStatusCode.NotFound);
            }
            _issues.Remove(issue);
        }
    }
}
