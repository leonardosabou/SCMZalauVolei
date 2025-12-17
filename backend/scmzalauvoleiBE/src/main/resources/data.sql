
INSERT INTO sponsor (name, logo_url, display_order)
    VALUES
    ('Autodan', '/assets/sponsors/autodan.png', 1),
    ('Avril', '/assets/sponsors/avril.png', 2),
    ('Brilliant', '/assets/sponsors/brilliant.jpg', 3),
    ('CityGroup', '/assets/sponsors/citygroup.png', 4),
    ('Welthaus', '/assets/sponsors/welthaus.png', 5),
    ('Rematinvest', '/assets/sponsors/rematinvest.png', 6),
    ('Silcar', '/assets/sponsors/silcar.png', 7),
    ('TotalAS', '/assets/sponsors/totalas.png', 8);


INSERT INTO news_item (title, image_url, link_url, date)
VALUES
    ('Lovitura de final de mercato', '/assets/news/stire1.png', 'https://www.sportulsalajean.ro/lovitura-de-final-de-mercato-pentru-scm-zalau-un-international-din-estonia-vine-sa-aduca-forta-in-extrema-a-278067', '2024-10-15'),
    ('Incepe Divizia A1', '/assets/news/stire2.png', 'https://www.sportulsalajean.ro/divizia-a1-la-volei-masculin-incepe-in-weekend-cum-arata-programul-lui-scm-zalau-in-tur-a-277913', '2024-10-10');


INSERT INTO match_game (opponent, opponent_logo_url, date, location, competition)
VALUES
    ('CSM Bucuresti', '/assets/teams/csmbucuresti.png', '2025-12-17 18:00:00', 'Acasă', 'Divizia A1'),
    ('CS Stiinta Explorari Baia Mare', '/assets/teams/baiamare.png', '2026-01-10 18:00:00', 'Deplasare', 'Divizia A1'),
    ('Arcada Galati', '/assets/teams/arcada.png', '2026-01-17 18:00:00', 'Deplasare', 'Divizia A1');

INSERT INTO match_result (stage, image_url)
VALUES
    ('Etapa I', '/assets/results/RezultatEtapaI.png'),
    ('Etapa II', '/assets/results/RezultatEtapaII.png');

INSERT INTO game_highlight (type, media_url, description)
VALUES
    ('image', '/assets/highlights/new-book-1.png', 'Atac Zalau'),
    ('image', '/assets/highlights/new-book-2.png', 'Blocaj Zalau'),
    ('video', '/assets/highlights/werty_im_4k_g2.mp4', 'Punctul decisiv');