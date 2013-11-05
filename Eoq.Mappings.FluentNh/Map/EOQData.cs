using System; 
using System.Collections.Generic; 
using System.Text; 
using eoq.Domain;


namespace eoq.Domain {
    
    
    [DataContract(Name="EOQData" , Namespace="")]
    public class EOQData {
        
        [DataMember()]
        public virtual Int32 EoqType {
            get;
            set;
        }
        
        [DataMember()]
        public virtual Int32 Demand {
            get;
            set;
        }
        
        [DataMember()]
        public virtual Decimal OtyToPurchase {
            get;
            set;
        }
        
        [DataMember()]
        public virtual Decimal MaintainCostPerUnit {
            get;
            set;
        }
        
        [DataMember()]
        public virtual Decimal MaintainCost {
            get;
            set;
        }
        
        [DataMember()]
        public virtual Decimal PurchaseCost {
            get;
            set;
        }
        
        [DataMember()]
        public virtual Decimal PurcostPerYear {
            get;
            set;
        }
        
        [DataMember()]
        public virtual Int32 MatId {
            get;
            set;
        }
    }
}
