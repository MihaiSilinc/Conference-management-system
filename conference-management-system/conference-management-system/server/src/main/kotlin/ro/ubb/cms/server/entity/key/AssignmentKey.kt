package ro.ubb.cms.server.entity.key

import java.io.Serializable
import java.util.*
import javax.persistence.Column
import javax.persistence.Embeddable

@Embeddable
class AssignmentKey(
    @Column(name = "key_pc_member_id")
    val pcMemberId: UUID,

    @Column(name = "key_conference_id")
    val conferenceId: UUID
): Serializable
