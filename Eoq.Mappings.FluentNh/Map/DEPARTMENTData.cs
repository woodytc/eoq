using System; 
using System.Collections.Generic; 
using System.Text; 
using eoq.Domain;


namespace eoq.Domain {
    
    
    [DataContract(Name="DEPARTMENTData" , Namespace="")]
    public class DEPARTMENTData {
        
        [DataMember()]
        public virtual Int32 Id {
            get;
            set;
        }
        
        [DataMember()]
        public virtual String DepartName {
            get;
            set;
        }
    }
}
