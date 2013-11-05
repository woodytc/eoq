// -----------------------------------------------------------------------
// <copyright file="SupplierMailRepository.cs" company="">
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

    public interface ISupplierMailRepository
    {
        void Save(SupplierMail newSupplierMail);
        void SaveOrUpdate(SupplierMail newSupplierMail);
        List<SupplierMail> GetAll();
        int Update(SupplierMail oldSupplierMail);
        int CountAll();
    }
    
    public class SupplierMailRepository : NhRepository, ISupplierMailRepository
    {
        #region save update select all countall

        public void Save(SupplierMail newSupplierMail)
        {
            using (var session = SessionFactory.OpenSession())
            using (var ts = session.BeginTransaction())
            {
                //HibernatingRhinos.Profiler.Appender.NHibernate.NHibernateProfiler.Initialize();
                session.Save(newSupplierMail);
                session.Flush();
                //session.Close();
                ts.Commit();
            }
        }


        public void SaveOrUpdate(SupplierMail newSupplierMail)
        {
            using (var session = SessionFactory.OpenSession())
            using (var ts = session.BeginTransaction())
            {
                session.SaveOrUpdate(newSupplierMail);
                session.Flush();
                //session.Close();
                ts.Commit();
            }
        }

        public List<SupplierMail> GetAll()
        {
            //using (var session = SessionFactory.OpenSession())
            //using (session.BeginTransaction(System.Data.IsolationLevel.ReadUncommitted))
            using (var session = SessionFactory.OpenStatelessSession())
            {
                var results = session.QueryOver<SupplierMail>().List() as List<SupplierMail>;
                //session.Close();
                return results;
            }
        }

        public int Update(SupplierMail oldSupplierMail)
        {
            using (var session = SessionFactory.OpenSession())
            using (var ts = session.BeginTransaction())
            {
                session.Update(oldSupplierMail);
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
                var result = session.QueryOver<SupplierMail>().RowCount();
                return result;
            }

        }

        #endregion
    }
}
