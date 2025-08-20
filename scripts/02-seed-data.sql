-- Insert continents
INSERT INTO continents (full_name) VALUES
    ('Europe'),
    ('Asia'),
    ('Africa'),
    ('North America'),
    ('South America'),
    ('Oceania');


-- Insert countries
INSERT INTO countries (uuid, full_name, country_code, continent_id) VALUES
    (gen_random_uuid(), 'Algeria', 'DZ', 3),
    (gen_random_uuid(), 'Argentina', 'AR', 5),
    (gen_random_uuid(), 'Australia', 'AU', 6),
    (gen_random_uuid(), 'Austria', 'AT', 1),
    (gen_random_uuid(), 'Belgium', 'BE', 1),
    (gen_random_uuid(), 'Brazil', 'BR', 5),
    (gen_random_uuid(), 'Cameroon', 'CM', 3),
    (gen_random_uuid(), 'Canada', 'CA', 4),
    (gen_random_uuid(), 'Chile', 'CL', 5),
    (gen_random_uuid(), 'China', 'CN', 2),
    (gen_random_uuid(), 'Colombia', 'CO', 5),
    (gen_random_uuid(), 'Denmark', 'DK', 1),
    (gen_random_uuid(), 'Egypt', 'EG', 3),
    (gen_random_uuid(), 'England', 'GB', 1),
    (gen_random_uuid(), 'Finland', 'FI', 1),
    (gen_random_uuid(), 'France', 'FR', 1),
    (gen_random_uuid(), 'Ghana', 'GH', 3),
    (gen_random_uuid(), 'Germany', 'DE', 1),
    (gen_random_uuid(), 'Hungary', 'HU', 1),
    (gen_random_uuid(), 'Iceland', 'IS', 1),
    (gen_random_uuid(), 'India', 'IN', 2),
    (gen_random_uuid(), 'Iran', 'IR', 2),
    (gen_random_uuid(), 'Ireland', 'IE', 1),
    (gen_random_uuid(), 'Italy', 'IT', 1),
    (gen_random_uuid(), 'Ivory Coast', 'CI', 3),
    (gen_random_uuid(), 'Japan', 'JP', 2),
    (gen_random_uuid(), 'Kenya', 'KE', 3),
    (gen_random_uuid(), 'Mexico', 'MX', 4),
    (gen_random_uuid(), 'Morocco', 'MA', 3),
    (gen_random_uuid(), 'Netherlands', 'NL', 1),
    (gen_random_uuid(), 'New Zealand', 'NZ', 6),
    (gen_random_uuid(), 'Nigeria', 'NG', 3),
    (gen_random_uuid(), 'Norway', 'NO', 1),
    (gen_random_uuid(), 'Peru', 'PE', 5),
    (gen_random_uuid(), 'Portugal', 'PT', 1),
    (gen_random_uuid(), 'Qatar', 'QA', 2),
    (gen_random_uuid(), 'Romania', 'RO', 1),
    (gen_random_uuid(), 'Russia', 'RU', 2), -- Note: Russia is in Europe and Asia
    (gen_random_uuid(), 'Saudi Arabia', 'SA', 2),
    (gen_random_uuid(), 'Senegal', 'SN', 3),
    (gen_random_uuid(), 'Scotland', 'GB', 1),
    (gen_random_uuid(), 'South Africa', 'ZA', 3),
    (gen_random_uuid(), 'South Korea', 'KR', 2),
    (gen_random_uuid(), 'Spain', 'ES', 1),
    (gen_random_uuid(), 'Sweden', 'SE', 1),
    (gen_random_uuid(), 'Switzerland', 'CH', 1),
    (gen_random_uuid(), 'Taiwan', 'TW', 2),
    (gen_random_uuid(), 'Turkey', 'TR', 1), -- Note: Turkey is in Europe and Asia
    (gen_random_uuid(), 'Ukraine', 'UA', 1),
    (gen_random_uuid(), 'United States', 'US', 4),
    (gen_random_uuid(), 'Uruguay', 'UY', 5),
    (gen_random_uuid(), 'Venezuela', 'VE', 5),
    (gen_random_uuid(), 'Wales', 'GB', 1),
    (gen_random_uuid(), 'Zimbabwe', 'ZW', 3);



