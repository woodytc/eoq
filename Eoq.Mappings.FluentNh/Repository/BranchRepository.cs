// -----------------------------------------------------------------------
// <copyright file="BranchRepository.cs" company="">
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

    public interface IBranchRepository
    {
        void Save(Branch newBranch);
        void SaveOrUpdate(Branch newBranch);
        List<Branch> GetAll();
        int Update(Branch oldBranch);
        int CountAll();

        void Delete(Branch Branch);
    }

    public class BranchRepository : NhRepository, IBranchRepository
    {
        #region save update select all countall

        public void Save(Branch newBranch)
        {
            using (var session = SessionFactory.OpenSession())
            using (var ts = session.BeginTransaction())
            {
                //HibernatingRhinos.Profiler.Appender.NHibernate.NHibernateProfiler.Initialize();
                session.Save(newBranch);
                session.Flush();
                //session.Close();
                ts.Commit();
            }
        }


        public void SaveOrUpdate(Branch newBranch)
        {
            using (var session = SessionFactory.OpenSession())
            using (var ts = session.BeginTransaction())
            {
                session.SaveOrUpdate(newBranch);
                session.Flush();
                //session.Close();
                ts.Commit();
            }
        }

        public List<Branch> GetAll()
        {
            //using (var session = SessionFactory.OpenSession())
            //using (session.BeginTransaction(System.Data.IsolationLevel.ReadUncommitted))
            using (var session = SessionFactory.OpenStatelessSession())
            {
                var results = session.QueryOver<Branch>().List() as List<Branch>;
                //session.Close();
                return results;
            }
        }

        public int Update(Branch oldBranch)
        {
            using (var session = SessionFactory.OpenSession())
            using (var ts = session.BeginTransaction())
            {
                session.Update(oldBranch);
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
                var result = session.QueryOver<Branch>().RowCount();
                return result;
            }

        }

        public void Delete(Branch Branch)
        {
            using (var session = SessionFactory.OpenStatelessSession())
            {
                session.Delete(Branch);
            }
        }

        #endregion
    }
}
