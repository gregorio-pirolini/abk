-- Insert data into theme, subject, and definition
INSERT INTO theme (theme_name)
VALUES ('raid');

INSERT INTO subject (subject_name)
VALUES ('bs');

INSERT INTO definition (definition_text)
VALUES ('**** is a data storage virtualization technology that combines multiple physical disk drive components into one or more logical units for the purposes of data redundancy, performance improvement, or both.');

-- Get the ID of the newly inserted theme, subject, and definition
SET @theme_id := (SELECT theme_id FROM theme WHERE theme_name = 'raid');
SET @subject_id := (SELECT subject_id FROM subject WHERE subject_name = 'bs');
SET @definition_id := LAST_INSERT_ID();

-- Insert data into short_name
INSERT INTO short_name (short_name_text)
VALUES ('raid');

-- Get the ID of the newly inserted short name
SET @short_name_id := (SELECT short_name_id FROM short_name WHERE short_name_text = 'raid');

-- Insert data into long_name
INSERT INTO long_name (long_name_text)
VALUES ('redundant array of inexpensive disks'), ('redundant array of independent disks');

-- Get the IDs of the newly inserted long names
SET @long_name_id_1 := (SELECT long_name_id FROM long_name WHERE long_name_text = 'redundant array of inexpensive disks');
SET @long_name_id_2 := (SELECT long_name_id FROM long_name WHERE long_name_text = 'redundant array of independent disks');

-- Associate the theme, subject, and short name with the definition
INSERT INTO definition_theme (definition_id, theme_id)
VALUES (@definition_id, @theme_id);

INSERT INTO definition_subject (definition_id, subject_id)
VALUES (@definition_id, @subject_id);

INSERT INTO definition_short_name (definition_id, short_name_id)
VALUES (@definition_id, @short_name_id);

-- Associate the long names with the short name
INSERT INTO short_name_long_name (short_name_id, long_name_id)
VALUES
    (@short_name_id, @long_name_id_1),
    (@short_name_id, @long_name_id_2);


lets add another one:
definition: *** allows an administrator to just use one IP address and configure his clients to use certain ports that will allow traffic
short name: NAT,PAT, Source-Nat, PNAT
long name: port translation protocol
theme: nt
subject: nt