using System;
using System.Text;
using System.Collections.Generic;
//using NHibernate.Validator.Constraints;


namespace Eoq.Domain {
    
    public partial class Invoice {
        public virtual int InvNo { get; set; }
        public virtual int? SupID { get; set; }
        public virtual int? PONo { get; set; }
        public virtual int? DepartID { get; set; }
        public virtual DateTime? InvDate { get; set; }
        public virtual int? InvTotalQTY { get; set; }
        public virtual decimal? InvAmount { get; set; }
        public virtual string Approvedby { get; set; }
    }
}
