package ro.ubb.cms.server.entity

import java.time.LocalDate
import java.util.*
import javax.persistence.Entity
import javax.persistence.FetchType
import javax.persistence.Id
import javax.persistence.OneToMany
import javax.persistence.Table

@Entity
@Table(name = "T_CONFERENCE")
data class Conference(
        var name: String,
        var abstractDeadline: LocalDate,
        var callForPapers: LocalDate,
        var startingDate: LocalDate,
        var endingDate: LocalDate
) {
    @Id
    var id: UUID = UUID.randomUUID()
}
