using System; 
using System.Collections.Generic; 
using System.Text; 
using FluentNHibernate.Mapping;
using Eoq.Domain; 

namespace Eoq.Mappings.FluentNh {


    public class MaterialMap : ClassMap<Material>
    {

        public MaterialMap()
        {
            Table("Material");
            LazyLoad();
            Id(x => x.MatId).GeneratedBy.Identity().Column("MAT_ID");
            Map(x => x.CatelogyId).Column("Catelogy_ID");
            Map(x => x.MetName).Column("Met_Name");
            Map(x => x.MatDetail).Column("Mat_Detail");
            Map(x => x.Createdate).Column("CreateDate");
            Map(x => x.Updatedate).Column("UpdateDate");
            Map(x => x.Updateby).Column("UpdateBY");
        }
    }
}
