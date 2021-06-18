package ro.ubb.cms.api.resource

import io.swagger.annotations.Api
import org.springframework.http.ResponseEntity
import org.springframework.security.access.prepost.PreAuthorize
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RequestMapping
import ro.ubb.cms.api.dto.CredentialsDto
import ro.ubb.cms.api.dto.UserDto

@Api(value = "Authentication")
@RequestMapping(value = ["/api/authentication"])
interface AuthenticationResource {

    @PreAuthorize("hasAuthority('ADMIN')")
    @GetMapping(value = ["/hello"])
    fun callApp(): String

    @PostMapping(value = ["/register"])
    fun register(@RequestBody userDto: UserDto): ResponseEntity<UserDto>

    @PostMapping(value = ["/login"])
    fun login(@RequestBody credentials: CredentialsDto): ResponseEntity<UserDto>
}
