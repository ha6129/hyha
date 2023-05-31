using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace ECOUNT.Models
{
    public class UserManager
    {
        public string ID { get; set; }
        public string PW { get; set; }
        public string Name { get; set; }
        public string Email { get; set; }
        public DateTime Birthday { get; set; }

        public UserManager() { }

        public UserManager(string ID, string PW, string Name, string Email, DateTime Birthday)
        {
            this.ID = ID;
            this.PW = PW;
            this.Name = Name;
            this.Email = Email;
            this.Birthday = Birthday;
        }
    }
}