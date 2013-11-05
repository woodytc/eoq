// -----------------------------------------------------------------------
// <copyright file="RequisitionRepository.cs" company="">
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

    public interface IRequisitionRepository
    {
        void Save(Requisition newRequisition);
        void SaveOrUpdate(Requisition newRequisition);
        List<Requisition> GetAll();
        int Update(Requisition oldRequisition);
        int CountAll();
    }
    
    public class RequisitionRepository : NhRepository, IRequisitionRepository
    {
        #region save update select all countall

        public void Save(Requisition newRequisition)
        {
            using (var session = SessionFactory.OpenSession())
            using (var ts = session.BeginTransaction())
            {
                //HibernatingRhinos.Profiler.Appender.NHibernate.NHibernateProfiler.Initialize();
                session.Save(newRequisition);
                session.Flush();
                //session.Close();
                ts.Commit();
            }
        }


        public void SaveOrUpdate(Requisition newRequisition)
        {
            using (var session = SessionFactory.OpenSession())
            using (var ts = session.BeginTransaction())
            {
                session.SaveOrUpdate(newRequisition);
                session.Flush();
                //session.Close();
                ts.Commit();
            }
        }

        public List<Requisition> GetAll()
        {
            //using (var session = SessionFactory.OpenSession())
            //using (session.BeginTransaction(System.Data.IsolationLevel.ReadUncommitted))
            using (var session = SessionFactory.OpenStatelessSession())
            {
                var results = session.QueryOver<Requisition>().List() as List<Requisition>;
                //session.Close();
                return results;
            }
        }

        public int Update(Requisition oldRequisition)
        {
            using (var session = SessionFactory.OpenSession())
            using (var ts = session.BeginTransaction())
            {
                session.Update(oldRequisition);
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
                var result = session.QueryOver<Requisition>().RowCount();
                return result;
            }

        }

        #endregion
    }
}
