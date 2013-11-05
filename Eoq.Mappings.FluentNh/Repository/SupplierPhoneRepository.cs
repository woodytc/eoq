// -----------------------------------------------------------------------
// <copyright file="SupplierPhoneRepository.cs" company="">
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

    public interface ISupplierPhoneRepository
    {
        void Save(SupplierPhone newSupplierPhone);
        void SaveOrUpdate(SupplierPhone newSupplierPhone);
        List<SupplierPhone> GetAll();
        int Update(SupplierPhone oldSupplierPhone);
        int CountAll();
    }
    
    public class SupplierPhoneRepository : NhRepository, ISupplierPhoneRepository
    {
        #region save update select all countall

        public void Save(SupplierPhone newSupplierPhone)
        {
            using (var session = SessionFactory.OpenSession())
            using (var ts = session.BeginTransaction())
            {
                //HibernatingRhinos.Profiler.Appender.NHibernate.NHibernateProfiler.Initialize();
                session.Save(newSupplierPhone);
                session.Flush();
                //session.Close();
                ts.Commit();
            }
        }


        public void SaveOrUpdate(SupplierPhone newSupplierPhone)
        {
            using (var session = SessionFactory.OpenSession())
            using (var ts = session.BeginTransaction())
            {
                session.SaveOrUpdate(newSupplierPhone);
                session.Flush();
                //session.Close();
                ts.Commit();
            }
        }

        public List<SupplierPhone> GetAll()
        {
            //using (var session = SessionFactory.OpenSession())
            //using (session.BeginTransaction(System.Data.IsolationLevel.ReadUncommitted))
            using (var session = SessionFactory.OpenStatelessSession())
            {
                var results = session.QueryOver<SupplierPhone>().List() as List<SupplierPhone>;
                //session.Close();
                return results;
            }
        }

        public int Update(SupplierPhone oldSupplierPhone)
        {
            using (var session = SessionFactory.OpenSession())
            using (var ts = session.BeginTransaction())
            {
                session.Update(oldSupplierPhone);
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
                var result = session.QueryOver<SupplierPhone>().RowCount();
                return result;
            }

        }

        #endregion
    }
}
