package ro.ubb.cms.server.entity

import ro.ubb.cms.api.enum.Designation
import ro.ubb.cms.server.entity.key.AssignmentKey
import javax.persistence.*

@Entity
@Table(name = "T_ASSIGNMENT")
class Assignment(
    @EmbeddedId
    val key: AssignmentKey,

    @Column(name = "designation")
    @Enumerated(value = EnumType.STRING)
    var designation: Designation
    ) {

    @ManyToOne
    @JoinColumn(name = "key_pc_member_id", updatable = false, insertable = false)
    val pcMember: PCMember? = null

    @ManyToOne
    @JoinColumn(name = "key_conference_id", updatable = false, insertable = false)
    val conference: Conference? = null
}
