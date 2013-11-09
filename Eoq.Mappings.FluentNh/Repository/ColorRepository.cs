// -----------------------------------------------------------------------
// <copyright file="ColorRepository.cs" company="">
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

    public interface IColorRepository
    {
        void Save(Color newColor);
        void SaveOrUpdate(Color newColor);
        List<Color> GetAll();
        int Update(Color oldUnit);
        int CountAll();

        void Delete(Color color);
    }

    public class ColorRepository : NhRepository, IColorRepository
    {
        #region save update select all countall

        public void Save(Color newColor)
        {
            using (var session = SessionFactory.OpenSession())
            using (var ts = session.BeginTransaction())
            {
                //HibernatingRhinos.Profiler.Appender.NHibernate.NHibernateProfiler.Initialize();
                session.Save(newColor);
                session.Flush();
                //session.Close();
                ts.Commit();
            }
        }


        public void SaveOrUpdate(Color newColor)
        {
            using (var session = SessionFactory.OpenSession())
            using (var ts = session.BeginTransaction())
            {
                session.SaveOrUpdate(newColor);
                session.Flush();
                //session.Close();
                ts.Commit();
            }
        }

        public List<Color> GetAll()
        {
            //using (var session = SessionFactory.OpenSession())
            //using (session.BeginTransaction(System.Data.IsolationLevel.ReadUncommitted))
            using (var session = SessionFactory.OpenStatelessSession())
            {
                var results = session.QueryOver<Color>().List() as List<Color>;
                //session.Close();
                return results;
            }
        }

        public int Update(Color oldUnit)
        {
            using (var session = SessionFactory.OpenSession())
            using (var ts = session.BeginTransaction())
            {
                session.Update(oldUnit);
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
                var result = session.QueryOver<Color>().RowCount();
                return result;
            }

        }

        public void Delete(Color color)
        {
            using (var session = SessionFactory.OpenStatelessSession())
            {
                session.Delete(color);
            }
        }

        #endregion
    }
}
