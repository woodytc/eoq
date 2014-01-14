using System;
using System.Text;
using System.Collections.Generic;


namespace Eoq.Domain
{

    public class Cashier
    {
        
        public virtual int Id { get; set; }
        public virtual int Material_ID { get; set; }
        public virtual string Amount { get; set; }
        public virtual decimal TotalPrice { get; set; }
        public virtual bool? IncudeTax { get; set; }
        public virtual float? Tax { get; set; }
        

        #region NHibernate Composite Key Requirements
        public override bool Equals(object obj)
        {
            if (obj == null) return false;
            var t = obj as Cashier;
            if (t == null) return false;
            return Id == t.Id && Material_ID == t.Material_ID;
        }
        public override int GetHashCode()
        {
            var hash = 13;
            hash += Id.GetHashCode();
            hash += Material_ID.GetHashCode();

            return hash;
        }
        #endregion
    }
}
