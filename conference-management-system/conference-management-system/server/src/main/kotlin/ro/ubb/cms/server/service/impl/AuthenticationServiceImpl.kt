package ro.ubb.cms.server.service.impl

import org.springframework.beans.factory.annotation.Autowired
import org.springframework.dao.DataIntegrityViolationException
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder
import org.springframework.security.crypto.password.PasswordEncoder
import org.springframework.stereotype.Service
import ro.ubb.cms.api.dto.UserDto
import ro.ubb.cms.server.repository.UserRepository
import ro.ubb.cms.server.service.AuthenticationService
import ro.ubb.cms.server.service.mapper.UserMapper

@Service
class AuthenticationServiceImpl(
    @Autowired
    private val userRepository: UserRepository,
    @Autowired
    private val userMapper: UserMapper
) : AuthenticationService {

    override fun saveUser(userDto: UserDto): UserDto? {
        val user = userMapper.toEntity(userDto)
        val passwordEncoder: PasswordEncoder = BCryptPasswordEncoder()
        user.password = passwordEncoder.encode(user.password)
        return try {
            userMapper.toDto(userRepository.save(user))
        } catch (exception: DataIntegrityViolationException) {
            null
        }
    }

}
