// -----------------------------------------------------------------------
// <copyright file="SupplierRepository.cs" company="">
// TODO: Update copyright text.
// </copyright>
// -----------------------------------------------------------------------

namespace Eoq.Mappings.FluentNh.Repository
{
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Text;
    using Eoq.Domain;

    public interface ISupplierRepository
    {
        void Save(Supplier newSupplier);
        void SaveOrUpdate(Supplier newSupplier);
        List<Supplier> GetAll();
        int Update(Supplier oldSupplier);
        int CountAll();
    }
    
    public class SupplierRepository : NhRepository, ISupplierRepository
    {
        #region save update select all countall

        public void Save(Supplier newSupplier)
        {
            using (var session = SessionFactory.OpenSession())
            using (var ts = session.BeginTransaction())
            {
                //HibernatingRhinos.Profiler.Appender.NHibernate.NHibernateProfiler.Initialize();
                session.Save(newSupplier);
                session.Flush();
                //session.Close();
                ts.Commit();
            }
        }


        public void SaveOrUpdate(Supplier newSupplier)
        {
            using (var session = SessionFactory.OpenSession())
            using (var ts = session.BeginTransaction())
            {
                session.SaveOrUpdate(newSupplier);
                session.Flush();
                //session.Close();
                ts.Commit();
            }
        }

        public List<Supplier> GetAll()
        {
            //using (var session = SessionFactory.OpenSession())
            //using (session.BeginTransaction(System.Data.IsolationLevel.ReadUncommitted))
            using (var session = SessionFactory.OpenStatelessSession())
            {
                var results = session.QueryOver<Supplier>().List() as List<Supplier>;
                //session.Close();
                return results;
            }
        }

        public int Update(Supplier oldSupplier)
        {
            using (var session = SessionFactory.OpenSession())
            using (var ts = session.BeginTransaction())
            {
                session.Update(oldSupplier);
                session.Flush();
                //session.Close();
                ts.Commit();
                return 1;
            }
        }

        public int CountAll()
        {
            using (var session = SessionFactory.OpenStatelessSession())
            {
                var result = session.QueryOver<Supplier>().RowCount();
                return result;
            }

        }

        #endregion
    }
}
