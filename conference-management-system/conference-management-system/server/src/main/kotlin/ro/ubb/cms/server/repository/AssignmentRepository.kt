package ro.ubb.cms.server.repository

import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.stereotype.Repository
import ro.ubb.cms.api.enum.Designation
import ro.ubb.cms.server.entity.Assignment
import ro.ubb.cms.server.entity.key.AssignmentKey

@Repository
interface AssignmentRepository: JpaRepository<Assignment, AssignmentKey> {
    fun findAllByDesignation(designation: Designation): List<Assignment>
}
