using System;
using System.Text;
using System.Collections.Generic;
//using NHibernate.Validator.Constraints;


namespace Eoq.Domain {
    
    public partial class EmployeePhone {
        public virtual int ID { get; set; }
        public virtual int? EmPloyeePHONE { get; set; }
        public virtual string EMPID { get; set; }

    }
}
