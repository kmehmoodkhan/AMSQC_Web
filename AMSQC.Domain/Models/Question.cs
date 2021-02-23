using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AMSQC.Domain.Models
{

    [Table("Question")]
    public class Question
    {
        [Key]
        public int QuestionId { get; set; }
        public string Title { get; set; }

        public byte QuestionType { get; set; }

        public int? DisplayOrder { get; set; }

        public int? ParentQuestionId { get; set; }

        public byte? Category { get; set; }

        public bool IsDeleted { get; set; }

        virtual public List<QuestionOption> QuestionOptions{get;set;}

        public bool IsSubletQuestion { get; set; }

        public bool IsAdUsers { get; set; }

        public string AllowedSurveyTypes { get; set; }

        public string SurveyQuestionId { get; set; }

    }
}
