using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace WebApiDemo.Models
{
    public class IssueViewModel
    {
        public int Id { get; set; }

        [Required(ErrorMessage = "The field Name is required.")]
        public string Name { get; set; }
        
        public string Email { get; set; }
    }
}