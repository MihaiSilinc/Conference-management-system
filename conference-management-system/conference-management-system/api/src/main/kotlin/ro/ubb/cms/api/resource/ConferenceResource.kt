package ro.ubb.cms.api.resource

import io.swagger.annotations.Api
import org.springframework.http.ResponseEntity
import org.springframework.security.access.prepost.PreAuthorize
import org.springframework.web.bind.annotation.*
import ro.ubb.cms.api.dto.ConferenceDto
import ro.ubb.cms.api.dto.ConferenceWithChairDto
import java.util.*

@Api(value = "Conference resource")
@RequestMapping(value = ["/api/conference"])
interface ConferenceResource {

    @PreAuthorize("hasAuthority('ADMIN')")
    @PostMapping(value = ["/create/{userId}"])
    fun createConference(@RequestBody conferenceDto: ConferenceDto, @PathVariable userId: UUID): ResponseEntity<ConferenceDto>

    @PreAuthorize("hasAuthority('AUTHOR')")
    @GetMapping()
    fun getConferences(): List<ConferenceWithChairDto>


}
