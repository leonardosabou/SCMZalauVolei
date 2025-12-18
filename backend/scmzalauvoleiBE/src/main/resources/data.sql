
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


INSERT INTO match_game (opponent, opponent_logo_url, date, location, competition, is_finished)
VALUES
    ('CSM București', '/assets/teams/csmbucuresti.png', '2025-12-17 19:00:00', 'Acasă', 'Divizia A1', false),
    ('CS Știința Explorări Baia Mare', '/assets/teams/baiamare.png', '2026-01-10 18:00:00', 'Deplasare', 'Divizia A1', false),
    ('Arcada Galați', '/assets/teams/arcada.png', '2026-01-17 18:00:00', 'Deplasare', 'Divizia A1', false),
    ('CS Dinamo București', '/assets/teams/dinamo.png', '2026-01-24 18:00:00', 'Acasă', 'Divizia A1', false),
    ('CS Rapid București', '/assets/teams/rapid.png', '2026-01-31 18:00:00', 'Deplasare', 'Divizia A1', false),
    ('CSU Știința Politehnica București', '/assets/teams/polibucuresti.png', '2026-02-04 18:00:00', 'Deplasare', 'Cupa României', false),
    ('CSA Steaua București', '/assets/teams/steaua.png', '2026-02-07 18:00:00', 'Acasă', 'Divizia A1', false),
    ('CSM Corona Brașov', '/assets/teams/corona.png', '2026-02-14 18:00:00', 'Deplasare', 'Divizia A1', false),
    ('SCMU Craiova', '/assets/teams/craiova.png', '2026-02-21 18:00:00', 'Acasă', 'Divizia A1', false),
    ('CSU Știința Politehnica București', '/assets/teams/polibucuresti.png', '2026-02-25 18:00:00', 'Acasă', 'Cupa României', false),
    ('CSU Știința Politehnica București', '/assets/teams/polibucuresti.png', '2026-02-28 18:00:00', 'Deplasare', 'Divizia A1', false),
    ('CS Unirea Dej', '/assets/teams/dej.png', '2026-03-07 18:00:00', 'Acasă', 'Divizia A1', false),
    ('CSM București', '/assets/teams/csmbucuresti.png', '2026-03-14 18:00:00', 'Deplasare', 'Divizia A1', false);

INSERT INTO match_result (stage, image_url)
VALUES
    ('Etapa I', '/assets/results/etapa1.png'),
    ('Etapa II', '/assets/results/etapa2.png'),
    ('Etapa III', '/assets/results/etapa3.png'),
    ('Etapa IV', '/assets/results/etapa4.png'),
    ('Etapa V', '/assets/results/etapa5.png'),
    ('Etapa VI', '/assets/results/etapa6.png'),
    ('Etapa VII', '/assets/results/etapa7.png'),
    ('Etapa VIII', '/assets/results/etapa8.png'),
    ('Etapa IX', '/assets/results/etapa9.png'),
    ('Etapa X', '/assets/results/etapa10.png');

INSERT INTO game_highlight (type, media_url, description)
VALUES
    ('image', '/assets/highlights/2025brasov1.png', 'Punct castigat Cveticanin'),
    ('image', '/assets/highlights/2025brasov2.png', 'Punct castigat'),
    ('image', '/assets/highlights/2025brasov3.png', 'Blocaj Teppan Mendosa'),
    ('image', '/assets/highlights/2025brasov4.png', 'Punct castigat Teppan'),
    ('image', '/assets/highlights/2025brasov5.png', 'Meci castigat');

INSERT INTO player (name, shirt_number, nationality, position, height, date_of_birth, image_url, volleybox_url)
VALUES
    ('Thiago Suárez Mendoza', 1, 'CUBA', 'Centru', '215 cm', '2004-09-15', '/assets/team/mendosa.png', 'https://volleybox.net/thiago-suarez-mendoza-p115237/clubs'),
    ('Matei Platon', 27, 'ROMANIA', 'Libero', '185 cm', '2003-07-27', '/assets/team/platon.png', 'https://volleybox.net/matei-platon-p79598/clubs'),
    ('Victor Hugo Simões', 23, 'BRAZIL', 'Extremă/Secund', '197 cm', '1998-03-20', 'assets/team/simoes.png', 'https://volleybox.net/victor-hugo-simoes-p57597/clubs'),
    ('Filip Cvetićanin', 77, 'PORTUGAL, SERBIA', 'Centru', '201 cm', '1996-06-19', 'assets/team/cveticanin.png', 'https://volleybox.net/filip-cveticanin-p5648/clubs'),
    ('Albert Hurt', 24, 'ESTONIA', 'Extremă/Secund', '190 cm', '1999-04-22', 'assets/team/hurt.png', 'https://volleybox.net/albert-hurt-p31647/clubs'),
    ('Gabriel Vilaça', 13, 'BRAZIL', 'Centru', '201 cm', '2002-06-23', 'assets/team/vilaca.png', 'https://volleybox.net/gabriel-vilaca-p76997/clubs'),
    ('Alexandru Ionescu', 28, 'ROMANIA', 'Universal', '208 cm', '1998-07-22', 'assets/team/ionescu.png', 'https://volleybox.net/alexandru-ionescu-p33334/clubs'),
    ('Dragoș Crișan', 21, 'ROMANIA', 'Libero', '175 cm', '2008-04-12', 'assets/team/crisan.png', 'https://volleybox.net/drago-crian-p145990/indoor_tournaments');

INSERT INTO staff (name, role, image_url) VALUES
    ('Adrian Feher', 'Antrenor principal', '/assets/team/feher.png'),
    ('Marius Lazăr', 'Antrenor secund', '/assets/team/lazar.png'),
    ('Istvan Major', 'Fizioterapeut', '/assets/team/major.png'),
/*    ('Călin Marincaș', 'Preparator fizic', '/assets/team/marincas.jpg'),*/
    ('Tudor Lazăr', 'Statistician', '/assets/team/lazar2.png'),
    ('Gabriel Terheș', 'Director sportiv', 'assets/team/terhes.png');

INSERT INTO standing (image_url, description)
VALUES
    ('/assets/standings/divizia_a1.png', 'Clasament Divizia A1');