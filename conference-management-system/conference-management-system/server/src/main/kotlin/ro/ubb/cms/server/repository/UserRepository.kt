package ro.ubb.cms.server.repository

import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.stereotype.Repository
import ro.ubb.cms.server.entity.User
import java.util.*

@Repository
interface UserRepository: JpaRepository<User,UUID> {
    fun findByUsername(username: String): User?
}
