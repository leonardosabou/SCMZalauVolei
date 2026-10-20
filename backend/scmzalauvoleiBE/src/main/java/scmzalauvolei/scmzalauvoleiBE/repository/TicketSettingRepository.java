package scmzalauvolei.scmzalauvoleiBE.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import scmzalauvolei.scmzalauvoleiBE.model.TicketSetting;

public interface TicketSettingRepository extends JpaRepository<TicketSetting, Long> {
}