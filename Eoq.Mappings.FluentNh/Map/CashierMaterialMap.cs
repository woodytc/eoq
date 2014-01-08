using Eoq.Domain;
using FluentNHibernate.Mapping;

namespace Eoq.Mappings.FluentNh
{
    public class CashierMaterialMap : ClassMap<CashierMaterial>
    {
        public CashierMaterialMap()
        {
            Table("CashierMaterial");
            LazyLoad();
            Id(x => x.Id).GeneratedBy.Assigned().Column("ID");
            Id(x => x.Material_ID).GeneratedBy.Assigned().Column("Material_ID");
        }
    }
}