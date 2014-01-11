using Eoq.Domain;
using FluentNHibernate.Mapping;

namespace Eoq.Mappings.FluentNh
{
    public sealed class CashierMaterialMap : ClassMap<CashierMaterial>
    {
        public CashierMaterialMap()
        {
            Table("CashierMaterial");
            LazyLoad();
            CompositeId().KeyProperty(x => x.Id, "ID")
                         .KeyProperty(x => x.Material_ID, "Material_ID");
        }
    }
}