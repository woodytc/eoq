using System;
using System.Text;
using System.Collections.Generic;
//using NHibernate.Validator.Constraints;


namespace Eoq.Domain {
    
    public partial class SupplierMail {
        public virtual int ID { get; set; }
        public virtual int? SupID { get; set; }
        public virtual string SupEmail { get; set; }
    }
}
