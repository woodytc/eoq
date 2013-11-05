using System;
using System.Text;
using System.Collections.Generic;
//using NHibernate.Validator.Constraints;


namespace Eoq.Domain {
    
    public partial class EmployeeMail {
        public virtual int ID { get; set; }
        public virtual int? EmpID { get; set; }
        public virtual string Email { get; set; }
    }
}
