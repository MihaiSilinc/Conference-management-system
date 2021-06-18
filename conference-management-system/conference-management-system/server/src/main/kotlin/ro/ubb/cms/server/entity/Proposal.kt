package ro.ubb.cms.server.entity

import org.hibernate.annotations.Fetch
import java.util.*
import javax.persistence.*

@Entity
@Table(name = "T_PROPOSAL")
data class Proposal(
        var name: String,

        @OneToOne(fetch = FetchType.EAGER)
        var paper: Paper,

        var abstractParagraph: String,

        @ManyToOne(fetch = FetchType.EAGER)
        var conference: Conference,

        @ManyToOne(fetch = FetchType.EAGER)
        var author: Author,

        @OneToMany(fetch = FetchType.LAZY, mappedBy = "proposal")
        var reviews: Set<Evaluation>
) {
    @Id
    var id: UUID = UUID.randomUUID()
}
