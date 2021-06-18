package ro.ubb.cms.server.config

import org.springframework.beans.factory.annotation.Autowired
import org.springframework.security.authentication.AuthenticationProvider
import org.springframework.security.authentication.BadCredentialsException
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken
import org.springframework.security.core.Authentication
import org.springframework.security.core.AuthenticationException
import org.springframework.security.core.GrantedAuthority
import org.springframework.security.core.authority.SimpleGrantedAuthority
import org.springframework.security.core.context.SecurityContextHolder
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder
import org.springframework.security.crypto.password.PasswordEncoder
import org.springframework.stereotype.Component
import ro.ubb.cms.api.dto.UserDto
import ro.ubb.cms.server.entity.PCMember
import ro.ubb.cms.server.entity.User
import ro.ubb.cms.server.repository.UserRepository
import ro.ubb.cms.server.service.mapper.UserMapper
import ro.ubb.cms.server.util.then
import java.util.*
import java.util.stream.Collectors

@Component
class CustomAuthenticationProvider(
    private val userRepository: UserRepository,
    private val userMapper: UserMapper
): AuthenticationProvider {


    fun doAuthenticate(authentication: Authentication): UserDto? {
        authenticate(authentication)
        val loggedInUser =
            userMapper.toDto(userRepository.findByUsername(SecurityContextHolder.getContext().authentication.name)
                ?: throw BadCredentialsException(""))
        loggedInUser.roles = SecurityContextHolder.getContext().authentication
            .authorities.stream()
            .map { obj -> obj.toString() }
            .collect(Collectors.toList())
        return loggedInUser
    }

    @Throws(AuthenticationException::class)
    override fun authenticate(authentication: Authentication): Authentication? {
        val userName = authentication.name
        val password = authentication.credentials.toString()

        val user: User = userRepository.findByUsername(userName)
            ?: throw BadCredentialsException("Invalid credentials")

        val passwordEncoder: PasswordEncoder = BCryptPasswordEncoder()
        if (passwordEncoder.matches(password, user.password)) {
            val authorities: MutableList<GrantedAuthority> = ArrayList()
            user.isAuthor.then { authorities.add(SimpleGrantedAuthority("AUTHOR")) }
            (user is PCMember).then { authorities.add(SimpleGrantedAuthority("ADMIN")) }

            val auth: Authentication = UsernamePasswordAuthenticationToken(userName, password, authorities)
            SecurityContextHolder.getContext().authentication = auth
            return auth
        } else {
            throw BadCredentialsException("Invalid credentials")
        }
    }

    override fun supports(authentication: Class<*>): Boolean {
        return authentication == UsernamePasswordAuthenticationToken::class.java
    }
}
