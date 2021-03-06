﻿using System;
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
    [ODataRoutePrefix("issues")]
    public class IssuesController : ODataController
    {


        [EnableQuery(AllowedQueryOptions = AllowedQueryOptions.All, PageSize = 20, MaxTop = 50, AllowedFunctions = AllowedFunctions.AllFunctions)]
        //[EnableQuery]
        public IEnumerable<IssueViewModel> Get()
        {
            return DataProvider._issues;
        }



        //[EnableQuery]
        //[ODataRoute("issues({id})")]
        //public IHttpActionResult Get([FromODataUri] int id)
        //{
        //    var product = DataProvider._issues.FirstOrDefault((p) => p.Id == id);
        //    if (product == null)
        //    {
        //        return NotFound();
        //    }
        //    return Ok(product);
        //}
        //[ODataRoute("GetIndex(id={id})")]
        //public IHttpActionResult GetIndex([FromODataUri] int id)
        //{
        //    return Ok(id);
        //}
        
        [HttpGet]
        [ODataRoute("vms.mostexpensive(id={id})")]
        public IHttpActionResult MostExpensive([FromODataUri] int id)
        {
            var item = DataProvider._issues.FirstOrDefault(o => o.Id == id);
            if (item != null)
            {
                return Ok(item);
            }
            return BadRequest("Not found!");
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
        [ODataRoute("()")]
        public async Task<IssueViewModel> PostIssues(IssueViewModel item)
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
        [ODataRoute("({id})")]
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
        [ODataRoute("({id})")]
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
