// -----------------------------------------------------------------------
// <copyright file="UserInBranchsRepository.cs" company="">
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
    using Eoq.Domain.Domain;

    public interface IUserInBranchsRepository
    {
        void Save(UserInBranchs newUserInBranchs);
        void SaveOrUpdate(UserInBranchs newUserInBranchs);
        List<UserInBranchs> GetAll();
        int Update(UserInBranchs oldUserInBranchs);
        int CountAll();

        void Delete(UserInBranchs UserInBranchs);

        UserInBranchs GetByID(string username);
    }

    public class UserInBranchsRepository : NhRepository, IUserInBranchsRepository
    {
        #region save update select all countall

        public void Save(UserInBranchs newUserInBranchs)
        {
            using (var session = SessionFactory.OpenSession())
            using (var ts = session.BeginTransaction())
            {
                //HibernatingRhinos.Profiler.Appender.NHibernate.NHibernateProfiler.Initialize();
                session.Save(newUserInBranchs);
                session.Flush();
                //session.Close();
                ts.Commit();
            }
        }


        public void SaveOrUpdate(UserInBranchs newUserInBranchs)
        {
            using (var session = SessionFactory.OpenSession())
            using (var ts = session.BeginTransaction())
            {
                session.SaveOrUpdate(newUserInBranchs);
                session.Flush();
                //session.Close();
                ts.Commit();
            }
        }

        public List<UserInBranchs> GetAll()
        {
            //using (var session = SessionFactory.OpenSession())
            //using (session.BeginTransaction(System.Data.IsolationLevel.ReadUncommitted))
            using (var session = SessionFactory.OpenStatelessSession())
            {
                var results = session.QueryOver<UserInBranchs>().List<UserInBranchs>();// TList<UserInBranchs>;
                //session.Close();
                return results.ToList();
            }
        }

        public int Update(UserInBranchs oldUserInBranchs)
        {
            using (var session = SessionFactory.OpenSession())
            using (var ts = session.BeginTransaction())
            {
                session.Update(oldUserInBranchs);
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
                var result = session.QueryOver<UserInBranchs>().RowCount();
                return result;
            }

        }

        public void Delete(UserInBranchs UserInBranchs)
        {
            using (var session = SessionFactory.OpenStatelessSession())
            {
                session.Delete(UserInBranchs);
            }
        }

        public UserInBranchs GetByID(string username)
        {
            using(var session = SessionFactory.OpenStatelessSession())
            {
                return session.Get<UserInBranchs>(username);
            }
        }

        #endregion
    }
}

