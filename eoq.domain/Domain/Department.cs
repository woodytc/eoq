using System;
using System.Text;
using System.Collections.Generic;
//using NHibernate.Validator.Constraints;


namespace Eoq.Domain {
    
    public partial class Department {
        public virtual int DepartID { get; set; }
        public virtual string DepartName { get; set; }
    }
}
