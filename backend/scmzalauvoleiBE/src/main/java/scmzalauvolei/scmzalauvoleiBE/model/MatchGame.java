package scmzalauvolei.scmzalauvoleiBE.model;

import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalDateTime;

@Entity
public class MatchGame {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String opponent;
    private String opponentLogoUrl;
    @JsonFormat(pattern = "yyyy-MM-dd'T'HH:mm:ss")
    private LocalDateTime date;
    private String location; // Acasa / Deplasare
    private String competition; // Divizia A1 / CEV / Cupa

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getOpponent() { return opponent; }
    public void setOpponent(String opponent) { this.opponent = opponent; }

    public String getOpponentLogoUrl() { return opponentLogoUrl; }
    public void setOpponentLogoUrl(String opponentLogoUrl) { this.opponentLogoUrl = opponentLogoUrl; }

    public LocalDateTime getDate() { return date; }
    public void setDate(LocalDateTime date) { this.date = date; }

    public String getLocation() { return location; }
    public void setLocation(String location) { this.location = location; }

    public String getCompetition() { return competition; }
    public void setCompetition(String competition) { this.competition = competition; }
}
