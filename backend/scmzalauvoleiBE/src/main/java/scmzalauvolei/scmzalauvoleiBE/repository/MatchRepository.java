package scmzalauvolei.scmzalauvoleiBE.repository;
import org.springframework.data.jpa.repository.JpaRepository;
import scmzalauvolei.scmzalauvoleiBE.model.MatchGame;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

public interface MatchRepository extends JpaRepository<MatchGame, Long> {
    MatchGame findFirstByDateAfterAndIsFinishedFalseOrderByDateAsc(LocalDateTime date);

    List<MatchGame> findAllByDateAfterOrderByDateAsc(LocalDateTime date);
}
