package scmzalauvolei.scmzalauvoleiBE.repository;
import org.springframework.data.jpa.repository.JpaRepository;
import scmzalauvolei.scmzalauvoleiBE.model.MatchGame;
import java.time.LocalDateTime;

public interface MatchRepository extends JpaRepository<MatchGame, Long> {
    // find first match coming up
    MatchGame findFirstByDateAfterOrderByDateAsc(LocalDateTime now);
}
