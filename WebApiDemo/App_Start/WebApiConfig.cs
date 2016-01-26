using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http.Formatting;
using System.Reflection;
using System.Web.Http;
using System.Web.OData.Builder;
using System.Web.OData.Extensions;
using Newtonsoft.Json.Serialization;

using WebApiDemo.Models;

namespace WebApiDemo
{
    public static class WebApiConfig
    {
        public static void Register(HttpConfiguration config)
        {
            // Web API configuration and services

            // Web API routes
            config.MapHttpAttributeRoutes();
            ODataModelBuilder builder = new ODataConventionModelBuilder();
            builder.Namespace = "vms";
            builder.EntitySet<IssueViewModel>("issues");
            builder.EntityType<IssueViewModel>().Collection
                .Function("mostexpensive")
                .ReturnsFromEntitySet<IssueViewModel>("issue")
                .Parameter<int>("id");
            builder.EntitySet<EventViewModel>("calendars");
            var events = builder.EntitySet<EventViewModel>("calendars");
            var getStadiumsTest = events.EntityType.Collection.Function("getstartend");
            getStadiumsTest.Parameter<DateTime?>("start");
            getStadiumsTest.Parameter<DateTime?>("end");
            getStadiumsTest.ReturnsFromEntitySet<EventViewModel>("calendars");
            
          // <DateTime?>("start");
            //builder.Function("GetSalesTaxRate")
            //.Returns<double>()
            //.Parameter<int>("PostalCode");
            config.MapODataServiceRoute(
                routeName: "ODataRoute",
                routePrefix: "odata",
                model: builder.GetEdmModel());

            config.Routes.MapHttpRoute(
                name: "DefaultApi",
                routeTemplate: "api/{controller}/{id}",
                defaults: new { id = RouteParameter.Optional }
            );
            
           config.EnableCors();
            //var jsonFormatter = config.Formatters.OfType<JsonMediaTypeFormatter>().First();
            //jsonFormatter.SerializerSettings.ContractResolver = new CamelCasePropertyNamesContractResolver();
            var appXmlType = config.Formatters.XmlFormatter.SupportedMediaTypes.FirstOrDefault(t => t.MediaType == "application/xml");
            config.Formatters.XmlFormatter.SupportedMediaTypes.Remove(appXmlType);
        }
    }
}
