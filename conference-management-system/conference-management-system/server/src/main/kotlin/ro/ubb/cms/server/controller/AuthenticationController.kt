package ro.ubb.cms.server.controller

import org.springframework.beans.factory.annotation.Autowired
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.orm.hibernate5.SessionHolder
import org.springframework.security.authentication.BadCredentialsException
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken
import org.springframework.security.core.context.SecurityContext
import org.springframework.security.web.authentication.logout.SecurityContextLogoutHandler
import org.springframework.web.bind.annotation.CrossOrigin
import org.springframework.web.bind.annotation.RestController
import ro.ubb.cms.api.dto.CredentialsDto
import ro.ubb.cms.api.dto.UserDto
import ro.ubb.cms.api.resource.AuthenticationResource
import ro.ubb.cms.server.config.CustomAuthenticationProvider
import ro.ubb.cms.server.service.AuthenticationService
import javax.servlet.SessionCookieConfig
import kotlin.math.log

@RestController
@CrossOrigin(originPatterns = ["*"], allowCredentials = "true")
class AuthenticationController(
    @Autowired
    var authenticationService: AuthenticationService,
    @Autowired
    var customAuthProvider: CustomAuthenticationProvider
): AuthenticationResource {

    override fun callApp(): String {
        return "hello"
    }

    override fun register(userDto: UserDto): ResponseEntity<UserDto> {
        val savedUser: UserDto = authenticationService.saveUser(userDto)
            ?: return ResponseEntity(HttpStatus.BAD_REQUEST)

        return ResponseEntity(savedUser, HttpStatus.CREATED)
    }

    override fun login(credentials: CredentialsDto): ResponseEntity<UserDto> {
        return try {
            val user = UsernamePasswordAuthenticationToken(
                credentials.username,
                credentials.password
            )
            val loggedInUser: UserDto = customAuthProvider.doAuthenticate(user)
                ?: throw BadCredentialsException("")
            ResponseEntity<UserDto>(loggedInUser, HttpStatus.OK)
        } catch (e: BadCredentialsException) {
            ResponseEntity(HttpStatus.BAD_REQUEST)
        }
    }
}
