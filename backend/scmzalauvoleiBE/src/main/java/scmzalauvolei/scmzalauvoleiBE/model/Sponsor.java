package scmzalauvolei.scmzalauvoleiBE.model;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
public class Sponsor {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private String logoUrl;
    private Integer displayOrder;
}
