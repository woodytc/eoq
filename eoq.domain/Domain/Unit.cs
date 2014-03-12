using System;
using System.Text;
using System.Collections.Generic;
using System.Runtime.Serialization;
//using NHibernate.Validator.Constraints;


namespace Eoq.Domain {
    
    public partial class Unit {
        public virtual int ID { get; set; }
        public virtual string UnitName { get; set; }
        //public virtual string Email { get; set; }
    }
}
