using System;
using System.Text;
using System.Collections.Generic;
//using NHibernate.Validator.Constraints;


namespace Eoq.Domain {
    
    public partial class Receive {
        public virtual int MatID { get; set; }
        public virtual int InvNo { get; set; }
        public virtual int? QTY { get; set; }
        public virtual string Unit { get; set; }
        #region NHibernate Composite Key Requirements
        public override bool Equals(object obj) {
			if (obj == null) return false;
			var t = obj as Receive;
			if (t == null) return false;
			if (MatID == t.MatID
			 && InvNo == t.InvNo)
				return true;

			return false;
        }
        public override int GetHashCode() {
			int hash = 13;
			hash += MatID.GetHashCode();
			hash += InvNo.GetHashCode();

			return hash;
        }
        #endregion
    }
}
