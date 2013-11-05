using System; 
using System.Collections.Generic; 
using System.Text; 
using eoq.Domain;


namespace eoq.Domain {
    
    
    [DataContract(Name="SUPPHONEData" , Namespace="")]
    public class SUPPHONEData {
        
        [DataMember()]
        public virtual String SupPhone {
            get;
            set;
        }
        
        [DataMember()]
        public virtual Int32 SupId {
            get;
            set;
        }
    }
}
