using System;
using System.Text;
using System.Collections.Generic;
//using NHibernate.Validator.Constraints;


namespace Eoq.Domain
{
    
    public partial class SupplierPhone {
        public virtual int ID { get; set; }
        public virtual string SUPPHONEVal { get; set; }
        public virtual int? SUPID { get; set; }
    }
}
