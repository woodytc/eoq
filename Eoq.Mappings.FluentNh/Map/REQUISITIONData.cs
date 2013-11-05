using System; 
using System.Collections.Generic; 
using System.Text; 
using eoq.Domain;


namespace eoq.Domain {
    
    
    [DataContract(Name="REQUISITIONData" , Namespace="")]
    public class REQUISITIONData {
        
        [DataMember()]
        public virtual Int32 Id {
            get;
            set;
        }
        
        [DataMember()]
        public virtual DateTime ReqDate {
            get;
            set;
        }
        
        [DataMember()]
        public virtual String Reqstatus {
            get;
            set;
        }
        
        [DataMember()]
        public virtual Int32 ReqtotalQty {
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
