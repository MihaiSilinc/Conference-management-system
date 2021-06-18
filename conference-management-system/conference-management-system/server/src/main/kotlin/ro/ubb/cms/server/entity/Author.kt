package ro.ubb.cms.server.entity

import javax.persistence.Entity

@Entity
open class Author(
        username: String,
        password: String,
        firstName: String,
        lastName: String,
        emailAddress: String
) : User(username, password, firstName, lastName, emailAddress, true)
