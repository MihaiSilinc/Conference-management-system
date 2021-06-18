package ro.ubb.cms.server.entity

import java.sql.Time
import java.util.*
import javax.persistence.Entity
import javax.persistence.Id
import javax.persistence.ManyToOne
import javax.persistence.Table

@Entity
@Table(name = "T_PRESENTATION")
data class Presentation(
        @ManyToOne
        var pcMember: PCMember,

        @ManyToOne
        var author: Author,

        var date: Date,

        var startTime: Time,

        var endTime: Time,

        @ManyToOne
        var section: Section
) {
    @Id
    var id: UUID = UUID.randomUUID()
}
