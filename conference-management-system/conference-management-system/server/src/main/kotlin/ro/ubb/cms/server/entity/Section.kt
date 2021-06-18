package ro.ubb.cms.server.entity

import java.util.*
import javax.persistence.Entity
import javax.persistence.FetchType
import javax.persistence.Id
import javax.persistence.ManyToOne
import javax.persistence.OneToMany
import javax.persistence.Table

@Entity
@Table(name = "T_SECTION")
data class Section(
        var name: String,

        @ManyToOne
        var conference: Conference
) {
    @Id
    var id: UUID = UUID.randomUUID()
}
