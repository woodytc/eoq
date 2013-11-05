using System;
using System.Text;
using System.Collections.Generic;
//using NHibernate.Validator.Constraints;


namespace Eoq.Domain {
    
    public partial class Orders {
        public virtual int MatID { get; set; }
        public virtual int PONo { get; set; }
        public virtual int? QTY { get; set; }
        public virtual string Unit { get; set; }
        #region NHibernate Composite Key Requirements
        public override bool Equals(object obj) {
			if (obj == null) return false;
			var t = obj as Orders;
			if (t == null) return false;
			if (MatID == t.MatID
			 && PONo == t.PONo)
				return true;

			return false;
        }
        public override int GetHashCode() {
			int hash = 13;
			hash += MatID.GetHashCode();
			hash += PONo.GetHashCode();

			return hash;
        }
        #endregion
    }
}
