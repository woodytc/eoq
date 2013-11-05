using System;
using System.Text;
using System.Collections.Generic;
//using NHibernate.Validator.Constraints;


namespace Eoq.Domain {
    
    public partial class Requisition {
        public virtual int ReqID { get; set; }
        public virtual DateTime? ReqDate { get; set; }
        public virtual string ReqStatus { get; set; }
        public virtual int? ReqTotalQTY { get; set; }
        public virtual int? DepartID { get; set; }
    }
}
