using System; 
using System.Collections.Generic; 
using System.Text; 
using eoq.Domain;


namespace eoq.Domain {
    
    
    [DataContract(Name="SUPPLIERData" , Namespace="")]
    public class SUPPLIERData {
        
        [DataMember()]
        public virtual Int32 Id {
            get;
            set;
        }
        
        [DataMember()]
        public virtual String SupName {
            get;
            set;
        }
        
        [DataMember()]
        public virtual String SupAddress {
            get;
            set;
        }
        
        [DataMember()]
        public virtual String Street {
            get;
            set;
        }
        
        [DataMember()]
        public virtual String District {
            get;
            set;
        }
        
        [DataMember()]
        public virtual String Province {
            get;
            set;
        }
        
        [DataMember()]
        public virtual String Zipcode {
            get;
            set;
        }
    }
}
