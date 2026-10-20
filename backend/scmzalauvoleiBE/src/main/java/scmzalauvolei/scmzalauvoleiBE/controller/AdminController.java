package scmzalauvolei.scmzalauvoleiBE.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import scmzalauvolei.scmzalauvoleiBE.model.*;
import scmzalauvolei.scmzalauvoleiBE.repository.*;
import scmzalauvolei.scmzalauvoleiBE.service.FileUploadService;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Map;

@RestController
@RequestMapping("/api/admin")
@CrossOrigin(origins = "*")
public class AdminController {

    @Autowired
    private FileUploadService fileUploadService;

    @Autowired
    private NewsRepository newsRepository;

    @Autowired
    private SponsorRepository sponsorRepository;

    @Autowired
    private GameHighlightRepository gameHighlightRepository;

    @Autowired
    private MatchRepository matchRepository;

    @Autowired
    private MatchResultRepository matchResultRepository;

    @Autowired
    private StandingRepository standingRepository;

    @Autowired
    private PlayerRepository playerRepository;

    @Autowired
    private StaffRepository staffRepository;


    //
    // STIRI
    //
    @PostMapping("/news")
    public ResponseEntity<?> addNews(
            @RequestParam("title") String title,
            @RequestParam("linkUrl") String linkUrl,
            @RequestParam("date") String date,
            @RequestParam("image") MultipartFile image) {

        try {
            String imageUrl = fileUploadService.uploadImage(image);

            NewsItem news = new NewsItem();
            news.setTitle(title);
            news.setLinkUrl(linkUrl);
            news.setDate(LocalDate.parse(date));
            news.setImageUrl(imageUrl);

            NewsItem savedNews = newsRepository.save(news);

            return ResponseEntity.ok(Map.of(
                    "message", "Știre adăugată cu succes!",
                    "news", savedNews
            ));

        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.internalServerError().body(Map.of("error", "Eroare la adăugarea știrii: " + e.getMessage()));
        }
    }
    @DeleteMapping("/news/{id}")
    public ResponseEntity<?> deleteNews(@PathVariable Long id) {
        try {
            if (!newsRepository.existsById(id)) {
                return ResponseEntity.badRequest().body(Map.of("error", "Știrea nu a fost găsită!"));
            }

            // Ștergem din baza de date
            newsRepository.deleteById(id);

            return ResponseEntity.ok(Map.of("message", "Știrea a fost ștearsă cu succes!"));
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.internalServerError().body(Map.of("error", "Eroare la ștergere: " + e.getMessage()));
        }
    }

    //
    // SPONSORI
    //
    @PostMapping("/sponsors")
    public ResponseEntity<?> addSponsor(
            @RequestParam("name") String name,
            @RequestParam("linkUrl") String linkUrl,
            @RequestParam("displayOrder") int displayOrder,
            @RequestParam("image") MultipartFile image) {
        try {
            String logoUrl = fileUploadService.uploadImage(image);

            Sponsor sponsor = new Sponsor();
            sponsor.setName(name);
            sponsor.setLinkUrl(linkUrl);
            sponsor.setDisplayOrder(displayOrder);
            sponsor.setLogoUrl(logoUrl);

            return ResponseEntity.ok(sponsorRepository.save(sponsor));
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body(Map.of("error", e.getMessage()));
        }
    }

    @DeleteMapping("/sponsors/{id}")
    public ResponseEntity<?> deleteSponsor(@PathVariable Long id) {
        sponsorRepository.deleteById(id);
        return ResponseEntity.ok(Map.of("message", "Sponsor șters!"));
    }

    //
    // GALERIE
    //
    @PostMapping("/highlights")
    public ResponseEntity<?> addHighlight(
            @RequestParam("type") String type, // "image" sau "video"
            @RequestParam("image") MultipartFile file) {
        try {
            String mediaUrl = fileUploadService.uploadImage(file);

            GameHighlight highlight = new GameHighlight();
            highlight.setType(type);
            highlight.setMediaUrl(mediaUrl);

            return ResponseEntity.ok(gameHighlightRepository.save(highlight));
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body(Map.of("error", e.getMessage()));
        }
    }

    @DeleteMapping("/highlights/{id}")
    public ResponseEntity<?> deleteHighlight(@PathVariable Long id) {
        gameHighlightRepository.deleteById(id);
        return ResponseEntity.ok(Map.of("message", "Media ștearsă!"));
    }


    //
    // PROGRAM MECIURI (MATCH GAME)
    //
    @PostMapping("/matches")
    public ResponseEntity<?> addMatch(
            @RequestParam("opponent") String opponent,
            @RequestParam("date") String dateString, // Format: YYYY-MM-DDTHH:mm
            @RequestParam("location") String location,
            @RequestParam("competition") String competition,
            @RequestParam("image") MultipartFile image) {
        try {
            String logoUrl = fileUploadService.uploadImage(image);

            MatchGame match = new MatchGame();
            match.setOpponent(opponent);
            match.setDate(LocalDateTime.parse(dateString));
            match.setLocation(location);
            match.setCompetition(competition);
            match.setFinished(false);
            match.setOpponentLogoUrl(logoUrl);

            return ResponseEntity.ok(matchRepository.save(match));
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body(Map.of("error", e.getMessage()));
        }
    }

