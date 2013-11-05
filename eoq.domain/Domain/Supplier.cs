using System;
using System.Text;
using System.Collections.Generic;
//using NHibernate.Validator.Constraints;


namespace Eoq.Domain {
    
    public partial class Supplier {
        public virtual int SupID { get; set; }
        public virtual string SupName { get; set; }
        public virtual string SupAddress { get; set; }
        public virtual string Street { get; set; }
        public virtual string District { get; set; }
        public virtual string Province { get; set; }
        public virtual string Zipcode { get; set; }
    }
}
