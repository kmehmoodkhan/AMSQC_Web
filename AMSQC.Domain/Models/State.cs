using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AMSQC.Domain.Models
{
    [Table("States")]
    public class State
    {
        public int StateId { get; set; }

        public string Title { get; set; }

        public string ShortName { get; set; }
    }
}
