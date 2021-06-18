package ro.ubb.cms.server.entity

import java.util.*
import javax.persistence.Column
import javax.persistence.Entity
import javax.persistence.Id
import javax.persistence.Table

@Entity
@Table(name = "T_USER")
abstract class User(
        open var username: String,
        open var password: String,
        open var firstName: String,
        open var lastName: String,
        open var emailAddress: String,
        open var isAuthor: Boolean
) {
    @Id
    open var id: UUID = UUID.randomUUID()
}
