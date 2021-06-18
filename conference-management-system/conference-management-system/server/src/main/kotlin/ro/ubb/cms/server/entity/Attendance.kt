package ro.ubb.cms.server.entity

import java.util.*
import javax.persistence.Entity
import javax.persistence.Id
import javax.persistence.ManyToOne
import javax.persistence.Table

@Entity
@Table(name = "T_ATTENDANCE")
data class Attendance(
        @ManyToOne
        var listener: Listener,
        @ManyToOne
        var presentation: Presentation,
) {
    @Id
    var id: UUID = UUID.randomUUID()
}
