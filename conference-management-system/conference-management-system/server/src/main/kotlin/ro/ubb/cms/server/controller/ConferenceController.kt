package ro.ubb.cms.server.controller

import org.springframework.beans.factory.annotation.Autowired
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.CrossOrigin
import org.springframework.web.bind.annotation.RestController
import ro.ubb.cms.api.dto.ConferenceDto
import ro.ubb.cms.api.dto.ConferenceWithChairDto
import ro.ubb.cms.api.resource.ConferenceResource
import ro.ubb.cms.server.service.ConferenceService
import java.util.*

@RestController
@CrossOrigin(originPatterns = ["*"], allowCredentials = "true")
class ConferenceController(
    @Autowired
    var conferenceService: ConferenceService
) : ConferenceResource {
    override fun createConference(conferenceDto: ConferenceDto, userId: UUID): ResponseEntity<ConferenceDto> {
        val savedConference: ConferenceDto = conferenceService.saveConference(conferenceDto, userId)
            ?: return ResponseEntity(HttpStatus.BAD_REQUEST)

        return ResponseEntity(savedConference, HttpStatus.CREATED)
    }

    override fun getConferences(): List<ConferenceWithChairDto> {
        return conferenceService.getConferences()
    }
}
