using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AMSQC.Domain.Models
{
    public class QuestionOption
    {
        [Key]
        public int QuestionOptionId { get; set; }

        public string Title { get; set; }
        public int? DisplayOrder { get; set; }
        public int QuestionId { get; set; }

        public bool IsDeleted { get; set; }
    }
}
