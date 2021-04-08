using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace AMSQC.Domain.Models
{
    public class UserQuestionResponse
    {
        [Key]
        public int UserQuestionResponseId { get; set; }
        public int UserId { get; set; }

        [NotMapped]
        public Guid UserGuid { get; set; }
        public int QuoteId { get; set; }
        public int QuestionId { get; set; }

        [NotMapped]
        public int Category { get; set; }

        [NotMapped]
        public bool IsSubletQuestion { get; set; }
        public string Answers { get; set; }
        public string AnswerIds { get; set; }

        [JsonIgnore]
        public DateTime CreatedOn { get; set; }

        public List<SubQuestionResponse> SubQuestionResponse { get; set; }



	}

    public class SubQuestionResponse
    {
        [Key]
        public int SubQuestionResponseId { get; set; }
        public int SubQuestionId { get; set; }

        public int AnswerOptionId { get; set; }
    }
}
