// -----------------------------------------------------------------------
// <copyright file="UserInBranchs.cs" company="">
// TODO: Update copyright text.
// </copyright>
// -----------------------------------------------------------------------

namespace Eoq.Domain.Domain
{
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Text;

    public partial class UserInBranchs
    {
        public virtual string Username { get; set; }
        public virtual int BranchID { get; set; }
    }
}
