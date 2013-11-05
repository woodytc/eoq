using System; 
using System.Collections.Generic; 
using System.Text; 
using eoq.Domain;


namespace eoq.Domain {
    
    
    //[DataContract(Name="SUPEMAILData" , Namespace="")]
    public class SUPEMAILData {
        
        //[DataMember()]
        public virtual Int32 SupId {
            get;
            set;
        }
        
        //[DataMember()]
        public virtual String SupEmail {
            get;
            set;
        }
    }
}
