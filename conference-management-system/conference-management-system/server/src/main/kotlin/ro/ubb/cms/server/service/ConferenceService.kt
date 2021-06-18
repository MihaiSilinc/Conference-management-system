package ro.ubb.cms.server.service

import ro.ubb.cms.api.dto.ConferenceDto
import ro.ubb.cms.api.dto.ConferenceWithChairDto
import ro.ubb.cms.server.entity.Conference
import java.util.*

interface ConferenceService {
    fun saveConference(conferenceDto: ConferenceDto, userId: UUID): ConferenceDto?
    fun getConferences(): List<ConferenceWithChairDto>
    fun getById(id: UUID): Conference?
}
