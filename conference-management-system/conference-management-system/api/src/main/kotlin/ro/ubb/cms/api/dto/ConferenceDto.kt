package ro.ubb.cms.api.dto

import java.time.LocalDate

class ConferenceDto(
    var id: String,
    var name: String,
    var abstractDeadline: LocalDate,
    var callForPapers: LocalDate,
    var startingDate: LocalDate,
    var endingDate: LocalDate
) { }
