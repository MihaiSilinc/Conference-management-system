package ro.ubb.cms.server.service

import ro.ubb.cms.api.dto.UserDto

interface AuthenticationService {
    fun saveUser(userDto: UserDto): UserDto?
}
