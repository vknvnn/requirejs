using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace WebApiDemo.Models
{
    public class EventViewModel
    {
        public int Id { get; set; }

        public string Title { get; set; }
        //A Moment-ish input, like an ISO8601 string.
        public DateTime Start { get; set; }
        public DateTime End { get; set; }

        public string BackgroundColor { get; set; }
        public string BorderColor { get; set; }
        public string TextColor { get; set; }

    }
}