    @PutMapping("/matches/{id}")
    public ResponseEntity<?> updateMatchStatusAndDate(
            @PathVariable Long id,
            @RequestParam("date") String dateString,
            @RequestParam("isFinished") boolean isFinished) {
        try {
            MatchGame match = matchRepository.findById(id)
                    .orElseThrow(() -> new RuntimeException("Meciul nu a fost găsit"));

            match.setDate(LocalDateTime.parse(dateString));
            match.setFinished(isFinished);

            return ResponseEntity.ok(matchRepository.save(match));
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body(Map.of("error", e.getMessage()));
        }
    }

    @DeleteMapping("/matches/{id}")
    public ResponseEntity<?> deleteMatch(@PathVariable Long id) {
        matchRepository.deleteById(id);
        return ResponseEntity.ok(Map.of("message", "Meci șters!"));
    }


    // REZULTATE

    @PostMapping("/results")
    public ResponseEntity<?> addResult(
            @RequestParam("stage") String stage,
            @RequestParam("image") MultipartFile image) {
        try {
            String imageUrl = fileUploadService.uploadImage(image);

            MatchResult result = new MatchResult();
            result.setStage(stage);
            result.setImageUrl(imageUrl);

            return ResponseEntity.ok(matchResultRepository.save(result));
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body(Map.of("error", e.getMessage()));
        }
    }

    @DeleteMapping("/results/{id}")
    public ResponseEntity<?> deleteResult(@PathVariable Long id) {
        matchResultRepository.deleteById(id);
        return ResponseEntity.ok(Map.of("message", "Rezultat șters!"));
    }


    // CLASAMENTE

    @PostMapping("/standings")
    public ResponseEntity<?> addStanding(
            @RequestParam("description") String description,
            @RequestParam("image") MultipartFile image) {
        try {
            String imageUrl = fileUploadService.uploadImage(image);

            Standing standing = new Standing();
            standing.setDescription(description);
            standing.setImageUrl(imageUrl);

            return ResponseEntity.ok(standingRepository.save(standing));
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body(Map.of("error", e.getMessage()));
        }
    }

    @DeleteMapping("/standings/{id}")
    public ResponseEntity<?> deleteStanding(@PathVariable Long id) {
        standingRepository.deleteById(id);
        return ResponseEntity.ok(Map.of("message", "Clasament șters!"));
    }

    // JUCĂTORI
    @PostMapping("/players")
    public ResponseEntity<?> addPlayer(
            @RequestParam("name") String name,
            @RequestParam("shirtNumber") Integer shirtNumber,
            @RequestParam("nationality") String nationality,
            @RequestParam("position") String position,
            @RequestParam("height") String height,
            @RequestParam("dateOfBirth") String dateOfBirth, // Așteaptă YYYY-MM-DD
            @RequestParam(value = "volleyboxUrl", required = false) String volleyboxUrl,
            @RequestParam("image") MultipartFile image) {
        try {
            String imageUrl = fileUploadService.uploadImage(image);

            Player player = new Player();
            player.setName(name);
            player.setShirtNumber(shirtNumber);
            player.setNationality(nationality);
            player.setPosition(position);
            player.setHeight(height);
            player.setDateOfBirth(LocalDate.parse(dateOfBirth));
            player.setVolleyboxUrl(volleyboxUrl);
            player.setImageUrl(imageUrl);

            return ResponseEntity.ok(playerRepository.save(player));
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body(Map.of("error", e.getMessage()));
        }
    }

    @DeleteMapping("/players/{id}")
    public ResponseEntity<?> deletePlayer(@PathVariable Long id) {
        playerRepository.deleteById(id);
        return ResponseEntity.ok(Map.of("message", "Jucător șters!"));
    }

    // STAFF TEHNIC
    @PostMapping("/staff")
    public ResponseEntity<?> addStaff(
            @RequestParam("name") String name,
            @RequestParam("role") String role,
            @RequestParam("image") MultipartFile image) {
        try {
            String imageUrl = fileUploadService.uploadImage(image);

            Staff staff = new Staff();
            staff.setName(name);
            staff.setRole(role);
            staff.setImageUrl(imageUrl);

            return ResponseEntity.ok(staffRepository.save(staff));
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body(Map.of("error", e.getMessage()));
        }
    }

    @DeleteMapping("/staff/{id}")
    public ResponseEntity<?> deleteStaff(@PathVariable Long id) {
        staffRepository.deleteById(id);
        return ResponseEntity.ok(Map.of("message", "Membru staff șters!"));
    }
}