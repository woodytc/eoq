using System; 
using System.Collections.Generic; 
using System.Text; 
using FluentNHibernate.Mapping;
using Eoq.Domain; 

namespace Eoq.Mappings.FluentNh {
    
    
    public partial class EOQMap : ClassMap<EOQ> {
        
        public EOQMap() {
			Table("EOQ");
			LazyLoad();
			//Map(x => x.Eoqtype).Column("Eoq_type").Not.Nullable();
            Id(x => x.Eoqtype).GeneratedBy.Identity().Column("Eoq_type");
            Map(x => x.Demand).Column("Demand");
			Map(x => x.OtytoPurchase).Column("Oty_to_Purchase");
			Map(x => x.MaintainCostperunit).Column("Maintain_Cost_per_unit");
			Map(x => x.MaintainCost).Column("Maintain_Cost");
			Map(x => x.PurchaseCost).Column("Purchase_Cost");
			Map(x => x.PurCostperYear).Column("PurCost_per_Year");
			Map(x => x.MatID).Column("Mat_ID");
        }
    }
}
