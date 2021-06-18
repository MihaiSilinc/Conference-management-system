package ro.ubb.cms.server.repository

import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.stereotype.Repository
import ro.ubb.cms.server.entity.Paper


@Repository
interface PaperRepository: JpaRepository<Paper, String> {
}
