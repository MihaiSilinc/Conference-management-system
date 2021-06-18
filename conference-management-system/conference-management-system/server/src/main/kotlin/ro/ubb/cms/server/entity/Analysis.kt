package ro.ubb.cms.server.entity

import ro.ubb.cms.server.enum.AnalysisScore
import java.util.*
import javax.persistence.*

@Entity
@Table(name = "T_ANALYSIS")
class Analysis (
    @ManyToOne
    var pcMember: PCMember,
    @ManyToOne
    var proposal: Proposal,

    @Enumerated(EnumType.STRING)
    var analysisScore: AnalysisScore,
) {
    @Id
    val id: UUID = UUID.randomUUID();
}
