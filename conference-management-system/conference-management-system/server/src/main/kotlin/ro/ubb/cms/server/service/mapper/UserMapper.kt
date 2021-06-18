package ro.ubb.cms.server.service.mapper

import org.springframework.stereotype.Component
import ro.ubb.cms.api.dto.UserDto
import ro.ubb.cms.api.enum.UserType
import ro.ubb.cms.server.entity.*

@Component
class UserMapper : EntityMapper<User, UserDto> {
    //        TODO think about different types of users and how to handle the id
    override fun toEntity(dto: UserDto): User {
        when (dto.userType) {
            UserType.AUTHOR -> return Author(
                dto.username ?: "",
                dto.password ?: "",
                dto.firstName ?: "",
                dto.lastName ?: "",
                dto.emailAddress ?: ""
            )
            UserType.PCMEMBER -> return PCMember(
                dto.affiliation ?: "",
                dto.webPage ?: "",
                dto.emailAddress ?: "",
                dto.username ?: "",
                dto.password ?: "",
                dto.firstName ?: "",
                dto.lastName ?: ""
            )
            UserType.LISTENER -> return Listener(
                dto.username ?: "",
                dto.password ?: "",
                dto.firstName ?: "",
                dto.lastName ?: "",
                dto.emailAddress ?: ""
            )
            else -> throw RuntimeException("user type " + dto.userType + " does not exist")
        }
    }

    override fun toDto(entity: User): UserDto {
        when (entity) {
            is PCMember -> return UserDto(
                entity.id.toString(),
                entity.username,
                entity.password,
                entity.firstName,
                entity.lastName,
                entity.affiliation,
                entity.emailAddress,
                entity.emailAddress,
                UserType.PCMEMBER,
                emptyList()
            )
            is Listener -> return UserDto(
                entity.id.toString(),
                entity.username,
                entity.password,
                entity.firstName,
                entity.lastName,
                null,
                null,
                null,
                UserType.LISTENER,
                emptyList()
            )
            is Author -> return UserDto(
                entity.id.toString(),
                entity.username,
                entity.password,
                entity.firstName,
                entity.lastName,
                null,
                null,
                null,
                UserType.AUTHOR,
                emptyList()
            )
            else -> throw RuntimeException("User not of valid type")
        }
    }
}
