using System; 
using System.Collections.Generic; 
using System.Text; 
using eoq.Domain;


namespace eoq.Domain {
    
    
    [DataContract(Name="PURCHASEORDERData" , Namespace="")]
    public class PURCHASEORDERData {
        
        [DataMember()]
        public virtual String Id {
            get;
            set;
        }
        
        [DataMember()]
        public virtual DateTime PoDate {
            get;
            set;
        }
        
        [DataMember()]
        public virtual Int32 PoTotalQty {
            get;
            set;
        }
        
        [DataMember()]
        public virtual Decimal PoAmount {
            get;
            set;
        }
        
        [DataMember()]
        public virtual Int32 DepartId {
            get;
            set;
        }
    }
}
