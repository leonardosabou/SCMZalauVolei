package scmzalauvolei.scmzalauvoleiBE.model;

import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalDate;

@Entity
@Data
public class NewsItem {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;
    private String imageUrl;

    @Column(length = 500)
    private String linkUrl;

    private LocalDate date;
}
