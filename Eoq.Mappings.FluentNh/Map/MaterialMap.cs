using System; 
using System.Collections.Generic; 
using System.Text; 
using FluentNHibernate.Mapping;
using Eoq.Domain; 

namespace Eoq.Mappings.FluentNh {
    
    
    public partial class MaterialMap : ClassMap<Material> {
        
        public MaterialMap() {
			Table("Material");
			LazyLoad();
			Id(x => x.MATID).GeneratedBy.Identity().Column("MAT_ID");
			Map(x => x.MATGID).Column("MAT_GID").Not.Nullable();
			Map(x => x.MATNAME).Column("MAT_NAME");
			Map(x => x.MATDETAIL).Column("MAT_DETAIL");
			Map(x => x.MATPrice).Column("MAT_Price");
			Map(x => x.MATREORDERPOINT).Column("MAT_REORDER_POINT");
			Map(x => x.UNITAID).Column("UNIT_A_ID");
			Map(x => x.CreateBy).Column("CreateBy");
			Map(x => x.CreateDate).Column("CreateDate");
			//Map(x => x.UpdateDate).Column("UpdateDate");
			Map(x => x.UpdateBY).Column("UpdateBY");
        }
    }
}
