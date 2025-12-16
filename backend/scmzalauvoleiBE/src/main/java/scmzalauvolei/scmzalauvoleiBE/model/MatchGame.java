package scmzalauvolei.scmzalauvoleiBE.model;

import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalDateTime;

@Entity
@Data
public class MatchGame {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String opponent;
    private String opponentLogoUrl;
    private LocalDateTime date;
    private String location; // Acasa / Deplasare
    private String competition; // Divizia A1 / CEV / Cupa
}
