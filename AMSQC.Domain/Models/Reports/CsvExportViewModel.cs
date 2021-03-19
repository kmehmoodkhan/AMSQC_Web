using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AMSQC.Domain.Models.Reports
{
   public class CsvExportViewModel
    {
        public int QuoteNo { get; set; }

        public string ClaimNo { get; set; }

        public string Registration { get; set; }

        public  string Make { get; set; }

        public string Model { get; set; }

        public string User { get; set; }

        public DateTime CompletionDate { get; set; }

        public DateTime AuditDate { get; set; }

        public int SeverityCategory { get; set; }

        public string RemoveReplace { get; set; }

        public string AlignmentIssue { get; set; }

        public string DamagePartsMissed  { get; set; }

        public string QuotedPartsNotFitted { get; set; }


        public string ElectricalIssue { get; set; }

        public string IncorrectlyFitted { get; set; }

        public string Other { get; set; }

        public string RepairsPanel { get; set; }

        public string DamageMissed { get; set; }

        public string Other1 { get; set; }

        public string PoorAlignment{ get; set; }

        public string RepairNotAcceptable { get; set; }

        public string Paint { get; set; }

        public string Blemish { get; set; }

        public string Blend { get; set; }

        public string GlossLevels { get; set; }

        public string PaintColourMatch { get; set; }

        public string TextureFinish { get; set; }

        public string Detailing { get; set; }

        public string MarksVisible { get; set; }

        public string ExteriorNotClean { get; set; }

        public string InteriorNotClean { get; set; }

        public string Other2 { get; set; }

        public string WeldingBonding { get; set; }

        public string SealerAdhesiveFoam { get; set; }

        public string RoadTest { get; set; }

        public string UnderCarriageInspection { get; set; }
    }
}
