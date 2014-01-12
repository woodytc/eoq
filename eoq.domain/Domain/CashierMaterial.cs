using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Eoq.Domain
{
    public class CashierMaterial
    {
        public virtual int Id { get; set; }
        public virtual int Material_ID { get; set; }

        #region NHibernate Composite Key Requirements
        public override bool Equals(object obj)
        {
            if (obj == null) return false;
            var t = obj as CashierMaterial;
            if (t == null) return false;
            if (Id == t.Id && Material_ID == t.Material_ID)
                return true;

            return false;
        }
        public override int GetHashCode()
        {
            int hash = 13;
            hash += Id.GetHashCode();
            hash += Material_ID.GetHashCode();

            return hash;
        }
        #endregion
    }
}
