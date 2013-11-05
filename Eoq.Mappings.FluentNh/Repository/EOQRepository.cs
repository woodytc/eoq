// -----------------------------------------------------------------------
// <copyright file="EOQRepository.cs" company="">
// TODO: Update copyright text.
// </copyright>
// -----------------------------------------------------------------------

namespace Eoq.Mappings.FluentNh.Repository
{
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using NHibernate.Linq;
    using System.Text;
    using Eoq.Domain;
    using NHibernate.Criterion;
    using NHibernate.Mapping;
    
    public class EOQRepository : NhRepository, IEOQRepository
    {
        #region save update select all countall

        public void Save(EOQ newEOQ)
        {
            using (var session = SessionFactory.OpenSession())
            using (var ts = session.BeginTransaction())
            {
                //HibernatingRhinos.Profiler.Appender.NHibernate.NHibernateProfiler.Initialize();
                session.Save(newEOQ);
                session.Flush();
                //session.Close();
                ts.Commit();
            }
        }


        public void SaveOrUpdate(EOQ newEOQ)
        {
            using (var session = SessionFactory.OpenSession())
            using (var ts = session.BeginTransaction())
            {
                session.SaveOrUpdate(newEOQ);
                session.Flush();
                //session.Close();
                ts.Commit();
            }
        }

        public List<EOQ> GetAll()
        {
            //using (var session = SessionFactory.OpenSession())
            //using (session.BeginTransaction(System.Data.IsolationLevel.ReadUncommitted))
            using (var session = SessionFactory.OpenStatelessSession())
            {
                var results = session.QueryOver<EOQ>().List() as List<EOQ>;
                //session.Close();
                return results;
            }
        }

        public int Update(EOQ oldEOQ)
        {
            using (var session = SessionFactory.OpenSession())
            using (var ts = session.BeginTransaction())
            {
                session.Update(oldEOQ);
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
                var result = session.QueryOver<EOQ>().RowCount();
                return result;
            }

        }

        #endregion
        /// <summary>
        /// use IQueryable
        ///  foreach (var list in iquery)
        ///  Console.WriteLine(grade.eoq.);
        /// </summary>
        /// <returns></returns>
        public void GitEOQ()
        {
            using (var session = SessionFactory.OpenStatelessSession())
            {
                var q = from e in session.Query<EOQ>() 
                        join m in session.Query<Material>() 
                            on e.MatID equals m.MATID
                        select new { eoq = e, m.MATNAME };
                //session.Close();
                //return q.ToList();

            }
        }
    }
}
