namespace Eoq.Mappings.FluentNh.Repository
{
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using NHibernate.Linq;
    using System.Text;
    using Eoq.Domain;
    using NHibernate.Criterion;

    public interface IEOQRepository
    {
        void Save(EOQ newEOQ);
        void SaveOrUpdate(EOQ newEOQ);
        List<EOQ> GetAll();
        int Update(EOQ oldEOQ);
        int CountAll();
        void GitEOQ();
    }
}

