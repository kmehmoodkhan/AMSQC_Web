using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AMSQC.Domain.Models
{
    public class UserQuestionResponse
    {
        [Key]
        public int UserQuestionResponseId { get; set; }
        public int UserId { get; set; }

        [NotMapped]
        public string UserGuid { get; set; }
        public int QuoteId { get; set; }
        public int QuestionId { get; set; }
        public string Answer { get; set; }
        public string AnswerIds { get; set; }
        public DateTime CreatedOn { get; set; }

	}
}
