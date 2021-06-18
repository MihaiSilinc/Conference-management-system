package ro.ubb.cms.server.entity.key

import java.io.Serializable
import java.util.*
import javax.persistence.Column
import javax.persistence.Embeddable

@Embeddable
class EvaluationKey (
    @Column(name = "key_pc_member_id")
    val pcMemberId: UUID,

    @Column(name = "key_proposal_id")
    val proposalId: UUID
): Serializable
