package ro.ubb.cms.server.entity

import javax.persistence.Entity

@Entity
class Listener(
        username: String,
        password: String,
        firstName: String,
        lastName: String,
        emailAddress: String
) : User(username, password, firstName, lastName, emailAddress, false)
