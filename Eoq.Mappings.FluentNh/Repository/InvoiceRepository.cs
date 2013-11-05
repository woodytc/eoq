// -----------------------------------------------------------------------
// <copyright file="InvoiceRepository.cs" company="">
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

    public interface IInvoiceRepository
    {
        void Save(Invoice newInvoice);
        void SaveOrUpdate(Invoice newInvoice);
        List<Invoice> GetAll();
        int Update(Invoice oldInvoice);
        int CountAll();
    }
    
    public class InvoiceRepository : NhRepository, IInvoiceRepository
    {
        #region save update select all countall

        public void Save(Invoice newInvoice)
        {
            using (var session = SessionFactory.OpenSession())
            using (var ts = session.BeginTransaction())
            {
                //HibernatingRhinos.Profiler.Appender.NHibernate.NHibernateProfiler.Initialize();
                session.Save(newInvoice);
                session.Flush();
                //session.Close();
                ts.Commit();
            }
        }


        public void SaveOrUpdate(Invoice newInvoice)
        {
            using (var session = SessionFactory.OpenSession())
            using (var ts = session.BeginTransaction())
            {
                session.SaveOrUpdate(newInvoice);
                session.Flush();
                //session.Close();
                ts.Commit();
            }
        }

        public List<Invoice> GetAll()
        {
            //using (var session = SessionFactory.OpenSession())
            //using (session.BeginTransaction(System.Data.IsolationLevel.ReadUncommitted))
            using (var session = SessionFactory.OpenStatelessSession())
            {
                var results = session.QueryOver<Invoice>().List() as List<Invoice>;
                //session.Close();
                return results;
            }
        }

        public int Update(Invoice oldInvoice)
        {
            using (var session = SessionFactory.OpenSession())
            using (var ts = session.BeginTransaction())
            {
                session.Update(oldInvoice);
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
                var result = session.QueryOver<Invoice>().RowCount();
                return result;
            }

        }

        #endregion
    }
}
