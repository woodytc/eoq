// -----------------------------------------------------------------------
// <copyright file="NHRepository.cs" company="">
// TODO: Update copyright text.
// </copyright>
// -----------------------------------------------------------------------

namespace Eoq.Mappings.FluentNh
{
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Text;
    using NHibernate;

    /// <summary>
    /// TODO: Update summary.
    /// </summary>
    public class NhRepository
    {
        private ISessionFactory _sessionFactory = null;
        public ISessionFactory SessionFactory
        {
            protected get { return _sessionFactory; }
            set { _sessionFactory = value; }
        }
    }
}
