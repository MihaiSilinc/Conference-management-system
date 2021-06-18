package ro.ubb.cms.server.entity

import ro.ubb.cms.api.enum.EvaluationScore
import ro.ubb.cms.server.entity.key.EvaluationKey
import javax.persistence.*

@Entity
@Table(name = "T_EVALUATION")
data class Evaluation(

    @EmbeddedId
    var key: EvaluationKey,

    @Enumerated(EnumType.STRING)
    var evaluationScore: EvaluationScore? = null,

    var recommendation: String? = null
) {
    @ManyToOne
    @JoinColumn(name = "key_pc_member_id", updatable = false, insertable = false)
    val pcMember: PCMember? = null

    @ManyToOne
    @JoinColumn(name = "key_proposal_id", updatable = false, insertable = false)
    val proposal: Proposal? = null
}
