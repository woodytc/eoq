using System; 
using System.Collections.Generic; 
using System.Text; 
using eoq.Domain;


namespace eoq.Domain {
    
    
    [DataContract(Name="INVOICEData" , Namespace="")]
    public class INVOICEData {
        
        [DataMember()]
        public virtual Int32 Id {
            get;
            set;
        }
        
        [DataMember()]
        public virtual Int32 SupId {
            get;
            set;
        }
        
        [DataMember()]
        public virtual Int32 PoNo {
            get;
            set;
        }
        
        [DataMember()]
        public virtual Int32 DepartId {
            get;
            set;
        }
        
        [DataMember()]
        public virtual DateTime InvDate {
            get;
            set;
        }
        
        [DataMember()]
        public virtual Int32 InvTotalQty {
            get;
            set;
        }
        
        [DataMember()]
        public virtual Decimal InvAmount {
            get;
            set;
        }
        
        [DataMember()]
        public virtual String ApprovedBy {
            get;
            set;
        }
    }
}
